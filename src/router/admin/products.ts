export default [
  
  {
    path: '/admin/products',
    component: () => import('@/views/admin/products/ProductsPage.vue'),
    meta: {
      isAdmin: true
    },
    children: [
      {
        path: '',
        component: () => import('@/views/admin/products/childrens/Home.vue'),
        name: 'admin.products',
      },
      {
        path: ':id',
        component: () => import('@/views/admin/products/childrens/Details.vue'),
        name: 'admin.products.details'
      },
      {
        path: 'new',
        component: () => import('@/views/admin/products/childrens/Details.vue'),
        name: 'admin.products.new'
      },
    ]
  },
];
