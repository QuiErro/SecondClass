import React, {Component} from 'react';
import {connect} from "react-redux";
import {getUserDataAction} from '../../Store/actionCreators'
import { Input, Checkbox, message } from 'antd'
import Tool from './../../Components/Tool/Tool'

import logo from './../../Common/images/logo.png'
import login_bg from './../../Common/images/login_bg.png'
import username from './../../Common/images/username.svg'
import pwd from './../../Common/images/pwd.svg'

const _tool = new Tool; 

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            user_name: '',
            user_pwd: '',
            isRem: false
        }
    }

    render() {
        const {isRem, user_name, user_pwd} = this.state;
        return (
            <div id="login">
                <div id="img_section">
                    <div id="img_logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div id="img_bg">
                        <img src={login_bg} alt=""/>
                    </div>
                </div>
                <div id="msg_section">
                    <div id="msg_slogan">
                        <span>第二课堂&nbsp;|&nbsp;登录</span>
                    </div>
                    <div id="msg_form">
                        <div>
                            <Input
                              className="input-control"
                              allowClear 
                              placeholder="账号"
                              prefix={<img src={username}/>}  
                              name="user_name"
                              value = {user_name}
                              onChange={e=>this._onInputChange(e)}
                              onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <div>
                            <Input.Password 
                              className="input-control"
                              password 
                              placeholder="密码"
                              prefix={<img src={pwd}/>}
                              name="user_pwd"
                              value={user_pwd}
                              onChange={e=>this._onInputChange(e)}
                              onKeyUp={e=>this._onInputKeyUp(e)}
                            />
                        </div>
                        <div className="remember_pwd">
                            <Checkbox 
                              checked = {isRem}
                              onChange={ e=>this._isRem(e) }
                            >记住密码</Checkbox>
                        </div>
                        <button onClick={e=>this._onSubmit(e)}>登&nbsp;录</button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        if(this.props.userData){
            this.props.history.goBack();
        }else{
            // 取出本地用户数据
            let userData = JSON.parse(window.localStorage.getItem('userData'));
            if(userData){
                // 管理员曾选择记住密码
                this.setState({
                    isRem: true,
                    user_name: userData.username,
                    user_pwd: userData.password
                })
            }
        }
    }

    // 1. 是否勾选记住密码
    _isRem(e){
        // console.log(e.target.checked);
        this.setState({
            isRem: e.target.checked
        })
        if(!e.target.checked){
            window.localStorage.removeItem('userData');
        }
    }

    // 2. 当输入框的内容发生改变
    _onInputChange(e){
       // 2.1 获取数据
       let inputValue = e.target.value,
           inputName = e.target.name;

       // 2.2 更新数据
       this.setState({
           [inputName] : inputValue
       })

    }

    // 3. 处理回车
    _onInputKeyUp(e){
         if(e.keyCode === 13){
             this._onSubmit();
         }
    }

    // 4. 当用户提交表单
    _onSubmit(){
         // 4.1 获取数据
        const {user_name, user_pwd, isRem} = this.state;
        // 4.2 验证数据
        if(!user_name){
            message.error('输入的账号不能为空！');
            return;
        }
        if(!user_pwd){
            message.error('输入的密码不能为空！');
            return;
        }

        let params = {
            username: user_name,
            password: user_pwd
        };

        // 4.4 发起网络请求
        this.props.reqLogin(params, (flag, userData)=>{
            if(flag === 0){
                message.success('登录成功');
                if(isRem){
                    window.localStorage.setItem('userData', JSON.stringify(userData));
                }
                window.sessionStorage.setItem('tempUser', JSON.stringify(userData.username));
                this.props.history.replace('/');
                // 清除缓存的localStorage数据
                _tool.removeStore('publishRace');
                _tool.removeStore('publishActivity');
                _tool.removeStore('activityManage');
                _tool.removeStore('raceManage');
            }else{
                message.error('登录失败');
            }
        })
    }
}

const mapStateToProps = (state)=>{
    return {
        userData: state.userData
    }
  }

const mapDispatchToProps = (dispatch)=>{
    return {
        reqLogin(data, callback){
            const action = getUserDataAction(data, callback);
            dispatch(action)
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);