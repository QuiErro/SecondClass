import ajax from './ajax'

// 0.定义基础路径
const BASE_URL = '';

// 1.管理员登录
export const getUserData = (data) => ajax(BASE_URL + '/api/bg/login_admin', data, 'POST');

// 2.管理员退出
export const userLogout = () => ajax(BASE_URL + '/api/bg/logout_admin');