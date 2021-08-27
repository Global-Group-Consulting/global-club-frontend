import {InjectionKey} from "vue";
import {createStore, Store} from "vuex";
import AuthModule from "./modules/auth";

// define your typings for the store state
export interface State {
  auth: typeof AuthModule;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth: AuthModule
  }
})
