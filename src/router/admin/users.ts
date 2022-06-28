const prefix = '/admin/users'
const meta = {
  isAdmin: true
}

export default [
  {
    path: prefix,
    component: () => import('@/views/admin/users/Home.vue'),
    name: 'admin.users',
    meta: {
      ...meta,
      title: 'Utenti'
    }
  },
  {
    path: prefix + '/profile/:id',
    component: () => import('@/views/admin/users/Profile.vue'),
    name: 'admin.users.profile',
    meta: {
      ...meta,
      title: 'Profilo utente'
    }
  },
  {
    path: prefix + '/wallet_fast/:id',
    component: () => import('@/views/private/WalletFast.vue'),
    name: 'admin.users.wallet_fast',
    meta: {
      ...meta,
      title: 'Wallet fast'
    }
  },
  {
    path: prefix + '/:id',
    component: () => import('@/views/admin/users/Details.vue'),
    name: 'admin.users.details',
    meta: {
      ...meta,
      title: 'Dettagli utente'
    }
  }

]
