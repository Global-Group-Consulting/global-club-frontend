import { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'public.home',
    redirect: '/login',
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/guest/Login.vue'),
    name: 'public.login',
    meta: {
      guest: true
    }
  },
  {
    path: '/reset',
    component: () => import('@/views/guest/ForgetPassword.vue'),
    name: 'public.reset',
    meta: {
      guest: true
    }
  },
  {
    path: '/auth/activate',
    component: () => import('@/views/guest/ActivateAccount.vue'),
    name: 'public.activateAccount',
    meta: {
      guest: true
    }
  },
  {
    path: '/finder',
    name: "public.finder",
    component: () => import('@/views/shared/Finder.vue')
  },
  {
    path: '/not-found',
    name: "public.notFound",
    component: () => import('@/views/shared/NotFound.vue')
  }
] as RouteRecordRaw[]
