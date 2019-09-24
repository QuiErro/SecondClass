import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getActivityNumAction, getActivityDataAction} from '../../Store/actionCreators'
import {hideClassroom, showClassroom, deleteClassroom} from './../../Api/index'
import { message, Button, Menu, Modal, Empty, Input} from 'antd'
import SPagination from './../../Components/Pagination/SPagination'
import ClassroomItem from './../../Components/ClassroomItem/ClassroomItem'
import Tool from './../../Components/Tool/Tool'
import search_icon from './../../Common/images/search_icon.png'

const _tool = new Tool();    

class ActivityManage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            checked: 0,     // 当前选中的活动序号
            ActivityItem: {},   // 当前选中活动的数据
            flagCount: 0,   // 活动序号基础
            current: 'A',   // 活动级别
            pageNum: 1,     // 当前页码
            total: 0,       // 数据总数
            pageSize: 10,   // 每页数据量
            isShowUnpublish: false,  // 是否显示取消发布对话框
            isShowDelete: false,     // 是否显示删除对话框
            isShowPublish: false,    // 是否显示重新发布对话框
        };
    }

    componentWillMount() {
        // 获取本地缓存
        let tempObj = _tool.getStore('activityManage');
        if(tempObj){
            let current = tempObj.current || 'A';
            let pageNum = tempObj.pageNum || 1;
            let flagCount =  (pageNum - 1) * this.state.pageSize;
            this.setState({
                current,
                pageNum,
                flagCount
            })
            // 请求总数
            this.props.reqActivityNum(current, (res, num)=>{
                if(res.status === 0){
                    this.setState({
                        total: num
                    })
                }
            });
            // 获取列表
            this.props.reqActivityList(current, flagCount);
        }else{
            // 请求总数
            this.props.reqActivityNum('A', (res, num)=>{
                if(res.status === 0){
                    this.setState({
                        total: num
                    })
                }
            });
            // 获取列表
            this.props.reqActivityList('A', 0);
        }
    }

    render() {
        const {checked, pageNum, total, pageSize, flagCount, isShowUnpublish, isShowPublish, isShowDelete, ActivityItem} = this.state;
        return (
            <div id="activity_manage">
                <div id="header_section">
                    <div id="head_menu">
                        <Menu onClick={ (e)=>this._menuClick(e) } selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="A">国际级</Menu.Item>
                            <Menu.Item key="B">国家级</Menu.Item>
                            <Menu.Item key="C">省级</Menu.Item>
                            <Menu.Item key="D">校级</Menu.Item>
                            <Menu.Item key="E">院级</Menu.Item>
                        </Menu>
                    </div>
                    <div id="head_operation">
                        <Button className="opera_btn btn_edit" onClick={()=> this._editItem()}>编辑</Button>
                        <Button className="opera_btn btn_remove" onClick={()=> this._deleteItem()}>删除</Button>
                        <Button className="opera_btn btn_publish" onClick={()=> this._showItem()}>发布</Button>
                        <Button className="opera_btn btn_unpublish" onClick={()=> this._hideItem()}>取消发布</Button>
                        <SPagination
                            current={pageNum}
                            total={total}
                            pageSize={pageSize}
                            onChange={(pageNum)=>this._onPageNumChange(pageNum)}
                        />
                    </div>
                </div>
                <div id="search_section">
                    <Input
                        placeholder="请输入活动标题"
                        suffix={
                            <img src={search_icon} alt="" />
                        }
                    />
                </div>
                <div id="content_section" className="items_container">
                    { this.props.activityData && this.props.activityData.length>0 ? 
                        this.props.activityData.map((item, index)=>{
                            return (
                                <ClassroomItem
                                  key={item.id}
                                  click={this._goToMain}
                                  item={item}
                                  flagCount={flagCount} 
                                  index={index} 
                                  checked={checked}
                                  checkedChange={this._onCheckedChange}
                                />
                            )
                        })  : <Empty />
                    }
                </div>
                <Modal
                    title="取消发布"
                    centered
                    visible={isShowUnpublish}
                    cancelText='取消'
                    okText='确定'
                    onOk={() => this._setModalUnpublish()}
                    onCancel={() => this._hideModal('isShowUnpublish')}
                >
                    <p>是否取消{ActivityItem.title}的发布</p>
                    <p>取消后将不会在推荐页上显示！！！</p>
                </Modal>
                <Modal
                    title="发布"
                    centered
                    visible={isShowPublish}
                    cancelText='取消'
                    okText='确定'
                    onOk={() => this._setModalPublish()}
                    onCancel={() => this._hideModal('isShowPublish')}
                >
                    <p>是否重新发布{ActivityItem.title}</p>
                    <p>发布后将会在推荐页上显示！！！</p>
                </Modal>
                <Modal
                    title="删除"
                    centered
                    visible={isShowDelete}
                    cancelText='取消'
                    okText='确定'
                    onOk={() => this._setModalDelete()}
                    onCancel={() => this._hideModal('isShowDelete')}
                >
                    <p>是否删除{ActivityItem.title}</p>
                    <p>删除后一切都会消失，请慎重！！！</p>
                </Modal>
            </div>
        )
    }

    // 1. 活动类型切换 
    _menuClick(e){
        // 1.1 state存储选中的板块key值
        this.setState({
            current: e.key,
            pageNum: 1,
            flagCount: 0
        }, ()=>{
            _tool.setStore('activityManage', {
                current: e.key,
                pageNum: 1
            });
        });
        // 1.2 请求对应类型数量
        this.props.reqActivityNum(e.key, (res, num)=>{
            if(res.status === 0){
                this.setState({
                    total: num
                })
            }
        });
        // 1.3 获取列表
        this.props.reqActivityList(e.key, 0);
    }

    // 2. 分页
    _onPageNumChange(pageNum){
        this.setState({
            pageNum,
            flagCount: (pageNum - 1) * this.state.pageSize
        }, ()=>{
            this.props.reqActivityList(this.state.current, this.state.flagCount);
            _tool.setStore('activityManage', {
                pageNum: this.state.pageNum
            });
        });
    }

    // 3. 选中的活动序号
    _onCheckedChange = (e, index, item) => {
        if(e.target.checked){
            this.setState({
                checked: index + 1,
                ActivityItem: item
            });
        }else{
            this.setState({
                checked: 0,
                ActivityItem: {}
            });
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    // 4. 编辑
    _editItem(){
        if(this.state.ActivityItem.id){
            let headerData = {
                data: {
                    name: '活动管理',
                    url: '/activitymanage/list'
                },
                children: {
                    data: {
                        name: this.state.ActivityItem.title,
                        url: '/activitymanage/main',
                        state: {id: this.state.ActivityItem.id,  headerData: {
                            data: {
                                name: '活动管理',
                                url: '/activitymanage/list'
                            },
                            children: {
                                data: {
                                    name: this.state.ActivityItem.title
                                }
                            }
                        }}
                    },
                    children: {
                        data: {
                            name: '编辑'
                        }
                    }
                }
            }
            this.props.history.push({pathname: '/activitymanage/edit', state: {id: this.state.ActivityItem.id, headerData}});
        }
    }

    // 5. 删除
    _deleteItem(){
        if(!this.state.ActivityItem.id){
            return;
        }
        this.setState({
            isShowDelete: true
        })
    }

    async _setModalDelete(){
        let res = await deleteClassroom(this.state.ActivityItem.id);
        if(res.status === 0){
            message.success('删除成功');
            this.setState({
                checked: 0,
                ActivityItem: {},
                isShowDelete: false
            }, ()=>{
                this.props.reqActivityList(this.state.current, this.state.flagCount);
            });
        }
    }

    // 6. 取消发布
    _hideItem(){
        if(!this.state.ActivityItem.id){
            return;
        }
        if(this.state.ActivityItem.status === -1){
            message.warning('该活动尚未发布！');
            return;
        }
        this.setState({
            isShowUnpublish: true
        });
    }

    async _setModalUnpublish(){
        let res = await hideClassroom(this.state.ActivityItem.id);
        if(res.status === 0){
            message.success('已取消发布');
            this.setState({
                checked: 0,
                ActivityItem: {},
                isShowUnpublish: false
            }, ()=>{
                this.props.reqActivityList(this.state.current, this.state.flagCount);
            });
        }
    }

    // 7. 重新发布
    _showItem(){
        if(!this.state.ActivityItem.id){
            return;
        }
        if(this.state.ActivityItem.status === 0){
            message.warning('该活动已发布！');
            return;
        }
        this.setState({
            isShowPublish: true
        });
    }

    async _setModalPublish(){
        let res = await showClassroom(this.state.ActivityItem.id);
        if(res.status === 0){
            this.setState({
                checked: 0,
                ActivityItem: {},
                isShowPublish: false
            }, ()=>{
                message.success('发布成功');
                this.props.reqActivityList(this.state.current, this.state.flagCount);
            });
        }
    }

    // 8. 点击对话框的取消按钮
    _hideModal(flag){
        this.setState({
            [flag]: false
        })
    }

    // 9. 跳转详情页面
    _goToMain = (id, title) => {
        let headerData = {
            data: {
                name: '活动管理',
                url: '/activitymanage/list'
            },
            children: {
                data: {
                    name: title
                }
            }
        }
        this.props.history.push({pathname: '/activitymanage/main', state: {id, headerData}});
    }
}

const mapStateToProps = (state)=>{
    return {
        activityData: state.activityData
    }
  };

const mapDispatchToProps = (dispatch)=>{
    return {
        reqActivityList(type, offset, callback){
            const action = getActivityDataAction(type, offset, callback);
            dispatch(action)
        },
        reqActivityNum(type, callback){
            const action = getActivityNumAction(type, callback);
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityManage);