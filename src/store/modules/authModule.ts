import type { Module } from 'vuex'
import type { AuthModuleState, RootState } from '@/store/types'
import { authActions } from '../constants'

const authModule: Module<AuthModuleState, RootState> = {
  state: () => ({
    token: null
  }),

  mutations: {
    [authActions.SET_TOKEN](state, value: string) {
      state.token = value
    }
  },

  actions: {
    [authActions.GET_LOCAL_TOKEN]({ commit }) {
      const token = localStorage.getItem('token')

      if (token === null) {
        const redirectPath = encodeURIComponent(`htpps://${window.location.hostname}/redirect`)
        const href = `
          https://id.findcreek.com/auth/?redirectTo=${redirectPath}&returnToken=true
        `
        window.location.href = href
      } else if (token.trim().length > 0) {
        commit(authActions.SET_TOKEN, token)
      } else {
        alert('Ошибка авторизации') // eslint-disable-line
      }
    }
  }
}

export default authModule
