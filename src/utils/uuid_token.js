import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串
export const getUUID = ()=>{
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有则生成一个
    if(!uuid_token){
        // 生成一个临时游客身份
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}