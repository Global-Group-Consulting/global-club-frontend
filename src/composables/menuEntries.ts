import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum'
import { User } from '@/@types/User'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { useRouter } from 'vue-router'
import { computed, ComputedRef, inject } from 'vue'
import { popoverController } from '@ionic/vue'
import { formatUserName } from '@/@utilities/fields'
import { useI18n } from 'vue-i18n'
import MenuDropdownPopover from '@/components/popovers/MenuDropdownPopover.vue'
import { AuthPlugin } from '@/plugins/AuthPlugin'
import { AlertsPlugin } from '@/plugins/Alerts'

export interface MenuEntry {
  route?: string;
  externalLink?: boolean;
  click?: (this: MenuEntry & { auth: AuthPlugin; logout () }, event?: Event, authUser?: User) => void | Promise<void>;
  
  label: string | ((data?: any) => string);
  divider?: boolean;
  icon?: string;
  id?: string;
  color?: string;
  permissions?: AclPermissionsEnum[];
  inMobileTab?: boolean;
  inFooter?: boolean;
  isMainBtn?: boolean;
  onlyMobile?: boolean;
  onlyDesktop?: boolean;
  children?: MenuEntry[];
  badge?: ComputedRef<string>;
  disabled?: boolean;
  slot?: string;
  if?: boolean;
  value?: boolean;
}

const externalLinks: MenuEntry[] = [{
  route: 'https://globalgroup.consulting/club/video',
  label: 'external.video',
  icon: 'link',
  externalLink: true
},
  {
    route: 'https://globalgroup.consulting/club/menu',
    label: 'external.menu',
    icon: 'link',
    externalLink: true
  }]

const genericFooterEntries: MenuEntry[] = [
  {
    label: (userAuth: User) => formatUserName(userAuth),
    icon: 'settings',
    inFooter: true,
    async click (event) {
      const popover = await popoverController
        .create({
          component: MenuDropdownPopover,
          componentProps: {
            data: this.children
          },
          cssClass: 'dropdown-popover',
          event: event,
          translucent: true
        })
      await popover.present()
    },
    children: [
      {
        label: 'userProfile',
        icon: 'user',
        route: 'private.profile'
      },
      {
        label: 'logout',
        icon: 'logout',
        click () {
          this.logout()
        }
      }
    ]
  }
]

