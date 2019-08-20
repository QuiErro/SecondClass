import React, {Component} from 'react'
import {connect} from 'react-redux'
import { message, Button, Icon, Checkbox, Row, Col, Input, DatePicker } from 'antd'
import {fileUpload, newRace} from './../../Api/index'
import Tool from './../../Components/Tool/Tool'
import cover_default from './../../Common/images/cover_default.jpg'
import map_icon from './../../Common/images/map_icon.png'

const _tool = new Tool;      
const { BMap } = window
const { RangePicker } = DatePicker;

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
            // 位置
            position: '',
            // 报名结束时间
            signUp_end: '',
            // 报名开始时间
            signUp_start: '',
            // 签到开始时间
            signIn_start: '',
            // 签到结束时间
            signIn_end: '',
            // 文章标题
            title: '',
            // 编辑器
            editor: null,
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
                                上传本地图片
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
                              id="text_content"
                              prefix={ <img src={map_icon}/> }
                              suffix={ <Icon type="search"/> }
                              allowClear
                              name="position"
                              onChange={(e)=>this._onInputChange(e)}
                            />
                            <div id="searchResultPanel"></div>
                        </div>
                        <div id="add_map"></div>
                    </div>
                    <div id="date_section" className="section">
                        <div className="section_title"> 
                            <span></span>
                            <h3>活动时间</h3>
                        </div>
                        <div id="date_select">
                            <div className="select_part">
                                <h4>报名时间</h4>
                                <RangePicker
                                    showTime={{ format: 'HH:mm:ss' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={['开始时间', '结束时间']}
                                    onChange={(value, dateString)=> this._onDateChange(value, dateString, "signUp")}
                                />
                            </div>
                            <div className="select_part">
                                <h4>签到时间</h4>
                                <RangePicker
                                    showTime={{ format: 'HH:mm:ss' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={['开始时间', '结束时间']}
                                    onChange={(value, dateString)=> this._onDateChange(value, dateString, "signIn")}
                                />
                            </div>
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
                            <Input 
                              placeholder="请输入文章标题" 
                              allowClear 
                              name="title"
                              onChange={(e)=>this._onInputChange(e)}
                            />
                        </div>
                        <div id="cont_editor"></div>
                    </div>
                    <div id="btn_section" className="section">
                        <Button type="primary" onClick={ ()=> this._onSubmit() }>提&nbsp;交</Button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        // 1.1 配置编辑器             
        let E = window.wangEditor;
        let editor = new E('#cont_editor');
        this.setState({
            editor: editor
        })
		// 1.2 自定义上传图片事件
        editor.customConfig.customUploadImg = function (files, insert) {
            // 1.2.1 上传图片到服务器
            if (files.length > 0) { // 有图片文件
				if(files[0].size / 1024 / 1024 > 1){
					message.warning('图片大小不得超过1MB！');
					return;
				}
				// 取出图片
                let formData = new FormData();
                formData.append('image', files[0]);
                // 发起网络请求
                fileUpload(formData).then((res)=>{
                    console.log(res)
                    if(res.status === 0){
                        insert(res.data);
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }
        };
        // 1.3 创建编辑器
        editor.create();

        // 2.1 初始化地图
        const map = new BMap.Map('add_map');
        let point = new BMap.Point(119.204332, 26.06473);  // 初始位置福大图书馆
		map.centerAndZoom(point, 17);
		map.setCurrentCity("福州");
		map.enableScrollWheelZoom(true);
		let marker = new BMap.Marker(point)   // 创建标注
        map.addOverlay(marker)    // 将标注添加到地图中
        // 监听地图点击事件
        map.addEventListener("click", (e)=>{
            console.log(e)
            map.clearOverlays(marker);
            marker = new BMap.Marker(e.point)
            map.addOverlay(marker)
        });

        // 2.2 建立一个自动完成的对象
        const ac = new BMap.Autocomplete(    
            {"input" : "text_content"
            ,"location" : map
        });

        // 监听鼠标放在下拉列表上的事件
        ac.addEventListener("onhighlight", function(e) {  
            let str = "";
            let _value = e.fromitem.value;
            let value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
                
            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }    
            str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
            document.getElementById("searchResultPanel").innerHTML = str;
        });
        
        let myValue;

        // 监听鼠标点击下拉列表后的事件
        ac.addEventListener("onconfirm", function(e) {    
            let _value = e.item.value;
            myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            document.getElementById("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
                
            setPlace();
        });
        
        function setPlace(){
            map.clearOverlays();    //清除地图上所有覆盖物
            function myFun(){
                var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(pp, 18);
                map.addOverlay(new BMap.Marker(pp));    //添加标注
            }
            let local = new BMap.LocalSearch(map, {   //智能搜索
                onSearchComplete: myFun
            });
            local.search(myValue);
        }
    }

    // 3. 选择日期
    _onDateChange(value, dateString, flag) {
        if(flag === 'signIn'){
            this.setState({
                signIn_start: dateString[0],
                signIn_end: dateString[1]
            })
        }else if(flag === 'signUp'){
            this.setState({
                signUp_start: dateString[0],
                signUp_end: dateString[1]
            })
        }
    }

    // 4. 比赛类型选择
    _onTypeChange(checkedValues) {
        let tempArr = [];
        if(checkedValues.length){
            tempArr.push(checkedValues[checkedValues.length - 1]);
        }
        this.setState({
            type: tempArr
        })
    }

    // 5. 上传图片（富文本编辑器）
    _fileBtnClick(){
        this.refs.cover_url.click();
    }

    // 6. 输入框内容发生改变
    _onInputChange(e, flag){
        // 6.1 获取用户输入的数据
        let inputValue = e.target.value;
        let inputName = e.target.name;

        // 6.2 处理图片（readFile）
        if(flag === 'file'){
			if(e.target.files[0].size / 1024 / 1024 > 1){
				message.warning('图片大小不得超过1MB！');
				this.refs.cover_url.value = [];
				return;
			}
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

        this.setState({
            [inputName]: inputValue
        })
    }

    // 7. 撤销封面
    _cancelCover(){
        this.refs.cover_url.value = [];
        this.setState({
            hasCover: false,
            cover_url: ''
        })
    }

    // 8. 提交formData
    _onSubmit(){
        let {editor, title, signIn_end, signIn_start, signUp_end, signUp_start, position, type} = this.state;
        // 8.1 取出编辑器文本
        let content = editor.txt.html();
        // 8.2 取出封面文件
        let file = this.refs.cover_url.files[0];
		// 8.3 处理type (array => string)
		let tempType = type[0];
		// 8.4 判断各信息是否为空
		if(!title || !signIn_end || !signIn_start || !signUp_end || !signUp_start || !position || !tempType || (content === "<p><br></p>") || !file){
			message.warning('请确认输入的信息是否完整！');
		}else{
			// 8.5 创建FormData对象
			let formData = new FormData();
			formData.append('title', title);
			formData.append('body', content);
			formData.append('image', file);
			formData.append('signIn_end', signIn_end);
			formData.append('signIn_start', signIn_start);
			formData.append('signUp_end', signUp_end);
			formData.append('signUp_start', signUp_start);
			formData.append('position', position);
			formData.append('type', tempType);

			// 8.6 提交数据 网络请求
			newRace(formData).then((res)=>{
				console.log(res)
				if(res.status === 0){
					message.success("比赛创建成功")
				}else{
					message.error("比赛创建失败")
				}
			}).catch((error)=>{
				console.log(error);
			})
		}	
    }   
}

export default connect(null, null)(RacePub);