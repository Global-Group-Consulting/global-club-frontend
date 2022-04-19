import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { OrderProduct } from '@/@types/Order'
import { Product } from '@/@types/Product'
import { inject } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export interface NotificationState {
  counters: {
    unread: number;
    read: number;
  };
}

const state: () => NotificationState = () => ({
  counters: {
    unread: 0,
    read: 0
  }
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  UPDATE_COUNTERS (state, payload: any) {
    state.counters.read = payload.read
    state.counters.unread = payload.unread
  }
}

const actions: ActionTree<RootState, RootState> = {
  async fetchCounters ({ commit }, http: HttpPlugin) {
    const result = await http.api.notifications.getCounters()
    
    commit('UPDATE_COUNTERS', result ?? { unread: 0, read: 0 })
  }
  
}

const getters: GetterTree<RootState, RootState> = {
  unread (state): number {
    return state.counters.unread
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

