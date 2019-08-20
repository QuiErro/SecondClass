import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logoutAction} from '../../Store/actionCreators'
import { message, Button, Menu, Modal } from 'antd'

import logo_search from './../../Common/images/logo_search.png'

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'publishrace',
        };
    }
    
    render() {
        return (
            <div id="header">
                <div className="icon_section">
					<img src={logo_search}/>
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

    // 1. 导航切换 
    _menuClick(e){
        // 1. state存储选中的板块key值
        this.setState({
          current: e.key,
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
                // 2.1 网络请求退出登录
                this.props.reqLogout((flag)=>{
                    if(flag === 0){
                        // 2.2 提示用户
                        message.success('退出成功');
                        // 2.3 回到首页
                        window.location.href = '/';
                        // 2.4 清除sessionStorage的数据
                        sessionStorage.removeItem('tempUser');
                    }else{
                        message.error('退出失败');
                    }
                });
            },
        });
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogout(callback){
            const action = logoutAction(callback);
            dispatch(action)
        }
    }
};

export default connect(null, mapDispatchToProps)(Header);