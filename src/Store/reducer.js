import * as constants from './actionTypes'

// 默认数据
const defaultState = {
    userData: null,
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
    return state;
}