import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getClassroomData, getSignInStuData} from './../../Api/index'
import { message, Select, Modal } from 'antd'
import moment from 'moment'
import echarts from 'echarts'
import SignInStuItem from './../../Components/SignInStuItem/SignInStuItem'
import position_icon from './../../Common/images/position_icon.png'
import time_icon from './../../Common/images/time_icon.png'
import sign_person_icon from './../../Common/images/sign_person_icon.png'
import echart_icon from './../../Common/images/echart_icon.png'
import win_person_icon from './../../Common/images/win_person_icon.png'
import u184 from './../../Common/images/u184.svg'

const { Option } = Select;

class RaceMain extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            // id
            id: '',
            // 标题
            title: '',
            // 地点
            position: '',
            // 封面
            cover_url: '',
            // 类型
            type: '',
            // 正文
            content: '',
            // 报名人数
            signUp: 0,
            // 报名开始时间
            signUp_start: '',
            // 报名结束时间
            signUp_end: '',
            // 签到开始时间
            signIn_start: '',
            // 签到结束时间
            signIn_end: '',
            // 控制学生详情表的显示
            isShowStuMain: false,
            // 已签到学生
            signInStuArray: []
        }
    }

    render() {
        const {title, position, cover_url, type, content, signUp_start, signUp_end, signIn_start, signIn_end, isShowStuMain, signInStuArray} = this.state;
        return (
            <div id="race_main">
                <div id="intro_section">
                    <div id="intro_basic">
                        <div id="basic_img">
                            <img src={cover_url}/>
                        </div>
                        <div id="basic_text">
                            <div className="text_item">
                                <div className="item_header">
                                    <img className="icon" src={position_icon} alt=""/>
                                    <span>签到地址</span>
                                </div>
                                <div className="item_body">{position}</div>
                            </div>
                            <div className="text_item">
                                <div className="item_header">
                                    <img className="icon" src={time_icon} alt=""/>
                                    <span>签到地址</span>
                                </div>
                                <div className="item_body">
                                    <span>报名时间</span>
                                    <span>{signUp_start}~{signUp_end}</span>
                                </div>
                                <div className="item_body">
                                    <span>签到时间</span>
                                    <span>{signIn_start}~{signIn_end}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="intro_body">
                        <div className="body_title">{title}</div>
                        <div className="body_content" ref="body_content" dangerouslySetInnerHTML={{__html: content}}></div>
                    </div>
                </div>
                <div id="competitor_section">
                    <div id="competitor_top">
                        <div id="top_left" className="top_part">
                            <div className="item_header">
                                <img className="icon" src={echart_icon} alt=""/>
                                <span>人数比例</span>
                            </div>
                            <div id="echarts_part" ref="echarts_part"/>
                        </div>
                        <div id="top_right" className="top_part">
                            <div className="item_header">
                                <img className="icon" src={win_person_icon} alt=""/>
                                <span>获奖学生</span>
                            </div>
                            <div className="item_body">
                            <div className="body_row">
                                <div className="row_column title">姓名</div>
                                <div className="row_column title">专业</div>
                                <div className="row_column title">获奖等级</div>
                                <div className="row_column title">积分</div>
                            </div>
                            <div className="body_row">
                                <div className="row_column">
                                    <img src={u184}/>
                                    xxxx
                                </div>
                                <div className="row_column">xxxxxxx</div>
                                <div className="row_column">一等奖</div>
                                <div className="row_column">0</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div id="competitor_bottom">
                        <div className="item_header">
                            <img className="icon" src={sign_person_icon} alt=""/>
                            <span>签到学生</span>
                        </div>
                        <div className="item_body">
                            <div className="body_row">
                                <div className="row_column title">姓名</div>
                                <div className="row_column title">性别</div>
                                <div className="row_column title">学号</div>
                                <div className="row_column title">专业</div>
                                <div className="row_column title">手机号</div>
                                <div className="row_column title">积分</div>
                                <div className="row_column title">获奖等级</div>
                            </div>
                            {
                                signInStuArray.length ? (
                                    signInStuArray.map((item)=>(
                                        <SignInStuItem
                                          key={item.student_id}
                                          stuItem={item}
                                          goToMain={this._goToMain}
                                        />
                                    ))
                                ) :  (
                                        <SignInStuItem
                                        stuItem={{
                                            student_name: 'xxxx',
                                            student_sex: '男',
                                            student_id: '221700000',
                                            major_name: '软件工程',
                                            student_phone: '12345678901',
                                            point: 0,
                                            award: '无'
                                        }}
                                        goToMain={this._goToMain}
                                        />
                                    )
                            }
                        </div>
                    </div>
                </div>
                <Modal
                    className="compete_modal"
                    title="个人信息"
                    centered={true}
                    width="50rem"
                    closable={false}
                    cancelText="取消"
                    okText="确认"
                    visible={isShowStuMain}
                    onOk={() => this.setStuMain('ok')}
                    onCancel={() => this.setStuMain('cancel')}
                >
                    <div className="modal_text_item">
                        <div className="item_basic">姓名：&nbsp;江南夜雨</div>
                        <div className="item_basic item_basic_small">性别：&nbsp;男</div>
                        <div className="item_basic">学号：&nbsp;221706314</div>
                        <div className="item_basic">专业：&nbsp;软件工程</div>
                    </div>
                    <div className="modal_text_item modal_padding">
                        <div className="item_phone">手机号：&nbsp;13521545888</div>
                    </div>
                    <div className="modal_text_item modal_padding">
                        <div className="item_record">
                            <span>积分：&nbsp;</span>
                            <Select
                                showSearch
                                placeholder="0"
                                style={{ width: 100 }}
                                onChange={(val)=> this._onSelectChange(val, 'math')}
                            >
                                <Option value="10">10</Option>
                                <Option value="9">9</Option>
                                <Option value="8">8</Option>
                                <Option value="7">7</Option>
                                <Option value="6">6</Option>
                                <Option value="5">5</Option>
                                <Option value="4">4</Option>
                                <Option value="3">3</Option>
                                <Option value="2">2</Option>
                                <Option value="1">1</Option>
                                <Option value="0">0</Option>
                            </Select>
                        </div>
                        <div className="item_record">
                            <span>获奖等级：&nbsp;</span>
                            <Select
                                showSearch
                                placeholder="无"
                                style={{ width: 120 }}
                                onChange={(val)=> this._onSelectChange(val, 'rank')}
                            >
                                <Option value="特等奖">特等奖</Option>
                                <Option value="一等奖">一等奖</Option>
                                <Option value="二等奖">二等奖</Option>
                                <Option value="三等奖">三等奖</Option>
                                <Option value="优秀奖">优秀奖</Option>
                                <Option value="无">无</Option>
                            </Select>
                        </div>
                    </div>
                    <div className="modal_text_item modal_padding modal_profile">
                        <p>简介：</p>
                        <p>
                        一声不响的离开这个世界还是有些不舍的 如果有灵魂 就可以和故去的亲人重逢 可以不受人间 生活 金钱名利的束缚 仅仅是一个自由自在的思想存在着 去见自己想见的人 去自己不曾到过的远方 然后在人间停留一阵子 等自己最爱的亲人们一个个离开这个世界的时候 以另一种方式与他们再相见。
                        </p>
                    </div>
                </Modal>
            </div>
        )
    }

    componentDidMount(){
        if(!this.props.location.state || !this.props.location.state.id){
            this.props.history.goBack();
        }else{
            // 1. 请求活动详情
            this.getClassroom();

            // 2. 初始化echarts
            let echarts_part = echarts.init(this.refs.echarts_part);
            let option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'right',
                    data:['直接访问','邮件营销','联盟广告']
                },
                series: [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:335, name:'直接访问'},
                            {value:310, name:'邮件营销'},
                            {value:234, name:'联盟广告'},
                        ]
                    }
                ]
            }
            echarts_part.setOption(option);

            // 3. 获取已签到学生
            this.getSignInStu();
        }
    }

    // 1. 请求活动详情
    async getClassroom(){
        let res = await getClassroomData(this.props.location.state.id);
        if(res.status === 0){
            let tempObj = res.data;
            this.setState({
                id: tempObj.id,
                title: tempObj.title,
                position: tempObj.position,
                cover_url: "http://47.112.10.160:3389/image/cover/" + tempObj.image || '',
                type: tempObj.type,
                content: tempObj.body,
                signUp: tempObj.signUp,
                signUp_start: moment(tempObj.signUp_start).format('MM月DD日 HH:mm'),
                signUp_end: moment(tempObj.signUp_end).format('MM月DD日 HH:mm'),
                signIn_start: moment(tempObj.signIn_start).format('MM月DD日 HH:mm'),
                signIn_end: moment(tempObj.signIn_end).format('MM月DD日 HH:mm')
            });
        }
    }

    // 2. 获取已签到学生
    async getSignInStu(){
        let res = await getSignInStuData(this.props.location.state.id);
        if(res.status === 0){
            this.setState({
                signInStuArray: res.data || []
            })
        }
    }

    // 4. 跳转学生详情页面
    _goToMain = () => {
        this.setState({
            isShowStuMain: true
        })
    }

    // 5. 保存或关闭学生详情框
    setStuMain(flag){
        this.setState({
            isShowStuMain: false
        })
    }

    // 6. 选积分/等级
    _onSelectChange(val, flag){
        console.log(val)
    }
}

export default connect(null, null)(RaceMain);