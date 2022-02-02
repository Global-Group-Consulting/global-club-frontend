import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: "/",
    name: "public.home",
    redirect: "/login",
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    component: () => import("@/views/guest/Login.vue"),
    name: "public.login",
    meta: {
      guest: true,
    },
  },
  {
    path: "/reset",
    component: () => import("@/views/guest/ForgetPassword.vue"),
    name: "public.reset",
    meta: {
      guest: true,
    },
  },
] as RouteRecordRaw[]
