export const alerts = {
  generic: {
    loading: "Operazione in corso...",
    error: {
      title:  "Oops!",
      message: "Sembra ci sia stato un errore, quindi l'operazione richiesta non è andata a buon fine.<br><br>{errorMessage}"
    }
  },
  productCategories: {
    deleteThumbnail: {
      title: 'Cancellare l\'immagine?',
      message: 'Continuando, l\'immagine <strong>{imageName}</strong> verrà cancellata in modo irreversibile.',
      buttonOk: 'Si, cancella',
      buttonCancel: 'Annulla'
    },
    deleteCategory: {
      title: 'Cancellare questa categoria?',
      message: 'Continuando, la categoria <strong>{categoryName}</strong> verrà cancellata in modo irreversibile.',
      buttonOk: 'Si, cancella',
      buttonCancel: 'Annulla'
    }
  },
  products: {
    deleteThumbnail: {
      title: 'Cancellare l\'immagine?',
      message: 'Continuando, l\'immagine <strong>"{imageName}"</strong> verrà cancellata in modo irreversibile.',
      buttonOk: 'Si, cancella',
      buttonCancel: 'Annulla'
    },
    deleteProduct: {
      title: 'Cancellare questo prodotto?',
      message: 'Continuando, il prodotto <strong>"{productName}"</strong> verrà cancellato in modo irreversibile.',
      buttonOk: 'Si, cancella',
      buttonCancel: 'Annulla'
    }
  },
  filesUploader: {
    maxFiles: {
      title: "Limite file raggiunto",
      message: "Non è possibile aggiungere ulteriori file in quanto il limite è di {maxFiles}. Rimuovere uno dei file esistenti e riprovare"
    }
  },
  movements: {
    deleteMovement: {
      title: 'Rimuovere questo movimento?',
      message: 'Siete sicuri di voler rimuovere il movimento di tipo <strong>{type}</strong> del valore di <strong style="color: {color}; white-space: nowrap">{amount}</strong>? L\'operazione sarà irreversibile e pertanto non sarà possibile ripristinarlo.',
      buttonOk: 'Si, rimuovi',
      buttonCancel: 'Annulla'
    }
  }
};
