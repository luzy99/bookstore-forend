import ajax from "./ajax";
const BASE_URL = 'http://localhost:8082/api'

//登录
export const reqLogin = ({account, password}) => ajax(BASE_URL+'/user/login', {account, password})

// 注册账号
export const reqRegister = (account,password)=>ajax(BASE_URL+'/user/register',{account,password})

//getUserList得到用户列表
export const reqGetUserList = (page,pageSize)=>ajax(BASE_URL+'/getUserList',{page,pageSize})

//修改用户的的禁用状态
export const reqModifyUserStatus = (id,status)=>ajax(BASE_URL+'/modifyUserStatus',{id,status})

//得到用户的基本信息getUserInfo
export const reqGetUserInfo = (account)=>ajax(BASE_URL+'/getUserInfo',{account})

//修改密码
export const reqModUserPwd = (account,oldPassword,newPassword)=>ajax(BASE_URL+'/modifyUserPwd',{account,oldPassword,newPassword})

