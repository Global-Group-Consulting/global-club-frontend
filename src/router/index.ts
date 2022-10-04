import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import { AuthPlugin } from '@/plugins/AuthPlugin'
import { store } from '@/store'
import AdminRoutes from './admin'
import PrivateRoutes from './private'
import PublicRoutes from './public'

const routes: Array<RouteRecordRaw> = [
  ...PublicRoutes,
  ...PrivateRoutes,
  ...AdminRoutes,
  { path: '/:catchAll(.*)', name: 'public.catchAll', component: import('@/views/shared/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  window.document.title = (to.meta.title ? to.meta.title + ' | ' : '') + 'Global Club'
  
  // Due to the fact that this could be accessed
  // before the AuthPlugin gets completed, we await that this first gets initiated
  await AuthPlugin.isInitiated
  const userIsAdmin = store.getters['auth/isAdmin']
  const loggedIn = store.getters['auth/isLoggedIn']
  
  const isPrivateRoute = to.matched.some((record) => record.meta.isPrivate)
  const isAdminRoute = to.matched.some((record) => record.meta.isAdmin)
  const isGuestRoute = to.matched.some((record) => record.meta.guest)
  
  //const userIsPrivate = store.getters['auth/isNormal'];
  
  if ((isPrivateRoute || isAdminRoute) && !loggedIn) {
    return next({
      name: 'public.home'
    })
  } else if (loggedIn) { // if user is logged in
    let newPage
    
    if (isGuestRoute) { // Public route
      newPage = 'private.home'
    } else if ((isAdminRoute && !isPrivateRoute) && !userIsAdmin) { // Private route
      newPage = 'private.home'
    } else if ((isPrivateRoute && !isAdminRoute) && userIsAdmin) { // Admin route
      newPage = 'admin.home'
    }
    
    if (newPage) {
      return next({
        name: newPage
      })
    }
  }
  
  next()
})

export default router
