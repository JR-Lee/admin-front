export default {
  set(name: string, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  },

  get(name: string) {
    let value
    try {
      value = JSON.parse(localStorage.getItem(name) as string)
    } catch (err) { // 不符合 JSON 格式的数据返回原始数据
      value = localStorage.getItem(name)
    }
    return value
  },

  remove(name: string) {
    localStorage.removeItem(name)
  },
}