import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { OrderProduct } from '@/@types/Order';

export interface CartState {
  products: OrderProduct[];
  totalPrice: number;
  creationDate: Date | null;
  lastUpdate: Date | null;
}

const state: () => CartState = () => ({
  products: [],
  totalPrice: 0,
  creationDate: null,
  lastUpdate: null
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  ADD_PRODUCT (state, payload: OrderProduct) {
    state.products.push(payload);
  },
  
  UPDATE_PRODUCT_QTA (state, payload: { index: number; qta: number }) {
    const product = state.products[payload.index];
    
    product.qta += payload.qta
  },
  
  REMOVE_PRODUCT (state, elIndex: number) {
    state.products.splice(elIndex, 1)
  },
  
  REMOVE_ALL_PRODUCT (state) {
    state.products.splice(0, state.products.length)
  },
};

const actions: ActionTree<RootState, RootState> = {
  add ({ commit, state }, payload: OrderProduct | OrderProduct[]) {
    const toAdd = payload instanceof Array ? payload : [payload];
    
    for (const toAddElement of toAdd) {
      const alreadyExistingIndex: number = state.products.findIndex(el => el.product._id === toAddElement.product._id)
      
      if (alreadyExistingIndex < 0) {
        commit("ADD_PRODUCT", toAddElement);
      } else {
        commit("UPDATE_PRODUCT_QTA", {
          index: alreadyExistingIndex,
          qta: +1
        });
      }
    }
  },
  
  remove ({ commit, state }, payload: string) {
    const alreadyExistingIndex: number = state.products.findIndex(el => el.product._id === payload)
    
    if (alreadyExistingIndex < 0) {
      return
    }
    
    commit("REMOVE_PRODUCT", alreadyExistingIndex)
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
      qta: payload.qta
    })
  },
  
  clean ({ commit }) {
    commit("REMOVE_ALL_PRODUCT");
  }
};

const getters: GetterTree<RootState, RootState> = {
  products (state): OrderProduct[] {
    return state.products
  },
  tempTotal (state): number {
    return state.totalPrice
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

