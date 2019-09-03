import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getRaceNumAction, getRaceDataAction} from '../../Store/actionCreators'
import {hideClassroom, showClassroom, deleteClassroom} from './../../Api/index'
import { message, Button, Menu, Checkbox, Modal, Empty } from 'antd'
import SPagination from './../../Components/Pagination/SPagination'
import Tool from './../../Components/Tool/Tool'

const _tool = new Tool();    

class RaceManage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            checked: 0,     // 当前选中的活动序号
            RaceItem: {},   // 当前选中活动的数据
            flagCount: 0,   // 活动序号基础
            current: 'A',   // 比赛级别
            pageNum: 1,     // 当前页码
            total: 0,       // 数据总数
            pageSize: 10,   // 每页数据量
        };
    }

    componentWillMount() {
        // 获取本地缓存
        let tempObj = _tool.getStore('raceManage');
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
            this.props.reqRaceNum(current, (flag, num)=>{
                if(flag === 0){
                    this.setState({
                        total: num
                    })
                }
            });
            // 获取列表
            this.props.reqRaceList(current, flagCount);
        }else{
            // 请求总数
            this.props.reqRaceNum('A', (flag, num)=>{
                if(flag === 0){
                    this.setState({
                        total: num
                    })
                }
            });
            // 获取列表
            this.props.reqRaceList('A', 0);
        }
    }

    render() {
        const {checked, pageNum, total, pageSize, flagCount} = this.state;
        return (
            <div id="race_manage">
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
                <div id="content_section" className="items_container">
                    {  this.props.raceData && this.props.raceData.length>0 ? 
                        this.props.raceData.map((item, index)=>{
                            return (
                                <div className="con_item" 
                                  key={item.id}
                                  onMouseEnter={(e)=> this._itemEnterOrLeave(e, 0)}
                                  onMouseLeave={(e)=> this._itemEnterOrLeave(e, 1)}
                                  onClick={()=> this._goToMain(item.id)}
                                >
                                    <div className="item_num">{flagCount + index + 1}</div>
                                    <div className="item_check">
                                        <Checkbox
                                          checked={checked === (index + 1) ? true : false}
                                          onClick={(e)=> this._onCheckedChang(e, index, item)}
                                        ></Checkbox>
                                    </div>
                                    <div className="item_img">
                                        <img src={item.image || ''} alt=""/>
                                    </div>
                                    <div className="item_name">
                                        {item.title}
                                    </div>
                                    <div className="item_people">{item.signUp}人</div>
                                    <div className="item_time">{item.signUp_end_format}</div>
                                    <div className="item_address">{item.position}</div>
                                    <div className="item_pub">{item.status === 0 ? '已发布' : '未发布'}</div>
                                </div>
                            )
                        }) : <Empty />
                    }
                </div>
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
            _tool.setStore('raceManage', {
                current: e.key,
                pageNum: 1
            });
        });
        // 1.2 请求对应类型数量
        this.props.reqRaceNum(e.key, (flag, num)=>{
            if(flag === 0){
                this.setState({
                    total: num
                })
            }
        });
        // 1.3 获取列表
        this.props.reqRaceList(e.key, 0);
    }

     // 2. 分页
    _onPageNumChange(pageNum){
        this.setState({
            pageNum,
            flagCount: (pageNum - 1) * this.state.pageSize
        }, ()=>{
            this.props.reqRaceList(this.state.current, this.state.flagCount);
            _tool.setStore('raceManage', {
                pageNum: this.state.pageNum
            });
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

    // 4. 选中的活动序号
    _onCheckedChang(e, index, item){
        if(e.target.checked){
            this.setState({
                checked: index + 1,
                RaceItem: item
            });
        }else{
            this.setState({
                checked: 0,
                RaceItem: {}
            });
        }
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    // 5. 编辑
    _editItem(){
        if(this.state.RaceItem.id){
            this.props.history.push({pathname: '/racemanage/edit', state: {id: this.state.RaceItem.id}});
        }
    }

    // 6. 删除
    _deleteItem(){
        if(!this.state.RaceItem.id){
            return;
        }
        Modal.confirm({
            title: '提示',
            content: '您确定删除该比赛吗？',
            cancelText: '取消',
            okText: '确定',
            onOk: ()=>{
                deleteClassroom(this.state.RaceItem.id).then((res)=>{
                    console.log(res)
                    if(res.status === 0){
                        message.success('删除成功');
                        this.setState({
                            checked: 0,
                            RaceItem: {}
                        });
                        this.props.reqRaceList(this.state.current, this.state.flagCount);
                    }
                });
            },
        });
    }

    // 7. 取消发布
    _hideItem(){
        if(!this.state.RaceItem.id){
            return;
        }
        if(this.state.RaceItem.status === -1){
            message.warning('该比赛尚未发布！');
            return;
        }
        Modal.confirm({
            title: '提示',
            content: '您确定取消发布该比赛吗？',
            cancelText: '取消',
            okText: '确定',
            onOk: ()=>{
                hideClassroom(this.state.RaceItem.id).then((res)=>{
                    if(res.status === 0){
                        message.success('已取消发布');
                        this.setState({
                            checked: 0,
                            RaceItem: {}
                        });
                        this.props.reqRaceList(this.state.current, this.state.flagCount);
                    }
                });
            },
        });
    }

    // 8. 重新发布
    _showItem(){
        if(!this.state.RaceItem.id){
            return;
        }
        if(this.state.RaceItem.status === 0){
            message.warning('该比赛已发布！');
            return;
        }
        Modal.confirm({
            title: '提示',
            content: '您确定重新发布该比赛吗？',
            cancelText: '取消',
            okText: '确定',
            onOk: ()=>{
                showClassroom(this.state.RaceItem.id).then((res)=>{
                    if(res.status === 0){
                        this.setState({
                            checked: 0,
                            RaceItem: {}
                        });
                        message.success('发布成功');
                        this.props.reqRaceList(this.state.current, this.state.flagCount);
                    }
                });
            },
        });
    }

    // 9. 跳转详情页面
    _goToMain(id){
        this.props.history.push({pathname: '/racemanage/main', state: {id}});
    }
}

const mapStateToProps = (state)=>{
    return {
        raceData: state.raceData
    }
  };

const mapDispatchToProps = (dispatch)=>{
    return {
        reqRaceList(type, offset, callback){
            const action = getRaceDataAction(type, offset, callback);
            dispatch(action)
        },
        reqRaceNum(type, callback){
            const action = getRaceNumAction(type, callback);
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceManage);