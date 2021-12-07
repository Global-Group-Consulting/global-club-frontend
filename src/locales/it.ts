import { alerts } from '@/locales/it/alerts';
import { forms } from '@/locales/it/forms';
import { enums } from '@/locales/it/enums';
import { orders } from '@/locales/it/pages/orders';
import { orderDetails } from '@/locales/it/pages/orderDetails';
import { ordersSection } from '@/locales/it/sections/orders';
import { users } from '@/locales/it/pages/users';
import { userProfile } from '@/locales/it/pages/userProfile';

export default {
  alerts,
  forms,
  enums,
  hi: 'Ciao come va?',
  mainMenu: {
    home: 'Home',
    users: 'Utenti',
    orders: 'Ordini',
    products: 'Prodotti',
    productCategories: 'Categorie Prodotti',
    logout: 'Logout',
    userCart: 'Carrello',
    userFavourites: 'Prodotti preferiti',
    userOrders: 'I miei ordini',
    userPortfolio: "Il mio portfolio",
    userProfile: "Il mio profilo"
  
  },
  pages: {
    users,
    userProfile,
    orders,
    orderDetails,
    products: {
      'title': "Elenco prodotti",
      'btn_add': 'Aggiungi',
      'btn_open': 'Apri',
    },
    productDetails: {
      'title': "Dettagli prodotto",
      'btn_delete': "Elimina",
    },
    productCategories: {
      'title': "Elenco categorie prodotti",
      'btn_add': 'Aggiungi',
      'btn_open': 'Apri',
    },
    productCategoryDetails: {
      'title': "Dettagli categoria prodotto",
      'btn_delete': "Elimina",
    },
  },
  sections: {
    orders: ordersSection
  },
};