const mobileMenuEntries: Record<'admin' | 'private', MenuEntry[]> = {
  admin: [
    {
      route: 'admin.home',
      label: 'homeMobile',
      icon: 'home'
    },
    {
      route: 'admin.users',
      label: 'usersMobile',
      icon: 'user-3',
      permissions: [AclPermissionsEnum.CLUB_USERS_ALL_READ]
    },
    {
      route: 'admin.products',
      label: 'productsMobile',
      icon: 'ticket',
      permissions: [AclPermissionsEnum.CLUB_PRODUCTS_ALL_READ]
    },
    {
      label: 'more',
      icon: 'menu-h',
      async click (ev?: Event) {
        if (!ev) {
          return
        }
        
        const popover = await popoverController.create({
          component: MenuDropdownPopover,
          cssClass: 'custom-popover',
          componentProps: {
            data: this.children
            // title: userAuth ? formatUserName(userAuth) : null
          },
          event: ev,
          translucent: true
        })
        
        if (popover.componentProps) {
          popover.componentProps.popover = popover
        }
        
        await popover.present()
      },
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
      }),
      children: [
        {
          route: 'admin.orders',
          label: 'orders',
          icon: 'ticket',
          permissions: [AclPermissionsEnum.CLUB_ORDERS_ALL_READ]
        },
        {
          route: 'admin.productCategories',
          label: 'productCategories',
          icon: 'folder',
          permissions: [AclPermissionsEnum.CLUB_PRODUCTS_CAT_ALL_READ]
        },
        {
          route: 'news.index',
          label: 'news',
          icon: 'calendar',
          permissions: [AclPermissionsEnum.CLUB_NEWS_ALL_READ]
        },
        {
          route: 'notifications.index',
          label: 'notifications',
          icon: 'notification',
          badge: computed(() => {
            const store = useStore(storeKey)
            return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
          })
        },
        {
          route: '',
          label: '',
          divider: true
        },
        ...externalLinks,
        {
          route: '',
          label: '',
          divider: true
        },
        {
          label: (userAuth) => formatUserName(userAuth),
          icon: 'user',
          route: 'private.profile',
          onlyMobile: true
        },
        {
          label: 'logout',
          icon: 'logout',
          onlyMobile: true,
          click () {
            this.logout()
          }
        }
      ]
    }
  ],
  private: [
    {
      route: 'private.home',
      label: 'homeMobile',
      icon: 'home'
    },
    {
      route: 'private.products.favourites',
      label: 'userFavouritesMobile',
      icon: 'star'
    },
    {
      route: 'private.cart',
      label: 'userCartMobile',
      icon: 'cart',
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['cart/totalProducts'] > 0 ? store.getters['cart/totalProducts'] : null
      })
    },
    {
      label: 'more',
      icon: 'menu-h',
      async click (ev?: Event) {
        if (!ev) {
          return
        }
        
        const popover = await popoverController.create({
          component: MenuDropdownPopover,
          cssClass: 'custom-popover',
          componentProps: {
            data: this.children
            // title: userAuth ? formatUserName(userAuth) : null
          },
          event: ev,
          translucent: true
        })
        
        if (popover.componentProps) {
          popover.componentProps.popover = popover
        }
        
        await popover.present()
      },
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
      }),
      children: [
        {
          route: 'private.orders.home',
          label: 'userOrders',
          icon: 'ticket'
        },
        {
          route: '',
          label: '',
          divider: true
        },
        {
          route: 'news.index',
          label: 'news',
          icon: 'calendar',
          permissions: [AclPermissionsEnum.CLUB_NEWS_ALL_READ]
        },
        {
          route: 'notifications.index',
          label: 'notifications',
          icon: 'notification',
          badge: computed(() => {
            const store = useStore(storeKey)
            return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
          })
        },
        {
          route: '',
          label: '',
          divider: true
        },
        ...externalLinks,
        {
          route: '',
          label: '',
          divider: true
        },
        {
          route: 'private.profile',
          label: 'userProfileMobile',
          icon: 'user'
        }
      ]
    }
  ]
}

const desktopMenuEntries: Record<'admin' | 'private', MenuEntry[]> = {
  admin: [
    {
      route: 'admin.home',
      label: 'home',
      icon: 'home'
    },
    {
      route: 'admin.orders',
      label: 'orders',
      icon: 'ticket',
      permissions: [AclPermissionsEnum.CLUB_ORDERS_ALL_READ]
    },
    {
      route: 'admin.users',
      label: 'users',
      icon: 'user-3',
      permissions: [AclPermissionsEnum.CLUB_USERS_ALL_READ]
    },
    {
      route: '',
      label: '',
      divider: true
    },
    {
      route: 'admin.products',
      label: 'products',
      icon: 'ticket',
      permissions: [AclPermissionsEnum.CLUB_PRODUCTS_ALL_READ]
    },
    {
      route: 'admin.productCategories',
      label: 'productCategories',
      icon: 'folder',
      permissions: [AclPermissionsEnum.CLUB_PRODUCTS_CAT_ALL_READ]
    },
    {
      route: '',
      label: '',
      divider: true
    },
    {
      route: 'news.index',
      label: 'news',
      icon: 'calendar',
      permissions: [AclPermissionsEnum.CLUB_NEWS_ALL_READ]
    }, {
      route: 'notifications.index',
      label: 'notifications',
      icon: 'notification',
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
      })
    },
    {
      route: '',
      label: '',
      divider: true
    },
    ...externalLinks,
    ...genericFooterEntries
  ],
  private: [
    {
      route: 'private.home',
      label: 'home',
      icon: 'home'
    },
    {
      route: 'private.products.favourites',
      label: 'userFavourites',
      icon: 'star'
    },
    {
      route: 'private.products',
      label: 'products',
      icon: 'star'
    },
    {
      route: 'private.cart',
      label: 'userCart',
      icon: 'cart',
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['cart/totalProducts'] > 0 ? store.getters['cart/totalProducts'] : null
      })
    },
    {
      route: '',
      label: '',
      divider: true
    },
    {
      route: 'private.profile',
      label: 'userProfile',
      icon: 'user'
    },
    {
      route: 'private.orders.home',
      label: 'userOrders',
      icon: 'ticket'
    },
    {
      route: 'private.wallet',
      label: 'userPortfolio',
      icon: 'wallet'
    },
    /*{
      route: 'private.walletPremium',
      label: 'userPortfolioPremium',
      icon: 'wallet',
    },*/
    {
      route: 'private.walletFast',
      label: 'userPortfolioFast',
      icon: 'wallet'
    },
    {
      route: '',
      label: '',
      divider: true
    },
    {
      route: 'news.index',
      label: 'news',
      icon: 'calendar',
      permissions: [AclPermissionsEnum.CLUB_NEWS_ALL_READ]
    },
    {
      route: 'notifications.index',
      label: 'notifications',
      icon: 'notification',
      badge: computed(() => {
        const store = useStore(storeKey)
        return store.getters['notifications/unread'] > 0 ? store.getters['notifications/unread'] : null
      })
    },
    {
      route: '',
      label: '',
      divider: true
    },
    ...externalLinks,
    ...genericFooterEntries
  ]
}

