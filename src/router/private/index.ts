import { RouteRecordRaw } from 'vue-router';
import products from '@/router/private/products';

export default [
  {
    path: "/dashboard",
    component: () => import("@/views/private/dashboard/Index.vue"),
    name: "private.home",
    meta: {
      isPrivate: true
    },
  },
  {
    path: "/wallet",
    component: () => import("@/views/private/Wallet.vue"),
    name: "private.wallet",
    meta: {
      isPrivate: true,
      title: "Wallet"
    },
  },
  {
    path: "/walletPremium",
    component: () => import("@/views/private/WalletPremium.vue"),
    name: "private.walletPremium",
    meta: {
      isPrivate: true,
      title: "Wallet Premium"
    },
  },
  {
    path: "/cart",
    component: () => import("@/views/private/Cart.vue"),
    name: "private.cart",
    meta: {
      isPrivate: true,
      title: "Carrello"
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
    path: "/search",
    component: () => import("@/views/private/searchPage/Index.vue"),
    name: "private.search",
    meta: {
      isPrivate: true,
    },
  },
  {
    path: "/orders",
    component: () => import("@/views/private/orders/Home.vue"),
    name: "private.orders.home",
    meta: {
      isPrivate: true,
      title: "Ordini"
    },
  },
  {
    path: "/order/:id",
    component: () => import("@/views/private/orders/Details.vue"),
    name: "private.orders.details",
    meta: {
      isPrivate: true,
      title: "Dettagli Ordine"
    },
  },
  {
    path: "/user",
    component: () => import("@/views/private/personalData/Index.vue"),
    name: "private.user",
    meta: {
      isPrivate: true,
      isAdmin: true,
      title: "Il mio account"
    },
  },
  {
    path: "/profile",
    component: () => import("@/views/private/Profile.vue"),
    name: "private.profile",
    meta: {
      isPrivate: true,
      isAdmin: true,
      title: "Il mio profilo"
    },
  },
  {
    path: "/news",
    component: () => import("@/views/private/News.vue"),
    name: "news.index",
    meta: {
      isPrivate: true,
      isAdmin: true,
      title: "News ed Eventi"
    },
  },
  /* {
     path: "/components/buttons",
     component: () => import("@/views/private/components/Buttons.vue"),
     name: "private.components/buttons",
     meta: {
       isPrivate: true,
       isAdmin: true,
     },
   },*/
  ...products
] as RouteRecordRaw[]
