export default [
  
  {
    path: '/admin/productCategories',
    component: () => import('@/views/admin/productCategories/ProductCategoriesPage.vue'),
    meta: {
      isAdmin: true
    },
    children: [
      {
        path: '',
        component: () => import('@/views/admin/productCategories/childrens/Home.vue'),
        name: 'admin.productCategories',
      },
      {
        path: ':id',
        component: () => import('@/views/admin/productCategories/childrens/Details.vue'),
        name: 'admin.productCategories.details'
      },
      {
        path: 'new',
        component: () => import('@/views/admin/productCategories/childrens/Details.vue'),
        name: 'admin.productCategories.new'
      },
    ]
  },
];
