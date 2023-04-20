import products from '@/router/admin/products';
import productCategories from '@/router/admin/productCategories';
import users from '@/router/admin/users';
import orders from '@/router/admin/orders';
import { RouteRecordRaw } from 'vue-router';

export default [{
  path: "/admin",
  component: () => import("@/views/admin/DashboardPage.vue"),
  name: "admin.home",
  meta: {
    isAdmin: true,
  },
},
  ...products,
  ...productCategories,
  ...users,
  ...orders,
  {
    path: "/admin/news",
    component: () => import("@/views/admin/News.vue"),
    name: "admin.news.index",
    meta: {
      isAdmin: true,
      title: "News ed Eventi"
    },
  },
  {
    path: "/admin/events/:id",
    component: () => import("@/views/admin/events/Show.vue"),
    name: "admin.events.show",
    meta: {
      isAdmin: true,
      title: "Dettagli evento"
    },
  }
] as RouteRecordRaw[]
