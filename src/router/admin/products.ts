const prefix = "/admin/products";
const meta = {
  isAdmin: true
}

export default [
  {
    path: prefix,
    component: () => import('@/views/admin/products/Home.vue'),
    name: 'admin.products',
    meta: {
      ...meta,
      title: "Prodotti"
    }
  },
  {
    path: prefix + '/:id',
    component: () => import('@/views/admin/products/Details.vue'),
    name: 'admin.products.details',
    meta: {
      ...meta,
      title: "Dettagli prodotto"
    }
  },
  {
    path: prefix + '/new',
    component: () => import('@/views/admin/products/Details.vue'),
    name: 'admin.products.new',
    meta: {
      ...meta,
      title: "Nuovo prodotto"
    }
  },
];
