import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import { store } from '@/store';
import AdminRoutes from "./admin";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

const routes: Array<RouteRecordRaw> = [
  ...PublicRoutes,
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
