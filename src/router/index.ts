import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import AdminRoutes from "./admin";
import PrivateRoutes from "./private";
import { useStore } from 'vuex';
import { storeKey } from '@/store';

const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("../views/guest/WelcomePage.vue"),
    name: "public.home",
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    component: () => import("../views/guest/Login.vue"),
    name: "public.login",
    meta: {
      guest: true,
    },
  },
  {
    path: "/reset",
    component: () => import("../views/guest/ForgetPassword.vue"),
    name: "public.reset",
    meta: {
      guest: true,
    },
  },
];
const privateRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    component: () => import("../views/private/Dashboard.vue"),
    name: "private.home",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/walletpremium",
    component: () => import("../views/private/PremiumWallet.vue"),
    name: "private.wallet",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/cart",
    component: () => import("../views/private/ShoppingCart.vue"),
    name: "private.cart",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/products",
    component: () => import("../views/private/ProductsList.vue"),
    name: "private.products",
    meta: {
      isPrivate: true,
    },
  },

  {
    path: "/help",
    component: () => import("../views/private/ChatHelp.vue"),
    name: "private.help",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/wish",
    component: () => import("../views/private/WishList.vue"),
    name: "private.wish",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/wallet",
    component: () => import("../views/private/WalletStatement.vue"),
    name: "private.WalletStatement",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/search",
    component: () => import("../views/private/SearchPage.vue"),
    name: "private.search",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/product",
    component: () => import("../views/private/ProductDetails.vue"),
    name: "private.prduct",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/history",
    component: () => import("../views/private/OrdersHistory.vue"),
    name: "private.history",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/order",
    component: () => import("../views/private/OrderStatus.vue"),
    name: "private.order",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/user",
    component: () => import("../views/private/PersonalData.vue"),
    name: "private.user",
    meta: {
      isPrivate: true
    },
  },
  {
    path: "/profile",
    component: () => import("../views/private/Profile.vue"),
    name: "private.profile",
    meta: {
      isPrivate: true,
      isAdmin: true,
    },
  },
  {
    path: "/components/buttons",
    component: () => import("../views/private/components/Buttons.vue"),
    name: "private.components/buttons",
    meta: {
      isPrivate: true,
      isAdmin: true,
    },
  },
];

const adminRoutes: RouteRecordRaw[] = AdminRoutes;

const routes: Array<RouteRecordRaw> = [
  ...publicRoutes,
  ...PrivateRoutes,
  ...AdminRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Due to the fact that this could be accessed
  // before the AuthPlugin gets completed, we await that this first gets initiated
  await AuthPlugin.isInitiated;
  /*const loggedIn = store.getters['auth/isLoggedIn'];
  
  const isPrivateRoute = to.matched.some((record) => record.meta.isPrivate);
  const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);
  const isGuestRoute = to.matched.some((record) => record.meta.guest);
  
  const userIsAdmin = store.getters['auth/isAdmin'];*/
  //const userIsPrivate = store.getters['auth/isNormal'];

  /*if ((isPrivateRoute || isAdminRoute) && !loggedIn) {
    return next({
      path: 'guest.home',
    });
  } else if (loggedIn) { // if user is logged in
    let newPage;
    
    // If guest route
    if (isGuestRoute) {
      newPage = 'private.home';
    } else if ((isAdminRoute && !isPrivateRoute) && !userIsAdmin) {
      newPage = 'private.home';
    } else if ((isPrivateRoute && !isAdminRoute) && userIsAdmin) {
      newPage = 'admin.home';
    }
    
    if (newPage) {
      return next({
        name: newPage,
      });
    }
  }*/

  next();
});

export default router;
