import http from "."

/**
 * 登录
 */
export interface LoginData {
  username: string;
  password: string;
}
export const login = (data: LoginData) => http.post('/login')