import ajax from './ajax'

// 0.定义基础路径
const BASE_URL = '';

// 1.管理员登录
export const getUserData = (data) => ajax(BASE_URL + '/api/bg/login', data, 'POST');

// 2.管理员退出
export const userLogout = () => ajax(BASE_URL + '/api/bg/logout');

// 3.上传图片
export const fileUpload = (data) => ajax(BASE_URL + '/api/bg/image/upload', data, 'POST');

// 4.发布新比赛/活动
export const newClassroom = (data) => ajax(BASE_URL + '/api/bg/classroom/new', data, 'POST');

// 5. 取消发布比赛/活动
export const hideClassroom = (id) => ajax(BASE_URL + '/api/bg/classroom/hide', {id}, 'POST');

// 6. 重新发布比赛/活动
export const showClassroom = (id) => ajax(BASE_URL + '/api/bg/classroom/show', {id}, 'POST');

// 7. 删除比赛/活动
export const deleteClassroom = (id) => ajax(BASE_URL + '/api/bg/classroom/delete', {id}, 'POST');

// 8. 查看某类型比赛总数
export const getRaceNum = (type) => ajax(BASE_URL + '/api/bg/competition/num/' + type);

// 9. 查看某类型活动总数
export const getActivityNum = (type) => ajax(BASE_URL + '/api/bg/activity/num/' + type);

// 10. 编辑比赛/活动
export const updateClassroom = (data) => ajax(BASE_URL + '/api/bg/classroom/update', data, 'POST');

// 11. 查看比赛（分页）
export const getRaceData = (type, offset) => ajax(BASE_URL + '/api/bg/competition/view', {type, offset});

// 11. 查看活动（分页）
export const getActivityData = (type, offset) => ajax(BASE_URL + '/api/bg/activity/view', {type, offset});

// 12. 查看比赛/活动（详情）
export const getClassroomData = (id) => ajax(BASE_URL + '/api/bg/classroom/view/' + id);

// 13. 查看比赛/活动 已签到的学生
export const getSignInStuData = (id) => ajax(BASE_URL + '/api/bg/classroom/signin/' + id);

// 14. 学生列表
export const getStuListData = () => ajax(BASE_URL + '/api/bg/student/view', {major_id: 1});

// 15. 所有专业信息
export const getMajorListData = () => ajax(BASE_URL + '/api/bg/major/info');