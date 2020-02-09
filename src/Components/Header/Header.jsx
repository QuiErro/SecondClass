import React, { Component } from 'react'
import {Link, withRouter } from "react-router-dom";
import {connect} from "react-redux";
import {logoutAction} from '../../Store/actionCreators'
import Tool from './../Tool/Tool'
import { message, Button, Menu, Modal } from 'antd'
import logo_search from './../../Common/images/logo_search.png'

const _tool = new Tool(); 

let headerTitle = [];

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'publishrace',
            title: ''
        };
    }

    componentWillMount(){
        let current = window.sessionStorage.getItem('currentLink') || 'publishrace';
        this.setState({
            current: current
        });
        headerTitle = [];
        if(this.props.location.state && this.props.location.state.headerData){
            this._initHeaderTitle(this.props.location.state.headerData);
        }
    }
    
    render() {
        return (
            <div id="header">
                <div className="icon_section">
                    <img src={logo_search} alt=""/>
                    <div ref="headerTitle" className="header_title">
                        {
                            headerTitle.map((item) => {
                                if(item.url){
                                    return(
                                        <Link key={item.name} to={{
                                            pathname: item.url,
                                            state: item.state
                                        }}>{item.name}</Link>
                                    )
                                }else{
                                    return (
                                        <a key={item.name}>{item.name}</a>
                                    )
                                }
                            })
                        }
                    </div>
				</div>
                <div className="choice_section">
                    <Menu onClick={ (e)=>this._menuClick(e) } selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="publishrace"><Link to="/publishrace">发布比赛</Link></Menu.Item>
                        <Menu.Item key="publishactivity"><Link to="/publishactivity">发布活动</Link></Menu.Item>
                        <Menu.Item key="activitymanage"><Link to="/activitymanage">活动管理</Link></Menu.Item>
                        <Menu.Item key="racemanage"><Link to="/racemanage">比赛管理</Link></Menu.Item>
                        <Menu.Item key="elite"><Link to="/elite">风云人物</Link></Menu.Item>
                        <Menu.Item key="stumanage"><Link to="/stumanage">学生管理</Link></Menu.Item>
                    </Menu>
                </div>
                <div className="logout_section">
                    <Button type="primary" onClick={ ()=> this._showConfirm() }>退&nbsp;出</Button>
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps){
        headerTitle = [];
        if(nextProps.location.state && nextProps.location.state.headerData){
            this._initHeaderTitle(nextProps.location.state.headerData);
        }
        return true;
    }

    // 1. 导航切换 
    _menuClick(e){
        // 1.1 state存储选中的板块key值
        this.setState({
          current: e.key,
        }, ()=>{
            window.sessionStorage.setItem('currentLink', this.state.current);
        });
    }

    // 2. 退出按钮点击弹出确认框 
    _showConfirm() {
        Modal.confirm({
            title: '提示',
            content: '您确定退出登录吗？',
            cancelText: '取消',
            okText: '确定',
            onOk: ()=>{
                // 退出登录
                this.props.reqLogout((res)=>{
                    if(res.status === 0){
                        message.success('退出成功');
                        // 回到首页
                        window.location.href = '/';
                        // 清除sessionStorage的数据
                        sessionStorage.removeItem('tempUser');
                        sessionStorage.removeItem('currentLink');
                        // 清除缓存的localStorage数据
                        _tool.removeStore('publishRace');
                        _tool.removeStore('publishActivity');
                        _tool.removeStore('activityManage');
                        _tool.removeStore('raceManage');
                    }else{
                        message.error('退出失败');
                    }
                });
            },
        });
    }
    
    // 3.遍历 headerData 生成文本标题
    _initHeaderTitle(headerData){
        if(!headerData || !headerData.data) return;

        headerTitle.push(headerData.data);
        if(headerData.children){
            this._initHeaderTitle(headerData.children)
        }
    }
    
}

const mapStateToProps = (state)=>{
    return {
        headerTitle: state.headerTitle
    }
};

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogout(callback){
            const action = logoutAction(callback);
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));