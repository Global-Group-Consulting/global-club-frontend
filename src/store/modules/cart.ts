import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { OrderProduct } from '@/@types/Order';
import { Product } from '@/@types/Product';

export interface CartState {
  products: OrderProduct[];
  creationDate: string | null;
  lastUpdate: string | null;
}

const state: () => CartState = () => ({
  products: [],
  creationDate: null,
  lastUpdate: null
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  ADD_PRODUCT (state, payload: OrderProduct) {
    state.products.push(payload);
  },
  
  UPDATE_PRODUCT_QTA (state, payload: { index: number; qta: number }) {
    const entry = state.products[payload.index];
  
    entry.qta += payload.qta
    entry.price = entry.product.price * entry.qta
  },
  
  REMOVE_PRODUCT (state, elIndex: number) {
    state.products.splice(elIndex, 1)
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
  add ({ commit, state }, payload: Product | Product[]) {
    const toAdd = payload instanceof Array ? payload : [payload];
    
    for (const toAddElement of toAdd) {
      const alreadyExistingIndex: number = state.products.findIndex(el => el.product._id === toAddElement._id)
      
      if (alreadyExistingIndex < 0) {
        commit("ADD_PRODUCT", {
          product: toAddElement,
          qta: 1,
          price: toAddElement.price
        });
      } else {
        commit("UPDATE_PRODUCT_QTA", {
          index: alreadyExistingIndex,
          qta: +1
        });
      }
    }
    
    commit("UPDATE_STORE_DATES");
  },
  
  remove ({ commit, state }, payload: string) {
    const alreadyExistingIndex: number = state.products.findIndex(el => el.product._id === payload)
  
    if (alreadyExistingIndex < 0) {
      return
    }
  
    commit("REMOVE_PRODUCT", alreadyExistingIndex);
    commit("UPDATE_STORE_DATES");
  },
  
  /**
   * Updates the qta of an existing cart product. The qta must be the amount that the qta must change.
   */
  updateQta ({ commit, state }, payload: { productId: string; qta: number }) {
    const alreadyExistingIndex: number = state.products.findIndex(el => el.product._id === payload.productId)
  
    if (alreadyExistingIndex < 0) {
      return
    }
  
    commit("UPDATE_PRODUCT_QTA", {
      index: alreadyExistingIndex,
      qta: payload.qta,
    });
  
    commit("UPDATE_STORE_DATES")
  },
  
  clean ({ commit }) {
    commit("REMOVE_ALL_PRODUCT");
    commit("UPDATE_STORE_DATES");
  }
};

const getters: GetterTree<RootState, RootState> = {
  products (state): OrderProduct[] {
    return state.products
  },
  totalProducts (state): number {
    if (state.products.length === 0) {
      return 0
    }
    
    return state.products.reduce((acc, curr) => acc + curr.qta, 0);
  },
  totalPrice (state): number {
    let total = 0;
    
    state.products.forEach(entry => {
      total += entry.product.price * entry.qta
    })
    
    return total
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

