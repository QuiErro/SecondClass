import * as constants from './actionTypes'
import {
    getUserData,
    userLogout,
    getRaceNum,
    getActivityNum,
    getRaceData,
    getActivityData
} from './../Api/index'

import moment from 'moment'

// 1. 用户登录
export const getUserDataAction = (data, callback)=>{
    return (dispatch)=>{
        getUserData(data).then((res)=>{
            if(res.status === 0){
                const userData = data;
                dispatch({
                    type: constants.INIT_USER_DATA,
                    userData
                })
                callback && callback(res.status, userData);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 2. 用户退出
export const logoutAction = (callback)=>{
    return (dispatch)=>{
        userLogout().then((res)=>{
            if(res.status === 0){
                dispatch({
                    type: constants.CLEAR_USER_DATA
                })
                callback && callback(res.status);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 3. 获取某类型比赛总数
export const getRaceNumAction = (type, callback) => {
    return (dispatch)=>{
        // 请求网络数据
        getRaceNum(type).then((res)=>{
            if(res.status === 0){
                let tempData = {
                    type: type,
                    num: res.data
                };
                dispatch({
                    type: constants.INIT_RACE_COUNT,
                    tempData
                })
                callback && callback(res.status);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 4. 获取某类型活动总数
export const getActivityNumAction = (type, callback) => {
    return (dispatch)=>{
        // 请求网络数据
        getActivityNum(type).then((res)=>{
            if(res.status === 0){
                let tempData = {
                    type: type,
                    num: res.data || 0
                };
                dispatch({
                    type: constants.INIT_ACTIVITY_COUNT,
                    tempData
                })
                callback && callback(res.status, res.data);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 5. 查看某类型活动
export const getActivityDataAction = (type, offset, callback) => {
    return (dispatch)=>{
        // 请求网络数据
        getActivityData(type, offset).then((res)=>{
            if(res.status === 0){
                let activityData = res.data;
                activityData.forEach((item)=>{
                    item.signUp_end_format = moment(item.signUp_end).format('YYYY-MM-DD');
                });
                dispatch({
                    type: constants.INIT_ACTIVITY_DATA,
                    activityData
                })
                callback && callback(res.status);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}

// 6. 查看某类型比赛
export const getRaceDataAction = (type, offset, callback) => {
    return (dispatch)=>{
        // 请求网络数据
        getRaceData(type, offset).then((res)=>{
            if(res.status === 0){
                let raceData = res.data;
                raceData.forEach((item)=>{
                    item.signUp_end_format = moment(item.signUp_end).format('YYYY-MM-DD');
                });
                dispatch({
                    type: constants.INIT_RACE_DATA,
                    raceData
                })
                callback && callback(res.status);
            }else{
                callback && callback(-1);
            }
        }).catch((error)=>{
            console.log(error)
        })
    }
}