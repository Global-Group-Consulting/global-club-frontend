import { formatBrites } from '@/@utilities/currency'
import { inject } from 'vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { Movement } from '@/@types/Movement'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { AlertInput } from '@ionic/vue'
import { useI18n } from 'vue-i18n'

export default () => {
  
  /*
  
  function askForWithdrawalTransfer () {
  
  }
  
  async function as () {
    
    const result = await alerts.ask({
        header: 'Quanto si desidera riscuotere?',
        message: `Indicare l'importo che si desidera riscuotere o trasferire ad un altro utente. L'importo massimo è di ${formatBrites(props.movement.incomeAmount)}.
                  <br>
                  Se si desidera trasferire tale importo ad un altro utente, compilare anche il campo "Codice utente destinatario", altrimenti lasciarlo vuoto.`,
        inputs: [
          {
            type: 'number',
            min: 0,
            name: 'amount',
            max: props.movement.withdrawalRemaining,
            label: 'Importo da riscuotere',
            placeholder: 'Importo da riscuotere',
            attributes: {
              step: '5'
            },
            value: Math.round(props.movement.withdrawalRemaining ?? 0)
          },
          {
            type: 'text',
            name: 'userCardNum',
            label: 'Codice utente destinatario',
            placeholder: 'Codice utente destinatario',
            value: '000XXX000',
            handler: (input) => {
              console.log(input)
            }
          }
        ]
      },
      {
        buttons: {
          confirm: (data, alert) => {
            const cardNum = data.userCardNum.trim()
            
            // only if the user provided a card number
            if (cardNum.length) {
              // Must check if the cardNum is valid
              http.api.users.checkClubCardNum(cardNum)
                .then(async user => {
                  
                  // ask if the user is sure to transfer the amount to the user
                  const confirm = await alerts.ask({
                    header: 'Eseguire un trasferimento?',
                    message: `Sei sicuro di voler trasferire <strong>${formatBrites(data.amount)}</strong> a <strong>${user?.firstName} ${user?.lastName}</strong>?
                                    Se non lo si desidera, premere "Annulla" e svuotare il campo "Codice utente destinatario".`,
                    buttonOkText: 'Si, Trasferisci'
                  })
                  
                  if (confirm.resp) {
                    alert.dismiss({
                      values: data
                    }, 'ok')
                  }
                })
                .catch(err => {
                  if (err.response && (err.response.status === 404 || err.response.status === 400)) {
                    alerts.error('Il codice utente inserito non è valido')
                  } else {
                    alerts.error(err)
                  }
                })
              
              // prevent the closing of the modal
              return false
            }
          }
        }
      })
    
    if (result.resp) {
      const value = result.values.amount
      
      if (value > props.movement.incomeAmount || value < 1) {
        await alerts.toastError('Importo non valido')
        return
      }
      
      const updatedMovement = await http.api.walletPremium.withdraw(props.movement._id, value)
      
      emit('withdrawal', updatedMovement)
    }
  }*/
}

export function useWithdrawal () {
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin
  const http = inject<HttpPlugin>('http') as HttpPlugin
  const { t } = useI18n()
  
  const alertInputs: Record<string, AlertInput> = {
    'amount': {
      type: 'number',
      min: 0,
      name: 'amount',
      label: 'Importo da riscuotere',
      placeholder: 'Importo da riscuotere',
      attributes: {
        step: '5'
      }
    },
    'clubCardNum': {
      type: 'text',
      name: 'userCardNum',
      label: 'Codice utente destinatario',
      placeholder: 'Codice utente destinatario',
      value: ''
    }
  }
  
  function confirmTransferToUser (amount, data, alert: HTMLIonAlertElement) {
    const cardNum = data.userCardNum.trim()
    
    if (data.amount !== undefined) {
      // Validate the amount
      if (data.amount > amount || data.amount < 1) {
        alerts.toastError('Importo non valido in quanto deve essere compreso tra 1 e ' + amount).then()
        return false
      }
    }
    
    // only if the user provided a card number
    if (cardNum.length) {
      // Must check if the cardNum is valid
      http.api.users.checkClubCardNum(cardNum)
        .then(async user => {
          
          // ask if the user is sure to transfer the amount to the user
          const confirm = await alerts.ask({
            header: 'Eseguire un trasferimento?',
            message: `Sei sicuro di voler trasferire <strong>${formatBrites(data.amount)}</strong> a <strong>${user?.firstName} ${user?.lastName}</strong>?
                                    Se non lo si desidera, premere "Annulla" e svuotare il campo "Codice utente destinatario".`,
            buttonOkText: 'Si, Trasferisci'
          })
          
          if (confirm.resp) {
            alert.dismiss({
              values: data
            }, 'ok').then()
          }
        })
        .catch(err => {
          if (err.response && (err.response.status === 404 || err.response.status === 400)) {
            alerts.toastError('Il codice utente inserito non è valido').then()
          } else {
            alerts.error(err).then()
          }
        })
      
      // prevent the closing of the modal
      return false
    }
  }
  
  async function askForWithdraw (amount: number) {
    return alerts.ask({
        header: t('alerts.wpMovements.withdraw.title'),
        message: t('alerts.wpMovements.withdraw.message', { amount: formatBrites(amount) }),
        inputs: [Object.assign({
          max: amount,
          value: Math.round(amount ?? 0)
        }, alertInputs.amount), alertInputs.clubCardNum]
      },
      {
        buttons: {
          confirm: (...args) => confirmTransferToUser(amount, ...args)
        }
      })
  }
  
  async function askForWithdrawAll (amount: number) {
    return alerts.ask({
        header: t('alerts.wpMovements.withdrawAll.title'),
        message: t('alerts.wpMovements.withdrawAll.message', { amount: formatBrites(amount) }),
        inputs: [alertInputs.clubCardNum]
      },
      {
        buttons: {
          confirm: (...args) => confirmTransferToUser(amount, ...args)
        }
      })
  }
  
  async function onWithdrawAllClick (amount: number, semesters: string[]) {
    const answer = await askForWithdrawAll(amount)
    
    if (!semesters.length) {
      return
    }
    
    if (answer.resp) {
      const updatedMovement = await http.api.walletPremium.withdrawBySemester(amount, semesters)
    }
  }
  
  async function onWithdrawClick (semester: string, amount: number) {
    const answer = await askForWithdraw(amount)
    
    if (answer.resp) {
      const value = answer.values.amount
      
      const updatedMovement = await http.api.walletPremium.withdrawBySemester(value, semester)
      
    }
  }
  
  return {
    onWithdrawAllClick,
    onWithdrawClick
  }
}
