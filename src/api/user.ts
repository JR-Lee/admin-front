import http from "@/http"

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData extends LoginData {
  mail: string;
  code: string;
}

/** 获取验证码 */
export const getVerifyCode = (mail: string) => http.post('/verify-code/asign', { mail })

/** 登录 */
export const login = (data: LoginData) => http.post('/user/login', data)

/** 注册 */
export const register = (data: RegisterData) => http.put('/user/register', data)

/** 更改密码 */
export const changePassword = (password: string) => http.post('/user/change-password', { password })
