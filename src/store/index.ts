import { storage } from '@/utils'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    userInfo: null,
    isCollapse: storage.get('isCollapse') || false, // 侧边栏是否折叠
    genderMap: new Map([[0, '男'], [1, '女'], [2, '未知']]),
    statusMap: new Map([[0, '显示'], [1, '隐藏']]) // 文章状态
  },
  mutations: {
    SET_USER_INFO(state, value) {
      state.userInfo = value
    },
    SET_COLLAPSE(state) {
      const { isCollapse } = state
      state.isCollapse = !isCollapse
      storage.set('isCollapse', !isCollapse)
    }
  },
  actions: {
    getUserInfo(store) {
      return new Promise(resolve => {
        const fakerUser = {
          name: '超级管理员',
          avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1463733447,553354746&fm=15&gp=0.jpg'
        }
        store.commit('SET_USER_INFO', fakerUser)
        resolve(true)
      })
    }
  }
})

export default store
