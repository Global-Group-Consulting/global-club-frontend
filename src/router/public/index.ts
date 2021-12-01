import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: "/",
    component: () => import("@/views/guest/WelcomePage.vue"),
    name: "public.home",
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
