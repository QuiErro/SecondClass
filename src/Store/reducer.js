import * as constants from './actionTypes'

// 默认数据
const defaultState = {
    userData: null,
    raceNum: {},
    activityNum: {},
    raceData: [],
    activityData: [],
};

export default (state = defaultState, action)=>{
    if(action.type === constants.INIT_USER_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.userData = action.userData;
        return newState;
    }
    if(action.type === constants.CLEAR_USER_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.userData = null;
        return newState;
    }
    if(action.type === constants.INIT_RACE_COUNT){
        const newState = JSON.parse(JSON.stringify(state));
        let tempObj = action.tempData;
        newState.raceNum[tempObj.type] = tempObj.num;
        return newState;
    }
    if(action.type === constants.INIT_ACTIVITY_COUNT){
        const newState = JSON.parse(JSON.stringify(state));
        let tempObj = action.tempData;
        newState.activityNum[tempObj.type] = tempObj.num;
        return newState;
    }
    if(action.type === constants.INIT_ACTIVITY_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.activityData = action.activityData;
        return newState;
    }
    if(action.type === constants.INIT_RACE_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.raceData = action.raceData;
        return newState;
    }
    return state;
}