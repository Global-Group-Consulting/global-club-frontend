import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import WelcomePage from "../views/WelcomePage.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
/*import ForgetPassword from "../views/ForgetPassword.vue"*/

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    path: "/welcome",
    component: WelcomePage,
  },
  {
    path: "/reset",
    component: ForgetPassword,
  },
  /*{
    path: "/folder/:id",
    component: () => import("../views/Folder.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Dashboard.vue"),
  },*/
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
