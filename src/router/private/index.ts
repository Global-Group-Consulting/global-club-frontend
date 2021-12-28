import { RouteRecordRaw } from 'vue-router';
import products from '@/router/private/products';

export default [
  {
    path: "/dashboard",
    component: () => import("@/views/private/dashboard/Index.vue"),
    name: "private.home",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/walletpremium",
    component: () => import("@/views/private/PremiumWallet.vue"),
    name: "private.wallet",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/cart",
    component: () => import("@/views/private/ShoppingCart.vue"),
    name: "private.cart",
    meta: {
      isPrivate: true,
    },
  },
  
  {
    path: "/help",
    component: () => import("@/views/private/chatHelp/Index.vue"),
    name: "private.help",
    meta: {
      isPrivate: true,
    },
  },

  {
    path: "/wallet",
    component: () => import("@/views/private/WalletStatement.vue"),
    name: "private.WalletStatement",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/search",
    component: () => import("@/views/private/searchPage/Index.vue"),
    name: "private.search",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/history",
    component: () => import("@/views/private/ordersHistory/Index.vue"),
    name: "private.history",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/order",
    component: () => import("@/views/private/orderStatus/Index.vue"),
    name: "private.order",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/user",
    component: () => import("@/views/private/personalData/Index.vue"),
    name: "private.user",
    meta: {
      isPrivate: true
    },
  },
  {
    path: "/profile",
    component: () => import("@/views/private/Profile.vue"),
    name: "private.profile",
    meta: {
      isPrivate: true,
      isAdmin: true,
    },
  },
  {
    path: "/components/buttons",
    component: () => import("@/views/private/components/Buttons.vue"),
    name: "private.components/buttons",
    meta: {
      isPrivate: true,
      isAdmin: true,
    },
  },
  ...products
] as RouteRecordRaw[]
