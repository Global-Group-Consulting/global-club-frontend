const prefix = "/admin/users";
const meta = {
  isAdmin: true
}

export default [
  {
    path: prefix,
    component: () => import("@/views/admin/users/Home.vue"),
    name: "admin.users",
    meta: {
      isAdmin: true,
    },
  },
  {
    path: prefix + '/profile/:id',
    component: () => import('@/views/admin/users/Profile.vue'),
    name: 'admin.users.profile',
    meta
  },
  {
    path: prefix + '/:id',
    component: () => import('@/views/admin/users/Details.vue'),
    name: 'admin.users.details',
    meta
  },
]
