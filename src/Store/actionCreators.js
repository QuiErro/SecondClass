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
    return async (dispatch)=>{
        let res = await getUserData(data);
        if(res.status === 0){
            const userData = data;
            dispatch({
                type: constants.INIT_USER_DATA,
                userData
            })
        }
        callback && callback(res, data);
    }
}

// 2. 用户退出
export const logoutAction = (callback)=>{
    return async (dispatch)=>{
        let res = await userLogout();
        if(res.status === 0){
            dispatch({
                type: constants.CLEAR_USER_DATA
            })
        }
        callback && callback(res);
    }
}

// 3. 获取某类型比赛总数
export const getRaceNumAction = (type, callback) => {
    return async (dispatch)=>{
        // 请求网络数据
        let res = await getRaceNum(type);
        if(res.status === 0){
            let tempData = {
                type: type,
                num: res.data || 0
            };
            dispatch({
                type: constants.INIT_RACE_COUNT,
                tempData
            })
        }
        callback && callback(res, res.data);
    }
}

// 4. 获取某类型活动总数
export const getActivityNumAction = (type, callback) => {
    return async (dispatch)=>{
        // 请求网络数据
        let res = await getActivityNum(type);
        if(res.status === 0){
            let tempData = {
                type: type,
                num: res.data || 0
            };
            dispatch({
                type: constants.INIT_ACTIVITY_COUNT,
                tempData
            })
        }
        callback && callback(res, res.data);
    }
}

// 5. 查看某类型活动
export const getActivityDataAction = (type, offset, callback) => {
    return async (dispatch)=>{
        // 请求网络数据
        let res = await getActivityData(type, offset);
        if(res.status === 0){
            let activityData = res.data || [];
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
    }
}

// 6. 查看某类型比赛
export const getRaceDataAction = (type, offset, callback) => {
    return async (dispatch)=>{
        // 请求网络数据
        let res = await getRaceData(type, offset);
        if(res.status === 0){
            let raceData = res.data || [];
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
    }
}