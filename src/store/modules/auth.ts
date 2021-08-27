import {GetterTree, ActionTree, MutationTree} from 'vuex'

const state = () => ({
  loggedIn: false,
  user: null,
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  SET_LOGGED_STATE(state, payload: boolean) {
    state.loggedIn = payload
  },
  SET_USER(state, payload: any) {
    state.user = payload
  }
};

const actions: ActionTree<RootState, RootState> = {
  setLoggedState({commit}, payload: boolean) {
    commit("SET_LOGGED_STATE", payload)
  },
  
  setUser({commit}, user: any) {
    commit("SET_USER", user)
  }
};

const getters: GetterTree<RootState, RootState> = {
  isLoggedIn(state) {
    return state.loggedIn
  },
  user(state) {
    return state.user
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
