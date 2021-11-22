export default [
  {
    path: "/admin/users",
    component: () => import("@/views/admin/users/Home.vue"),
    name: "admin.users",
    meta: {
      isAdmin: true,
    },
  }
]