export default () => {
  const router = useRouter()
  const { t } = useI18n()
  const auth = inject('auth') as AuthPlugin
  const alerts = inject('alerts') as AlertsPlugin
  const store = useStore(storeKey)
  const userAuth: ComputedRef<User> = computed(() => store.getters['auth/user'])
  const userIsAdmin: ComputedRef<boolean> = computed(() => store.getters['auth/isAdmin'])
  const userPermissions: ComputedRef<AclPermissionsEnum[]> = computed(() => store.getters['auth/permissions'])
  
  function prepareForReturn (data: MenuEntry[]): MenuEntry[] {
    const toReturn = data.filter(entry => {
        const requestedPermissions = entry.permissions
        
        if (!requestedPermissions) {
          return true
        }
        
        // For each requested permission, check if the user has that permission
        return requestedPermissions?.every(el => {
          // club.users.all:read
          const permRoot = el.split(':')[0]
          const permAction = el.split(':')[1]
          
          return userPermissions.value.some(userPerm => {
            const userPermRoot = userPerm.split(':')[0]
            const userPermAction = userPerm.split(':')[1]
            
            return permRoot === userPermRoot && (permAction === userPermAction || userPermAction === '*')
          })
        })
      }
    )
    
    return [...toReturn].map(el => {
      let label = el.label
      let children = el.children
      
      if (typeof label === 'function') {
        label = label(userAuth.value)
      } else if (label) {
        label = t('mainMenu.' + label)
      }
      
      if (children) {
        children = prepareForReturn(children)
      }
      
      return {
        ...el,
        label,
        children
      }
    })
  }
  
  const desktopEntries: ComputedRef<MenuEntry[]> = computed(() => {
    const data: MenuEntry[] = userIsAdmin.value ? desktopMenuEntries.admin : desktopMenuEntries.private
    
    return prepareForReturn(data.filter(el => !el.inFooter))
  })
  
  const mobileEntries: ComputedRef<MenuEntry[]> = computed(() => {
    const data: MenuEntry[] = [...(userIsAdmin.value ? mobileMenuEntries.admin : mobileMenuEntries.private)]
    
    data.splice(Math.ceil(data.length / 2), 0, {
      label: '',
      isMainBtn: true
    })
    
    return prepareForReturn(data)
  })
  
  const desktopFooterEntries: ComputedRef<MenuEntry[]> = computed(() => {
    const data: MenuEntry[] = userIsAdmin.value ? desktopMenuEntries.admin : desktopMenuEntries.private
    
    return prepareForReturn(data.filter(el => el.inFooter))
  })
  
  async function logout () {
    const result = await alerts.ask({
      header: 'Effettuare il logout?',
      message: 'Siete sicuri di voler uscire dall\'applicazione?',
      buttonOkText: 'Si, esci',
      buttonCancelText: 'No, rimani'
    })
    
    if (result.resp) {
      await auth.logout()
    }
  }
  
  async function onItemClick (entry: MenuEntry, event?: Event) {
    if (entry.click) {
      entry.click.call({ ...entry, auth, logout }, event, userAuth.value)
    } else {
      await router.push({ name: entry.route })
    }
    
    if (await popoverController.getTop()) {
      await popoverController.dismiss()
    }
  }
  
  return {
    desktopEntries,
    desktopFooterEntries,
    mobileEntries,
    onItemClick, logout
  }
};
