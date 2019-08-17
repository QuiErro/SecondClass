import React, {Component} from 'react'
import {connect} from 'react-redux'
import { message, Button, Icon, Checkbox, Row, Col, Input } from 'antd'
import Tool from './../../Components/Tool/Tool'
import cover_default from './../../Common/images/cover_default.jpg'
import map_icon from './../../Common/images/map_icon.png'

const _tool = new Tool;

class RacePub extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            // 封面
            cover_url: '',
            // 是否选中封面
            hasCover: false,
            // 比赛类型
            type: [],
        }
    }

    render() {
        const {cover_url, hasCover, type} = this.state;

        return (
            <div id="race_pub">
                <div id="graph_part">
                    <div id="cover_section" className="section">
                        <div className="section_title">
                            <span></span>
                            <h3>展示图片</h3>
                        </div>
                        <div id="cov_image">
                            <div className="mask" style={{display: hasCover ? 'block' : 'none'}}></div>
                            <img src={cover_url || cover_default}/>
                        </div>
                        <div id="cov_operation">
                            <Button onClick={ ()=> this._fileBtnClick() }>
                                <Icon type="upload" /> 上传本地图片
                            </Button>
                            <input
                                ref="cover_url"
                                name="cover_url"
                                type="file"
                                style={{display: 'none'}}
                                onChange={(e)=>this._onInputChange(e, 'file')}
                            />
                            <div>
                                <Button type="primary">确认</Button>
                                <Button type="default" onClick={ ()=> this._cancelCover() }>取消</Button>
                            </div>
                        </div>
                    </div>
                    <div id="address_section" className="section">
                        <div className="section_title">
                            <span></span>
                            <h3>签到地址</h3>
                        </div>
                        <div id="add_text">
                            <Input
                              prefix={<img src={map_icon}/>}
                              allowClear
                            />
                        </div>
                        <div id="add_map"></div>
                    </div>
                    <div id="date_section" className="section">
                        <div className="section_title"> 
                            <span></span>
                            <h3>活动时间</h3>
                        </div>
                        <div id="date_select">
                            
                        </div>
                    </div>
                </div>
                <div id="text-part">
                    <div id="type_section" className="section">
                        <div className="section_title">
                            <span></span>
                            <h3>比赛类型</h3>
                        </div>
                        <div id="type_checkbox">
                            <Checkbox.Group 
                              value={type} 
                              onChange={ (e)=> this._onTypeChange(e) }>
                                <Row>
                                    <Col span={8}>
                                        <Checkbox value="E">院级</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="D">校级</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="C">省级</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="B">国家级</Checkbox>
                                    </Col>
                                    <Col span={8}>
                                        <Checkbox value="A">国际级</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>
                    <div id="content_section" className="section">
                        <div className="section_title">
                            <span></span>
                            <h3>标题及正文</h3>
                        </div>
                        <div id="cont_title">
                            <Input placeholder="请输入文章标题" allowClear />
                        </div>
                        <div id="cont_editor"></div>
                    </div>
                    <div id="btn_section" className="section">
                        <Button type="primary">提&nbsp;交</Button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        // 1. 配置编辑器
        let E = window.wangEditor;
        let editor = new E('#cont_editor');
		// 2. 自定义上传图片事件
        editor.customConfig.customUploadImg = function (files, insert) {
            // 2.1 上传图片到服务器
            if (files.length > 0) { // 有图片文件
                // 取出图片
                let formData = new FormData();
                formData.append('image_url', files[0]);
                console.log(files[0])
                // 发起网络请求
                /*addSowingData(formData).then((res)=>{
                    console.log(res)
                    if(res.status === 0){
                        insert(res.data);
                    }
                }).catch((error)=>{
                    console.log(error);
                })*/
            }
        };
        editor.create();

        const map = new BMap.Map('add_map');
        let point = new BMap.Point(119.204332, 26.06473);
		map.centerAndZoom(point, 17);
		map.setCurrentCity("福州");
		map.enableScrollWheelZoom(true);
		let marker = new BMap.Marker(point)// 创建标注
		map.addOverlay(marker)// 将标注添加到地图中
    }

    // 比赛类型选择
    _onTypeChange(checkedValues) {
        let tempArr = [];
        if(checkedValues.length){
            tempArr.push(checkedValues[checkedValues.length - 1]);
        }
        this.setState({
            type: tempArr
        })
    }

    // 上传图片
    _fileBtnClick(){
        this.refs.cover_url.click();
    }

    // 输入框内容发生改变
    _onInputChange(e, flag){
        // 1.1 获取用户输入的数据
        let inputValue = e.target.value;
        let inputName = e.target.name;

        // 1.2 处理图片
        if(flag === 'file'){
            this.setState({
                hasCover: true
            })
            inputValue = '';
            _tool.fileToBase64Url(e.target.files[0], (src)=>{
                inputValue = src;
                this.setState({
                    cover_url: inputValue
                })
            })
        }
    }

    // 撤销封面
    _cancelCover(){
        this.refs.cover_url.value = [];
        this.setState({
            hasCover: false,
            cover_url: ''
        })
    }
    
}

export default connect(null, null)(RacePub);