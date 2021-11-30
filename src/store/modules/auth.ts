import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { User } from '@/@types/User';
import { UserAclRolesEnum } from '@/@enums/user.acl.roles.enum';
import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum';

export interface AuthState {
  loggedIn: boolean;
  user: null | User;
}

const state = () => ({
  loggedIn: false,
  user: null,
});

type RootState = ReturnType<typeof state>

const mutations: MutationTree<RootState> = {
  SET_LOGGED_STATE (state, payload: boolean) {
    state.loggedIn = payload;
  },
  SET_USER (state, payload: any) {
    state.user = payload;
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
  isLoggedIn (state) {
    return state.loggedIn;
  },
  user (state: AuthState): User | null {
    return state.user;
  },
  permissions (state: AuthState): AclPermissionsEnum[] | any[] {
    return state.user?.permissions ?? [];
  },
  isAdmin (state: AuthState) {
    const validAclRoles: string[] = [UserAclRolesEnum.SUPER_ADMIN, UserAclRolesEnum.ADMIN, UserAclRolesEnum.CLIENTS_SERVICE];
    
    return state.user?.roles.some(role => validAclRoles.includes(role));
  },
  isNormal (state: AuthState) {
    const validAclRoles: string[] = [UserAclRolesEnum.AGENT, UserAclRolesEnum.CLIENT];
    
    return state.user?.roles.some(role => validAclRoles.includes(role));
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
