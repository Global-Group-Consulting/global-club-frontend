const prefix = "/admin/orders";

export default [
  {
    path: prefix,
    component: () => import("@/views/admin/orders/Home.vue"),
    name: "admin.orders",
    meta: {
      isAdmin: true,
    },
  },
  {
    path: prefix + "/:id",
    component: () => import("@/views/admin/orders/Details.vue"),
    name: "admin.orders.details",
    meta: {
      isAdmin: true,
    },
  },
]
