import { InjectionKey } from 'vue';
import { ActionTree, createStore, GetterTree, MutationTree, Store } from 'vuex';
import AuthModule from './modules/auth';
import CartModule from './modules/cart';

type GridSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// define your typings for the store state
export interface State {
  auth: typeof AuthModule;
  cart: typeof CartModule;
  gridSize: GridSize;
}

interface Size {
  value: number;
  label: GridSize;
}

// define injection key
export const storeKey: InjectionKey<Store<State>> = Symbol();

const state = () => ({
  gridSize: {
    value: 0,
    label: ""
  },
  screenSize: 0,
  sizes: [
    {
      value: 1200,
      label: 'xl'
    },
    {
      value: 992,
      label: 'lg'
    },
    {
      value: 768,
      label: 'md'
    },
    {
      value: 576,
      label: 'sm'
    },
  ]
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  SET_GRID_SIZE (state, payload: Size) {
    state.gridSize = payload;
  },
  SET_SCREEN_SIZE (state, payload: number) {
    state.screenSize = payload
  }
};

const actions: ActionTree<RootState, RootState> = {
  updateGridSize ({ commit, state }, newSize: number) {
    const size = state.sizes.find(el => el.value <= newSize) ?? state.sizes[state.sizes.length - 1];
  
    if (!size || state.gridSize.label === size.label) {
      return;
    }
  
    commit('SET_GRID_SIZE', size);
    commit('SET_SCREEN_SIZE', newSize);
  }
};

const getters: GetterTree<RootState, RootState> = {
  gridSize (state): GridSize {
    return state.gridSize ? (state.gridSize.label as GridSize) : 'xs';
  },
  mdAndDown (state): boolean {
    const minSize = state.sizes.find(el => el.label === "lg") ?? { value: 0 };
    
    return state.screenSize <= minSize.value;
  },
  mdAndUp (state): boolean {
    const minSize = state.sizes.find(el => el.label === "md") ?? { value: 0 };
    
    return state.screenSize >= minSize.value;
  },
  smAndDown (state): boolean {
    const minSize = state.sizes.find(el => el.label === "md") ?? { value: 0 };
    
    return state.screenSize <= minSize.value;
  },
};

export const store = createStore({
  // @ts-ignore
  state,
  mutations,
  actions,
  getters,
  modules: {
    // @ts-ignore
    auth: AuthModule,
    
    // @ts-ignore
    cart: CartModule
  }
});
