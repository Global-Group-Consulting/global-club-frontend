import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { Product } from '@/@types/Product';

export interface FavouritesState {
  products: Product[];
  creationDate: string | null;
  lastUpdate: string | null;
}

const state: () => FavouritesState = () => ({
  products: [],
  creationDate: null,
  lastUpdate: null
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  ADD_PRODUCT (state, payload: Product) {
    state.products.push(payload);
  },
  REMOVE_PRODUCT (state, index: number) {
    state.products.splice(index, 1)
  },
  REMOVE_ALL_PRODUCT (state) {
    state.products.splice(0, state.products.length)
  },
  UPDATE_STORE_DATES (state) {
    if (state.products.length === 0) {
      state.lastUpdate = null;
      state.creationDate = null;
    }
    
    if (!state.creationDate) {
      state.creationDate = new Date().toISOString();
    }
    
    state.lastUpdate = new Date().toISOString();
  }
};

const actions: ActionTree<RootState, RootState> = {
  toggle ({ commit, state }, payload: Product | Product[]) {
    const toAdd = payload instanceof Array ? payload : [payload];
    
    for (const toAddElement of toAdd) {
      const alreadyExistingIndex: number = state.products.findIndex(el => el._id === toAddElement._id)
      
      if (alreadyExistingIndex < 0) {
        commit("ADD_PRODUCT", toAddElement);
      } else {
        commit("REMOVE_PRODUCT", alreadyExistingIndex);
      }
    }
    
    commit("UPDATE_STORE_DATES");
  },
  
  clean ({ commit }) {
    commit("REMOVE_ALL_PRODUCT");
    commit("UPDATE_STORE_DATES");
  }
};

const getters: GetterTree<RootState, RootState> = {
  products (state): Product[] {
    return state.products
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

