import { MenuEntry } from '@/components/MainMenu.vue';
import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum';
import { User } from '@/@types/User';
import { useStore } from 'vuex';
import { storeKey } from '@/store';

const adminEntries: MenuEntry[] = [
  {
    route: 'admin.home',
    label: 'home',
    icon: "home",
    showInMobile: true
  },
  {
    route: 'admin.orders',
    label: 'orders',
    icon: "ticket",
    permissions: [AclPermissionsEnum.CLUB_ORDERS_ALL_READ]
  },
  {
    route: 'admin.users',
    label: 'users',
    icon: "user-3",
    permissions: [AclPermissionsEnum.CLUB_USERS_ALL_READ],
    showInMobile: true
  },
  {
    route: '',
    label: '',
    divider: true
  },
  {
    route: 'admin.products',
    label: 'products',
    icon: "ticket",
    permissions: [AclPermissionsEnum.CLUB_PRODUCTS_ALL_READ],
    showInMobile: true
  },
  {
    route: 'admin.productCategories',
    label: 'productCategories',
    icon: "folder",
    permissions: [AclPermissionsEnum.CLUB_PRODUCTS_CAT_ALL_READ]
  }
]

const privateEntries: MenuEntry[] = [
  {
    route: 'private.home',
    label: 'home',
    icon: "home",
    showInMobile: true
  },
  {
    route: 'private.wish',
    label: 'userFavourites',
    icon: "star",
    showInMobile: true
  },
  {
    route: 'private.cart',
    label: 'userCart',
    icon: "cart",
    showInMobile: true
  },
  {
    route: '',
    label: '',
    divider: true
  },
  {
    route: 'private.user',
    label: 'userProfile',
    icon: "user",
    showInMobile: true
  },
  {
    route: 'private.orders',
    label: 'userOrders',
    icon: "ticket",
  },
  {
    route: 'private.wallet',
    label: 'userPortfolio',
    icon: "wallet",
  },
]

export function getUserMenuEntries (user: User): MenuEntry[] {
  if (!user) {
    return [];
  }
  const store = useStore(storeKey);
  const userIsAdmin: boolean = store.getters["auth/isAdmin"];
  const userPermissions: AclPermissionsEnum[] = store.getters["auth/permissions"];
  
  let toReturn: MenuEntry[]
  
  if (userIsAdmin) {
    toReturn = adminEntries;
  } else {
    toReturn = privateEntries
  }
  
  return toReturn.filter(entry => {
    const requestedPermissions = entry.permissions;
    
    if (!requestedPermissions) {
      return true;
    }
    
    // For each requested permission, check if the user has that permission
    return requestedPermissions?.every(el => {
      // club.users.all:read
      const permRoot = el.split(":")[0]
      const permAction = el.split(":")[1];
      
      return userPermissions.some(userPerm => {
        const userPermRoot = userPerm.split(":")[0];
        const userPermAction = userPerm.split(":")[1];
        
        return permRoot === userPermRoot && (permAction === userPermAction || userPermAction === "*");
      })
    })
  })
}
