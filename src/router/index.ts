import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { AuthPlugin } from '@/plugins/AuthPlugin';
import { store } from '@/store';
import products from '@/router/admin/products';

const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../views/public/WelcomePage.vue'),
    name: 'public.home',
    meta: {
      guest: true,
    },
  },
  {
    path: '/login',
    component: () => import('../views/public/Login.vue'),
    name: 'public.login',
    meta: {
      guest: true,
    },
  },
  {
    path: '/reset',
    component: () => import('../views/public/ForgetPassword.vue'),
    name: 'public.reset',
    meta: {
      guest: true,
    },
  },
];
const privateRoutes: RouteRecordRaw[] = [
  /* {
     path: "/",
     redirect: "/tabs/tab1",
   },*/
  /*{
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
  },*/
  {
    path: '/dashboard',
    component: () => import('../views/private/Dashboard.vue'),
    name: 'private.home',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/profile',
    component: () => import('../views/private/Profile.vue'),
    name: 'private.user',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/wallet',
    component: () => import('../views/private/PremiumWallet.vue'),
    name: 'private.wallet',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/cart',
    component: () => import('../views/private/ShoppingCart.vue'),
    name: 'private.cart',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/products',
    component: () => import('../views/private/ProductsList.vue'),
    name: 'private.products',
    meta: {
      isPrivate: true,
    },
  },
  
  {
    path: '/help',
    component: () => import('../views/private/ChatHelp.vue'),
    name: 'private.help',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/wish',
    component: () => import('../views/private/WishList.vue'),
    name: 'private.wish',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/wallet',
    component: () => import('../views/private/WalletStatement.vue'),
    name: 'private.wallet',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/search',
    component: () => import('../views/private/SearchPage.vue'),
    name: 'private.search',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/product',
    component: () => import('../views/private/ProductDetails.vue'),
    name: 'private.prduct',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/history',
    component: () => import('../views/private/OrdersHistory.vue'),
    name: 'private.history',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/order',
    component: () => import('../views/private/OrderStatus.vue'),
    name: 'private.order',
    meta: {
      isPrivate: true,
    },
  },
  {
    path: '/user',
    component: () => import('../views/private/PersonalData.vue'),
    name: 'private.user',
    meta: {
      isPrivate: true,
      isAdmin: true
    },
  },
];

const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: () => import('../views/admin/DashboardPage.vue'),
    name: 'admin.home',
    meta: {
      isAdmin: true
    }
  },
  ...products,
  {
    path: '/admin/orders',
    component: () => import('../views/admin/orders/OrdersPage.vue'),
    name: 'admin.orders',
    meta: {
      isAdmin: true
    }
  },
  {
    path: '/admin/users',
    component: () => import('../views/admin/users/UsersPage.vue'),
    name: 'admin.users',
    meta: {
      isAdmin: true
    }
  }
];

const routes: Array<RouteRecordRaw> = [...publicRoutes, ...privateRoutes, ...adminRoutes];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Due to the fact that this could be accessed
  // before the AuthPlugin gets completed, we await that this first gets initiated
  await AuthPlugin.isInitiated;
  const loggedIn = store.getters['auth/isLoggedIn'];
  
  const isPrivateRoute = to.matched.some((record) => record.meta.isPrivate);
  const isAdminRoute = to.matched.some((record) => record.meta.isAdmin);
  const isGuestRoute = to.matched.some((record) => record.meta.guest);
  
  const userIsAdmin = store.getters['auth/isAdmin'];
  //const userIsPrivate = store.getters['auth/isNormal'];
  
  /*if ((isPrivateRoute || isAdminRoute) && !loggedIn) {
    return next({
      path: 'public.home',
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
