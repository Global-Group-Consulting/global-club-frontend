export default [
  {
    path: "/admin/orders",
    component: () => import("@/views/admin/orders/Home.vue"),
    name: "admin.orders",
    meta: {
      isAdmin: true,
    },
  },
]
