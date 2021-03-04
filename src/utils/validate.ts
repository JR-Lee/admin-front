import { RuleItem } from "@/types/validate"

export const required = (name: string): RuleItem => {
  return { required: true, message: `请输入${name}` }
}

export const mail = (name: string = 'mail'): RuleItem => {
  return {
    pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    message: `邮箱格式不正确`
  }
}

export const password = (): RuleItem => {
  return {
    pattern: /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/,
    message: `密码应为 8 - 32 位包含大小写字母及数字的字符串`
  }
}


