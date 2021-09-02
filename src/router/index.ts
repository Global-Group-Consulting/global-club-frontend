import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  /*   {
    path: '',
    redirect: '/login'
  }, */
  {
    path: "/folder/:id",
    component: () => import("../views/Folder.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  }, 
  {
    path: "/user",
    component: () => import("../views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
