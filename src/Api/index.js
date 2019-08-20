import ajax from './ajax'

// 0.定义基础路径
const BASE_URL = '';

// 1.管理员登录
export const getUserData = (data) => ajax(BASE_URL + '/api/bg/login_admin', data, 'POST');

// 2.管理员退出
export const userLogout = () => ajax(BASE_URL + '/api/bg/logout_admin');

// 3.上传图片
export const fileUpload = (data) => ajax(BASE_URL + '/api/bg/image/upload', data, 'POST');

// 4.发布新比赛
export const newRace = (data) => ajax(BASE_URL + '/api/bg/new_competition', data, 'POST');

// 5.发布新活动
export const newActivity = (data) => ajax(BASE_URL + '/api/bg/new_activity', data, 'POST');