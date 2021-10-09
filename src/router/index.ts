import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import { AuthPlugin } from '@/plugins/AuthPlugin';
import { store } from '@/store';

const publicRoutes = [
  {
    path: '/',
    component: import('../views/public/WelcomePage.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/login',
    component: () => import('../views/public/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/reset',
    component: import('../views/public/ForgetPassword.vue'),
    meta: {
      guest: true
    }
  },
];
const privateRoutes = [
  {
    path: '/dashboard',
    component: () => import('../views/private/Dashboard.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    component: () => import('../views/private/User.vue'),
    meta: {
      requiresAuth: true
    }
  },
];

const routes: Array<RouteRecordRaw> = [
  ...publicRoutes,
  ...privateRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  // Due to the fact that this could be accessed
  // before the AuthPlugin gets completed, we await that this first gets initiated
  await AuthPlugin.isInitiated;
  const loggedIn = store.getters['auth/isLoggedIn'];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const guest = to.matched.some(record => record.meta.guest);
  
  if (requiresAuth && !loggedIn) {
    return next({
      path: '/'
    });
  } else if (guest && loggedIn) {
    return next({
      path: '/dashboard'
    });
  }
  
  next();
  
  /*if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin == 1) {
          next()
        } else {
          next({ name: 'userboard' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'userboard' })
    }
  } else {
    next()
  }*/
});

export default router;
