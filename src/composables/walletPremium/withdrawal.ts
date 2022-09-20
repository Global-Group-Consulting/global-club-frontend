import { formatBrites } from '@/@utilities/currency'
import { inject } from 'vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { Movement } from '@/@types/Movement'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { AlertInput } from '@ionic/vue'
import { useI18n } from 'vue-i18n'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

// Create the eventTarget as a Singleton
const events = new EventTarget()

export function useWithdrawal () {
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin
  const http = inject<HttpPlugin>('http') as HttpPlugin
  const store = useStore(storeKey)
  const { t } = useI18n()
  
  /**
   * list of available alert inputs
   */
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
  
  /**
   * When trying to transfer money to another user, this function will be called and will check if
   * the provided clubCardNum is valid (after making an api call) and will ask the user to confirm the transfer
   *
   * @param {number} amount
   * @param {any} data
   * @param {HTMLIonAlertElement>} alert
   */
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
      if (cardNum === store.getters['auth/user'].clubCardNumber) {
        alerts.toastError('E\' necessario indicare un codice utente diverso dal proprio').then()
        return false
      }
      
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
  
  /**
   * Ask the user to confirm the withdrawal
   *
   * @param {number} amount
   */
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
  
  /**
   * Ask the user to confirm the withdrawal All
   * @param amount
   */
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
  
  /**
   * When the user click on the withdrawalAll button, this function will ask the user to confirm the withdrawal and
   * based on its response, it will make an api call to the server
   *
   * @param {number} amount
   * @param {string[]} semesters
   * @return Promise<WalletPremiumMovement[] | void>
   */
  async function onWithdrawAllClick (amount: number, semesters: string[]): Promise<WalletPremiumMovement[] | void> {
    if (!store.getters['auth/hasPackPremium']) {
      await alerts.updateToPremium()
      
      return
    }
    
    const answer = await askForWithdrawAll(amount)
    
    if (!semesters.length) {
      return
    }
    
    if (answer.resp) {
      const updatedMovements = await http.api.walletPremium.withdrawBySemester(amount, semesters, answer.values.userCardNum)
      
      // dispatch the event
      events.dispatchEvent(new CustomEvent('withdrawn:all', {
        detail: updatedMovements
      }))
      
      return updatedMovements
    }
  }
  
  /**
   * When the user click on the withdrawalAll button, this function will ask the user to confirm the withdrawal and
   * based on its response, it will make an api call to the server
   *
   * @param {string} semester
   * @param {number} amount
   * @return Promise<WalletPremiumMovement[] | void>
   */
  async function onWithdrawClick (semester: string, amount: number): Promise<WalletPremiumMovement[] | void> {
    if (!store.getters['auth/hasPackPremium']) {
      await alerts.updateToPremium()
      
      return
    }
    
    const answer = await askForWithdraw(amount)
    
    if (answer.resp) {
      const value = answer.values.amount
      
      const updatedMovements = await http.api.walletPremium.withdrawBySemester(value, [semester], answer.values.userCardNum)
      
      // dispatch the event
      events.dispatchEvent(new CustomEvent('withdrawn:semester', {
        detail: updatedMovements
      }))
      
      return updatedMovements
    }
  }
  
  /**
   * Allow for adding an event listener to the 'withdrawn:semester' event
   *
   * @param callback
   */
  function afterWithdraw (callback: (updatedMovements: WalletPremiumMovement[]) => any) {
    events.addEventListener('withdrawn:semester', (e) => callback((e as CustomEvent).detail))
  }
  
  /**
   * Allow for adding an event listener to the 'withdrawn:all' event
   *
   * @param callback
   */
  function afterWithdrawAll (callback: (updatedMovements: WalletPremiumMovement[]) => any) {
    events.addEventListener('withdrawn:all', (e) => callback((e as CustomEvent).detail))
  }
  
  return {
    onWithdrawAllClick,
    onWithdrawClick,
    afterWithdraw,
    afterWithdrawAll
  }
}
