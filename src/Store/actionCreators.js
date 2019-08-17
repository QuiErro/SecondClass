import * as constants from './actionTypes'
import {
    getUserData,
    userLogout
} from './../Api/index'

// 1. 用户登录
export const getUserDataAction = (data, callBack)=>{
    return (dispatch)=>{
        getUserData(data).then((res)=>{
            if(res.status === 0){
                const userData = data;
                dispatch({
                    type: constants.INIT_USER_DATA,
                    userData
                })
                callBack && callBack(0, userData);
            }else{
                callBack && callBack(1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 2. 用户退出
export const logoutAction = (callBack)=>{
    return (dispatch)=>{
        userLogout().then((res)=>{
            if(res.status === 0){
                dispatch({
                    type: constants.CLEAR_USER_DATA
                })
                callBack && callBack(0);
            }else{
                callBack && callBack(1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}