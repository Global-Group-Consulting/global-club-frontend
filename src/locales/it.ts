import { alerts } from '@/locales/it/alerts'
import { forms } from '@/locales/it/forms'
import { enums } from '@/locales/it/enums'
import { orders } from '@/locales/it/pages/orders'
import { orderDetails } from '@/locales/it/pages/orderDetails'
import { ordersSection } from '@/locales/it/sections/orders'
import { users } from '@/locales/it/pages/users'
import { userProfile } from '@/locales/it/pages/userProfile'
import { mainMenu } from '@/locales/it/mainMenu'
import { validators } from '@/locales/it/validators'

export default {
  alerts,
  forms,
  enums,
  mainMenu,
  pages: {
    users,
    userProfile,
    orders,
    orderDetails,
    products: {
      'title': 'Elenco prodotti',
      'btn_add': 'Aggiungi',
      'btn_open': 'Apri'
    },
    productDetails: {
      'title': 'Dettagli prodotto',
      'btn_delete': 'Elimina'
    },
    productCategories: {
      'title': 'Categorie prodotti',
      'btn_add': 'Aggiungi',
      'btn_open': 'Apri'
    },
    productCategoryDetails: {
      'title': 'Dettagli categoria',
      'btn_delete': 'Elimina'
    }
  },
  sections: {
    orders: ordersSection
  },
  validations: validators
}
