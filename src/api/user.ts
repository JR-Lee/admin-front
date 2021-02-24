import http from "@/http"

/** 获取验证码 */
export const getVerifyCode = (mail: string) => http.post('/verify-code/asign', { mail })

/** 登录 */
export interface LoginData {
  username: string;
  password: string;
}
export const login = (data: LoginData) => http.post('/user/login', data)

/** 注册 */
export interface RegisterData extends LoginData {
  mail: string;
  code: string;
}
export const register = (data: RegisterData) => http.put('/user/register', data)
