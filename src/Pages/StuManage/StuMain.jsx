import React, {Component} from 'react'
import {connect} from 'react-redux'
import { message, Icon, Menu, Modal, Empty, Input } from 'antd'
import u184 from './../../Common/images/u184.svg'
import cover01 from './../../Common/images/cover01.png'
import stu_label from './../../Common/images/stu_label.png' 
import stu_name from './../../Common/images/stu_name.png' 
import stu_sex from './../../Common/images/stu_sex.png' 
import stu_id from './../../Common/images/stu_id.png' 
import stu_major from './../../Common/images/stu_major.png' 
import stu_rank from './../../Common/images/stu_rank.png'
import stu_profile from './../../Common/images/stu_profile.png'
import stu_link from './../../Common/images/stu_link.png'
import search_icon from './../../Common/images/search_icon.png'
import SPagination from './../../Components/Pagination/SPagination'
import IntegralForm from './components/IntegralForm'

class StuMain extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ActiveItem: {},   // 当前选中活动的数据
            flagCount: 0,   // 活动序号基础
            current: 'race',   // 比赛级别
            pageNum: 1,     // 当前页码
            total: 20,       // 数据总数
            pageSize: 10,   // 每页数据量
            formVisible: false,  // 设置积分表单
        };
    }

    render() {
        const {formVisible, pageNum, total, pageSize, flagCount} = this.state;
        return (
            <div id="stu_main">
                <div id="intro_section">
                    <div className="intro_label">
                        <img src={stu_label} alt=""/>
                    </div>
                    <div className="intro_integral intro_item">
                        <img src={u184} alt=""/>
                        <span>7</span>分
                    </div>
                    <div className="intro_item">
                        <img src={stu_name} alt=""/>
                        <span>秦慕白</span>
                    </div>
                    <div className="intro_item">
                        <img src={stu_sex} alt=""/>
                        <span>男</span>
                    </div>
                    <div className="intro_item">
                        <img src={stu_id} alt=""/>
                        <span>221701400</span>
                    </div>
                    <div className="intro_item">
                        <img src={stu_major} alt=""/>
                        <span>软件工程</span>
                    </div>
                    <div className="intro_rank intro_item">
                        <img src={stu_rank} alt=""/>
                        <div>
                            <p>排名</p>
                            <p className="rank_text">系排名：1/120</p>
                            <p className="rank_text">院排名：1/120</p>
                        </div>
                    </div>
                    <div className="intro_profile intro_item">
                        <img src={stu_profile} alt=""/>
                        <div>
                            <p>简介</p>
                            <p className="profile_text">一声不响的离开这个世界还是有些不舍的 如果有灵魂就可以和故去的亲人重逢 可以不受人间 生活 金钱名利的束缚 仅仅是一个自由自在的思想存在着 去见自己想见的人 去自己不曾到过的远方 然后在人间停留一阵子 等自己最爱的亲人们一个个离开这个世界的时候 以另一种方式与他们再相见。</p>
                        </div>
                    </div>
                    <div className="intro_link intro_item" onClick={()=> this._goToEnclosure(2)}>
                        <img src={stu_link} alt=""/>
                        <span>图片附件</span>
                    </div>
                </div>
                <div id="analysis_section">
                    <div id="statistic_section"></div>
                    <div id="classroom_section">
                        <div id="header_section">
                            <div id="head_menu">
                                <Menu onClick={ (e)=>this._menuClick(e) } selectedKeys={[this.state.current]} mode="horizontal">
                                    <Menu.Item key="race">比赛</Menu.Item>
                                    <Menu.Item key="activity">活动</Menu.Item>
                                </Menu>
                            </div>
                            <div id="head_operation">
                                <div id="search_section">
                                    <Input
                                        placeholder="请输入比赛/活动的标题"
                                        suffix={
                                            <img src={search_icon} alt="" />
                                        }
                                    />
                                </div>
                                <SPagination
                                    current={pageNum}
                                    total={total}
                                    pageSize={pageSize}
                                    onChange={(pageNum)=>this._onPageNumChange(pageNum)}
                                />
                            </div>
                        </div>
                        <div id="content_section" className="items_container">
                            <div className="con_item" 
                                onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                                onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                                onClick={()=> this._goToMain(1)}
                            >
                                <div className="item_num">1</div>
                                <div className="item_img">
                                    <img src={cover01} alt=""/>
                                </div>
                                <div className="item_name">数计学院心理情景剧</div>
                                <div className="item_time">2019-08-20</div>
                                <div className="item_prize">一等奖</div>
                                <div className="item_integral">1分</div>
                                <div className="item_go_main"><Icon type="right" /></div>
                            </div>
                        </div>
                        <IntegralForm
                          wrappedComponentRef={this._saveFormRef}
                          visible={formVisible}
                          name={'数计学院心理情景剧'}
                          onCancel={this._handleCancel}
                          onCreate={this._handleCreate}
                        />
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        if(!this.props.location.state || !this.props.location.state.id){
            this.props.history.goBack();
        }
    }

    // 1. 活动类型切换 
    _menuClick(e){
        // 1.1 state存储选中的板块key值
        this.setState({
            current: e.key,
        });
    }

    // 2. 分页
    _onPageNumChange(pageNum){
        this.setState({
            pageNum,
            flagCount: (pageNum - 1) * this.state.pageSize
        });
    }

    // 3. 鼠标移入/移出单元活动  0--移入 1--移出
    _itemEnterOrLeave(e, flag){
        let parent = e.target.parentNode;
        let node;
        if(parent.classList.contains('con_item')){
            node = parent;
        }else if(parent.parentNode.classList.contains('con_item')){
            node = parent.parentNode;
        }else if(e.target.classList.contains('con_item')){
            node =  e.target;
        }else if(e.target.classList === 'items_container'){
            node =  e.target.children[0];
        }
        if(!flag && node && node.classList.contains('con_item')){
            node.classList.add('hover');
        }else if(flag && node && node.classList.contains('con_item')){
            node.classList.remove('hover');
        }
    }

    // 4. 跳转详情页面
    _goToMain(id){
        this.setState({formVisible: true})
    }

    // 5. 积分表单关闭
    _handleCancel = () => {
        this.setState({ formVisible: false });
    }

    // 6. 获取积分表单本体
    _saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    // 7. 设置积分
    _handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
        
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ formVisible: false });
        });
    }

    // 8. 跳转附件页
    _goToEnclosure(id){
        this.props.history.push({pathname: '/stumanage/enclosure', state: {id}});
    }
}

export default connect(null, null)(StuMain);