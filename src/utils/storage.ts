export default {
  set(name: string, value: unknown) {
    localStorage.setItem(name, JSON.stringify(value))
  },

  get(name: string) {
    return JSON.parse(localStorage.getItem(name) + '')
  },

  remove(name: string) {
    localStorage.removeItem(name)
  },
}