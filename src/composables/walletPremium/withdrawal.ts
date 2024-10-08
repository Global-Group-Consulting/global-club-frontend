import { formatBrites } from '@/@utilities/currency'
import { inject, nextTick, ref } from 'vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { AlertInput, modalController, popoverController } from '@ionic/vue'
import { useI18n } from 'vue-i18n'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import WPWithdrawModal from '@/components/modals/WPWithdrawModal.vue'
import { User } from '@/@types/User'

// Create the eventTarget as a Singleton
const events = new EventTarget()

export function useWithdrawal () {
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin
  const http = inject<HttpPlugin>('http') as HttpPlugin
  const store = useStore(storeKey)
  const { t } = useI18n()
  const userId = ref('')
  
  const setUserId = (_userId: string) => userId.value = _userId
  
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
      label: 'Numero tessera destinatario',
      placeholder: 'Numero tessera destinatario',
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
  function confirmTransferToUser (amount: number, data: any, alert: HTMLIonAlertElement) {
    const cardNum = data.userCardNum.trim()
    
    if (data.amount !== undefined) {
      // Validate the amount
      if (data.amount > amount || data.amount < 1) {
        alerts.toastError('Importo non valido in quanto deve essere compreso tra 1 e ' + amount).then()
        return false
      }
    } else {
      data.amount = amount
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
                                    Se non lo si desidera, premere "Annulla" e svuotare il campo "Numero tessera destinatario".`,
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
   * When trying to transfer money to another user, this function will be called and will check if
   * the provided clubCardNum is valid (after making an api call) and will ask the user to confirm the transfer
   *
   * @param {number} amount
   * @param {any} data
   * @param {HTMLIonAlertElement>} [alert]
   */
  async function confirmTransferIntention (amount: number, data: any) {
    const cardNum = data.userCardNum.trim()
    
    if (data.amount !== undefined) {
      // Validate the amount
      if (data.amount > amount || data.amount < 1) {
        alerts.toastError('Importo non valido in quanto deve essere compreso tra 1 e ' + amount).then()
        return false
      }
    } else {
      data.amount = amount
    }
    
    // only if the user provided a card number
    if (cardNum.length) {
      if (cardNum === store.getters['auth/user'].clubCardNumber) {
        alerts.toastError('E\' necessario indicare un codice utente diverso dal proprio').then()
        return false
      }
      
      try {
        console.log('trying to check the card number')
        
        // Must check if the cardNum is valid
        const user = await http.api.users.checkClubCardNum(cardNum)
        
        // ask if the user is sure to transfer the amount to the user
        const confirm = await alerts.ask({
          header: 'Eseguire un trasferimento?',
          message: `Sei sicuro di voler trasferire <strong>${formatBrites(data.amount)}</strong> a <strong>${user?.firstName} ${user?.lastName}</strong>?
                                    Se non lo si desidera, premere "Annulla" e svuotare il campo "Numero tessera destinatario".`,
          buttonOkText: 'Si, Trasferisci'
        })
        
        if (confirm.resp) {
          return true
        }
        
      } catch (err: any) {
        console.log('got an error', err)
        
        if (err.response && (err.response.status === 404 || err.response.status === 400)) {
          alerts.toastError('Il codice utente inserito non è valido').then()
        } else {
          alerts.error(err).then()
        }
      }
      
      return false
    } else {
      return true
    }
  }
  
  async function checkClubCardNum (cardNum: string) {
    if (cardNum === store.getters['auth/user'].clubCardNumber) {
      alerts.toastError('E\' necessario indicare un codice utente diverso dal proprio').then()
      return false
    }
    
    try {
      console.log('trying to check the card number')
      
      // Must check if the cardNum is valid
      return await http.api.users.checkClubCardNum(cardNum)
    } catch (err: any) {
      console.log('got an error', err)
      
      if (err.response && (err.response.status === 404 || err.response.status === 400)) {
        alerts.toastError('Il codice utente inserito non è valido').then()
      } else {
        alerts.error(err).then()
      }
    }
  }
  
  /**
   * Ask the user to confirm the withdrawal
   *
   * @param {number} amount
   */
  async function askForWithdraw (amount: number): Promise<{ resp: boolean; values: null | { amount: number; destinationUser: Partial<User> } }> {
    try {
      // First must close all popovers used by tooltips,
      // otherwise will throw an error when trying to open the alert
      await popoverController.dismiss()
    } catch (e) {
      //
    }
    
    const modal = await modalController.create({
      component: WPWithdrawModal,
      cssClass: 'modal-small',
      id: 'withdraw-modal',
      componentProps: {
        title: t('alerts.wpMovements.withdraw.title'),
        amount
      }
    })
    
    await modal.present()
    const res = await modal.onDidDismiss()
    
    if (res.role === 'ok') {
      return { resp: true, values: res.data }
    } else {
      return { resp: false, values: null }
    }
    
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
    if (!store.getters['auth/hasPackPremium'] && !store.getters['auth/isAdmin']) {
      await alerts.updateToPremium()
      
      return
    }
    
    const answer = await askForWithdrawAll(amount)
    
    if (!semesters.length) {
      return
    }
    
    if (answer.resp) {
      const updatedMovements = await http.api.walletPremium.withdrawBySemester(amount, semesters, answer.values.userCardNum, userId.value)
      
      alerts.toastSuccess(t('alerts.wpMovements.withdraw.success')).then()
      
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
   * @param {number} amount
   * @param {string} movementId
   * @return Promise<WalletPremiumMovement | void>
   */
  async function onWithdrawClick (amount: number, movementId: string): Promise<WalletPremiumMovement | void> {
    if (!store.getters['auth/hasPackPremium'] && !store.getters['auth/isAdmin']) {
      await alerts.updateToPremium()
      
      return
    }
    
    const answer = await askForWithdraw(amount)
    
    if (answer.resp) {
      return nextTick(async () => {
        
        const updatedMovements = await http.api.walletPremium.withdraw(movementId, amount, answer.values?.destinationUser?.clubCardNumber)
        
        alerts.toastSuccess(t('alerts.wpMovements.withdraw.success')).then()
        
        // dispatch the event
        events.dispatchEvent(new CustomEvent('withdrawn:semester', {
          detail: updatedMovements
        }))
        
        return updatedMovements
      })
      
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
    afterWithdrawAll,
    setUserId,
    checkClubCardNum
  }
}
