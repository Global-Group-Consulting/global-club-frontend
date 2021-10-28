const prefix = "/admin/productCategories"
const meta = {
  isAdmin: true
}

export default [
  {
    path: prefix,
    component: () => import('@/views/admin/productCategories/Home.vue'),
    name: 'admin.productCategories',
    meta
  },
  {
    path: prefix + '/:id',
    component: () => import('@/views/admin/productCategories/Details.vue'),
    name: 'admin.productCategories.details',
    meta
  },
  {
    path: prefix + '/new',
    component: () => import('@/views/admin/productCategories/Details.vue'),
    name: 'admin.productCategories.new',
    meta
  },
];
