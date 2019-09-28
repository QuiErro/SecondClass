import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getStuListData, getMajorListData} from './../../Api/index'
import {  Menu, Empty, Input, Icon, Button, Form, Modal } from 'antd'
import NumberForm from './components/NumberForm'
import SPagination from './../../Components/Pagination/SPagination'
import Tool from './../../Components/Tool/Tool'
import search_icon from './../../Common/images/search_icon.png'
import u184 from './../../Common/images/u184.svg'

const _tool = new Tool();   

class StuManage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            ActiveItem: {},   // 当前选中活动的数据
            flagCount: 0,   // 活动序号基础
            current: 'major',   // 类别
            category: 'A',   // 专业 
            pageNum: 1,     // 当前页码
            total: 20,       // 数据总数
            pageSize: 10,   // 每页数据量
            formVisible: false,  // 设置获奖数量表单
        };
    }

    render() {
        const {current, pageNum, total, pageSize, flagCount, formVisible} = this.state;
        return (
            <div id="stu_manage">
                <div id="header_section">
                    <div id="head_menu">
                        <Menu onClick={ (e)=>this._menuClick(e) } selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="major">系</Menu.Item>
                            <Menu.Item key="academy">院</Menu.Item>
                            <Menu.Item className="menu_item" key="scholarship">奖学金管理</Menu.Item>
                            <Menu.Item key="feedback">消息反馈</Menu.Item>
                        </Menu>
                    </div>
                    <div id="head_operation">
                        <div id="search_section" style={{display: current === 'major' || current === 'academy' ? 'block' : 'none'}}>
                            <Input
                                placeholder="请输入学生姓名"
                                suffix={
                                    <img src={search_icon} alt="" />
                                }
                            />
                        </div>
                        <div id="set_btn_section" style={{display: current === 'scholarship' ? 'block' : 'none'}}>
                            <Button type="primary" onClick={()=> this.setState({formVisible: true})}>设置</Button>
                            <NumberForm
                              wrappedComponentRef={this._saveFormRef}
                              visible={formVisible}
                              onCancel={this._handleCancel}
                              onCreate={this._handleCreate}
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
                {
                    current === 'major' || current === 'scholarship' ? (
                        <div id="category_section">
                            <Menu onClick={ (e)=>this._menuCategoryClick(e) } selectedKeys={[this.state.category]} mode="horizontal">
                                <Menu.Item key="A">计算机</Menu.Item>
                                <Menu.Item key="B">软件工程</Menu.Item>
                                <Menu.Item key="C">数学</Menu.Item>
                                <Menu.Item key="D">大数据</Menu.Item>
                                <Menu.Item key="E">信息安全</Menu.Item>
                            </Menu>
                        </div>
                    ) : ''
                }
                <div id="content_section" className="stus_container">
                    { this._initList() }
                </div>
            </div>
        )
    }

    // 0. 创建列表
    _initList(){
        if(this.state.current === 'feedback'){
            return (
                <div className="con_item" 
                  onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                  onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                  onClick={()=> this._goToMain(1)}
                >
                    <div className="stu_num stu">1</div>
                    <div className="stu_img stu">
                        <img src={u184} alt=""/>
                    </div>
                    <div className="stu_name stu">
                        江南秋雨
                    </div>
                    <div className="stu_sex stu">男</div>
                    <div className="stu_id stu">221701400</div>
                    <div className="stu_major stu">软件工程</div>
                    <div className="stu_phone stu">12345678901</div>
                    <div className="stu_feedback stu">一声不响的离开这个世界还是有些不舍的 如果有灵魂 就可以和故去的亲人重逢 可以不受人间 生活 金钱名利的束缚 仅仅是一个自由自在的思想存在着 去见自己想见的人 去自己不曾到过的远方 然后在人间停留一阵子 等自己最爱的亲人们一个个离开这个世界的时候 以另一种方式与他们再相见。一声不响的离开这个世界还是有些不舍的 如果有灵魂 就可以和故去的亲人重逢 可以不受人间 生活 金钱名利的束缚 仅仅是一个自由自在的思想存在着 去见自</div>
                </div>
            )
        }else if(this.state.current === 'scholarship'){
            return(
                <div id="scholarship_section">
                    <div className="scholarship_title">特等奖</div>
                    <div className="scholarship_stu_container">
                        <div className="scholarship_stu_item">
                            <div className="scholarship_stu_item_index">1</div>
                            <div className="scholarship_stu_item_intro">
                                <div className="stu_item_intro_img">
                                    <img src={u184} alt=""/>
                                </div>
                                <div className="stu_item_intro_text">
                                    <div className="intro_part_one">
                                        <div className="part_one_name part_item">江南夜雨</div>
                                        <div className="part_one_id part_item">221701400</div>
                                        <div className="part_one_phone part_item">12345678901</div>
                                    </div>
                                    <div className="intro_part_two">
                                        <div className="part_two_academy_rank part_item">院排名：20 / 688</div>
                                        <div className="part_two_major_rank part_item">系排名：20 / 88</div>
                                    </div>
                                    <div className="intro_part_three">
                                        一声不响的离开这个世界还是有些不舍的 如果有灵魂 就可以和故去的亲人重逢 可以不受人间 生活 金钱名利的束缚 仅仅是一个自由自在的思想存在着 去见自己想见的人 去自己不曾到过的远方 然后在人间停留一阵子 等自己最爱的亲人们一个个离开这个世界的时候 以另一种方式与他们再相见。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className="con_item" 
                  onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                  onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                  onClick={()=> this._goToMain(1, '江南秋雨')}
                >
                    <div className="stu_num stu">1</div>
                    <div className="stu_img stu">
                        <img src={u184} alt=""/>
                    </div>
                    <div className="stu_name stu">
                        江南秋雨
                    </div>
                    <div className="stu_sex stu">男</div>
                    <div className="stu_id stu">221701400</div>
                    <div className="stu_major stu">软件工程</div>
                    <div className="stu_phone stu">12345678901</div>
                    <div className="stu_activity stu">参与活动 6 项</div>
                    <div className="stu_race stu">参与比赛 6 项</div>
                    <div className="stu_major_rank stu">系排：1/190</div>
                    <div className="stu_academy_rank stu">院排：1/690</div>
                    <div className="stu_integral stu">7分</div> 
                    <div className="stu_go_main stu"><Icon type="right" /></div>
                </div>
            )
        }
    }

    // 1. 活动类型切换 
    _menuClick(e){
        // 1.1 state存储选中的板块key值
        this.setState({
            current: e.key,
        });
    }

    // 2. 选择专业
    _menuCategoryClick(e){
        this.setState({
            category: e.key,
        });
    }

    // 3. 分页
    _onPageNumChange(pageNum){
        this.setState({
            pageNum,
            flagCount: (pageNum - 1) * this.state.pageSize
        });
    }

    // 4. 鼠标移入/移出单元活动  0--移入 1--移出
    _itemEnterOrLeave(e, flag){
        if(this.state.current === 'feedback' || this.state.current === 'scholarship'){
            return;
        }
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

    // 5. 跳转详情页面
    _goToMain(id, title){
        if(this.state.current === 'feedback' || this.state.current === 'scholarship'){
            return;
        }
        let headerData = {
            data: {
                name: '学生管理',
                url: '/stumanage/list'
            },
            children: {
                data: {
                    name: title
                }
            }
        }
        this.props.history.push({pathname: '/stumanage/main', state: {id, headerData}});
    }

    // 6. 获奖数量表单关闭
    _handleCancel = () => {
        this.setState({ formVisible: false });
    }

    // 7. 获取获奖表单本体
    _saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    // 8. 设置数量
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

}

export default connect(null, null)(StuManage);