import products from '@/router/admin/products';
import productCategories from '@/router/admin/productCategories';
import users from '@/router/admin/users';
import orders from '@/router/admin/orders';

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
  ...orders
]
