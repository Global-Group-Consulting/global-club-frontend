import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import { store } from "@/store";

const publicRoutes = [
  {
    path: "/",
    component: import("../views/public/WelcomePage.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    component: () => import("../views/public/Login.vue"),
    meta: {
      guest: true,
    },
  },
  {
    path: "/reset",
    component: import("../views/public/ForgetPassword.vue"),
    meta: {
      guest: true,
    },
  },
];
const privateRoutes = [
  {
    path: "/",
    redirect: "/tabs/tab1",
  },
  {
    path: "/tabs/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/Tab1.vue"),
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2.vue"),
      },
      {
        path: "tab3",
        component: () => import("@/views/Tab3.vue"),
      },
      {
        path: "tab4",
        component: () => import("@/views/Tab4.vue"),
      },
      {
        path: "tab5",
        component: () => import("@/views/Tab5.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("../views/private/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    component: () => import("../views/private/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/wallet",
    component: () => import("../views/private/PremiumWallet.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/cart",
    component: () => import("../views/private/ShoppingCart.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/products",
    component: () => import("../views/private/ProductsList.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/help",
    component: () => import("../views/private/ChatHelp.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/wish",
    component: () => import("../views/private/WishList.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/wallet",
    component: () => import("../views/private/WalletStatement.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/search",
    component: () => import("../views/private/SearchPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/product",
    component: () => import("../views/private/ProductDetails.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/history",
    component: () => import("../views/private/OrdersHistory.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/order",
    component: () => import("../views/private/OrderStatus.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/user",
    component: () => import("../views/private/PersonalData.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const routes: Array<RouteRecordRaw> = [...publicRoutes, ...privateRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Due to the fact that this could be accessed
  // before the AuthPlugin gets completed, we await that this first gets initiated
  await AuthPlugin.isInitiated;
  const loggedIn = store.getters["auth/isLoggedIn"];
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guest = to.matched.some((record) => record.meta.guest);

  if (requiresAuth && !loggedIn) {
    return next({
      path: "/",
    });
  } else if (guest && loggedIn) {
    return next({
      path: "/dashboard",
    });
  }

  next();
});

export default router;
