import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { User } from '@/@types/User';
import { UserAclRolesEnum } from '@/@enums/user.acl.roles.enum';
import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum';
import {merge} from "lodash";

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
  },
  UPDATE_USER (state, payload: Partial<User>) {
    merge(state.user, payload)
  }
};

const actions: ActionTree<RootState, RootState> = {
  setLoggedState({commit}, payload: boolean) {
    commit("SET_LOGGED_STATE", payload)
  },
  
  setUser({commit}, user: any) {
    commit("SET_USER", user)
  },
  
  updateUser({commit}, newData: Partial<User>) {
    commit("UPDATE_USER", newData)
  }
};

const getters: GetterTree<RootState, RootState> = {
  isLoggedIn (state) {
    return state.loggedIn;
  },
  user (state: AuthState): User | null {
    return state.user;
  },
  fullName (state: AuthState): string {
    if (!state.user) {
      return ""
    }
    
    return [state.user.firstName, state.user.lastName].join(" ");
  },
  permissions (state: AuthState): AclPermissionsEnum[] | any[] {
    return state.user?.permissions ?? [];
  },
  isAdmin (state: AuthState) {
    const validAclRoles: string[] = [UserAclRolesEnum.SUPER_ADMIN, UserAclRolesEnum.ADMIN, UserAclRolesEnum.ADMIN_CLUB];
    
    return state.user?.roles.some(role => validAclRoles.includes(role));
  },
  isSuperAdmin (state: AuthState) {
    const validAclRoles: string[] = [UserAclRolesEnum.SUPER_ADMIN];
    
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
