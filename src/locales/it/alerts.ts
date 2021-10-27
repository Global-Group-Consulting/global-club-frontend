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
    }
  },
  filesUploader: {
    maxFiles: {
      title: "Limite file raggiunto",
      message: "Non è possibile aggiungere ulteriori file in quanto il limite è di {maxFiles}. Rimuovere uno dei file esistenti e riprovare"
    }
  }
};
