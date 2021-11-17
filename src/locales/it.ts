import { alerts } from '@/locales/it/alerts';
import { forms } from '@/locales/it/forms';
import { enums } from '@/locales/it/enums';

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
  },
  pages: {
    orders: {
      'title': "Elenco ordini",
      'list': {
        text: "Ordine di <strong>{fullName}</strong> del {date}",
        subText: "Stato: <strong>{status}</strong> - <small>#{number}</small>",
        lastUpdate: "Ultimo aggiornamento: <strong>{date}</strong>"
      },
      'btn_open': 'Apri',
    },
    orderDetails: {
      title: "Dettagli ordine #{number}"
    },
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
    users: {
      'title': "Elenco utenti",
    }
  }
};
