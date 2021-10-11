import { InjectionKey } from 'vue';
import { ActionTree, createStore, GetterTree, MutationTree, Store } from 'vuex';
import AuthModule from './modules/auth';

type GridSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// define your typings for the store state
export interface State {
  auth: typeof AuthModule;
  gridSize: GridSize;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

const state = () => ({
  gridSize: ''
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  SET_GRID_SIZE (state, payload: GridSize) {
    state.gridSize = payload;
  }
};

const actions: ActionTree<RootState, RootState> = {
  updateGridSize ({ commit, state }, newSize: number) {
    let size = 'xs';
    
    if (newSize >= 1200) {
      size = 'xl';
    } else if (newSize >= 992) {
      size = 'lg';
    } else if (newSize >= 768) {
      size = 'md';
    } else if (newSize >= 576) {
      size = 'sm';
    }
    
    if (state.gridSize === size) {
      return;
    }
    
    commit('SET_GRID_SIZE', size);
  }
};

const getters: GetterTree<RootState, RootState> = {
  gridSize (state) {
    return state.gridSize;
  }
};

export const store = createStore({
  // @ts-ignore
  state,
  mutations,
  actions,
  getters,
  modules: {
    // @ts-ignore
    auth: AuthModule
  }
});
