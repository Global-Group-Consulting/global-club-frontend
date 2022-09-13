<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon">
      <Icon :name="icon" :color="textColor" size="large"></Icon>
    </ion-thumbnail>

    <ion-label :style="`color: ${textColor};`">
      <brite-value :value="movement.incomeAmount ?? movement.initialAmount" prefix="+"/>
      <small v-if="movement.movementType === WalletPremiumMovementEnum.MONTHLY_INCOME">
        (
        <brite-value :value="movement.withdrawalRemaining ?? 0"/>
        rimasti)
      </small>

      <template v-if="movement.withdrawableFrom">
        <div>{{ currDate }}</div>
        <small v-if="isWithdrawable && movement.withdrawableUntil">
          Sbloccabile entro il
          {{ formatLocaleDateLong(movement.withdrawableUntil) }}</small>
      </template>
    </ion-label>

    <ion-label slot="end">
      <ClubButton :only-icon="$store.getters['smAndDown']" v-if="isWithdrawable"
                  :icon="$store.getters['smAndDown']" icon-name="pick-brites"
                  version="link"
                  :size="$store.getters['smAndDown'] ? 'default': 'small'"
                  title="Riscuoti"
                  @click="onWithdrawalClick">
        Riscuoti
      </ClubButton>

      <ClubButton :only-icon="$store.getters['smAndDown']" v-if="hasWithdrawMovements"
                  :icon="$store.getters['smAndDown']" icon-name="info"
                  version="link"
                  :size="$store.getters['smAndDown'] ? 'default': 'small'"
                  title="Movimenti"
                  @click="showMovementsList">
        Movimenti
      </ClubButton>

    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, PropType, ref } from 'vue'

import { formatBrites, formatCurrency } from '@/@utilities/currency'
import { formatLocaleDate, formatLocaleDateLong } from '@/@utilities/dates'
import ClubButton from '@/components/ClubButton.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import BriteValue from '@/components/BriteValue.vue'
import { WalletPremiumMovementEnum } from '@/@enums/wallet.premium.movement.enum'
import { modalController } from '@ionic/vue'
import WPWithdrawMovementsModal from '../../modals/WPWithdrawMovementsModal.vue'

export default defineComponent({
  name: 'WalletPremiumMovementListItem',
  components: { ClubButton, BriteValue },
  props: {
    movement: {
      type: Object as PropType<WalletPremiumMovement>,
      required: true
    },
    showSemester: Boolean
  },
  setup (props, { emit }) {
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin

    // const mdAndDown = computed(() => store.getters['mdAndDown'])
    const isPastAndWithdrawn = computed(() => props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) < new Date()
        && props.movement.withdrawalDate)

    const isPastAndLost = computed(() => props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) < new Date()
        && !props.movement.withdrawalDate)

    const isWithdrawable = computed(() => props.movement.withdrawableFrom && props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) > new Date()
        && new Date(props.movement.withdrawableFrom) < new Date()
        && !props.movement.withdrawalDate)

    const hasWithdrawMovements = computed(() => props.movement.withdrawalMovements && props.movement.withdrawalMovements.length > 0)

    const isFuture = computed(() => props.movement.withdrawableFrom
        && new Date(props.movement.withdrawableFrom) > new Date())

    const textColor = computed(() => {
      let color = 'grey'

      if (isPastAndWithdrawn.value) {
        color = 'var(--ion-color-primary-dark)'
      } else if (isPastAndLost.value) {
        color = 'grey'
      } else if (isWithdrawable.value) {
        color = 'var(--ion-color-primary)'
      } else if (isFuture.value) {
        color = 'lightgrey'
      }

      return color
    })

    const icon = computed(() => {
      let icon = 'timeline-start'

      if (isPastAndWithdrawn.value) {
        icon = 'timeline-past'
      } else if (isPastAndLost.value) {
        icon = 'timeline-lost'
      } else if (isWithdrawable.value) {
        icon = 'timeline-waiting'
      } else if (isFuture.value) {
        icon = 'timeline-future'
      }

      return icon
    })

    const currDate = computed(() => {
      if (!props.movement.withdrawableFrom) return ''

      const finalDate = formatLocaleDateLong(new Date(props.movement.withdrawableFrom), {
        month: 'long',
        year: '2-digit'
      }).split(' ')

      finalDate[1] = '\'' + finalDate[1]

      return finalDate.join(' ')
    })

    async function onWithdrawalClick () {
      if (!props.movement.incomeAmount) return

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
        debugger

        if (value > props.movement.incomeAmount || value < 1) {
          await alerts.toastError('Importo non valido')
          return
        }

        await http.api.walletPremium.withdraw(props.movement._id, value)
      }
    }

    async function showMovementsList () {
      const modal = await modalController.create({
        component: WPWithdrawMovementsModal,
        componentProps: {
          title: 'New Title',
          content: 'prova'
        },
        mode: 'ios',
        swipeToClose: true,
        // open the modal as a card only on iOs
        presentingElement: document.querySelector('.app-tabs') as HTMLElement
      })
      return modal.present()
    }

    return {
      textColor,
      icon,
      isWithdrawable,
      hasWithdrawMovements,
      formatBrites,
      formatLocaleDateLong,
      currDate,
      onWithdrawalClick,
      showMovementsList,
      WalletPremiumMovementEnum
    }
  }
})
</script>


<style scoped lang="scss">

</style>
