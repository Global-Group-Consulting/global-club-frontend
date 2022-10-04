import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { inject } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export interface NotificationState {
  counters: {
    unread: number;
    read: number;
  };
  http: HttpPlugin | null;
}

const state: () => NotificationState = () => ({
  counters: {
    unread: 0,
    read: 0
  },
  http: null
})

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  UPDATE_COUNTERS (state, payload: any) {
    state.counters.read = payload.read
    state.counters.unread = payload.unread
  }
}

const actions: ActionTree<RootState, RootState> = {
  async fetchCounters ({ commit, state }) {
    if (state.http === null) {
      state.http = inject('http') as HttpPlugin
    }
    const result = await state.http.api.notifications.getCounters()
    
    commit('UPDATE_COUNTERS', result ?? { unread: 0, read: 0 })
  },
  
  async autoFetch ({ dispatch }) {
    setTimeout(() => {
      dispatch('fetchCounters')
      dispatch('autoFetch')
    }, 10000)
    
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

