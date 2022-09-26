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
        <div>{{ withdrawableFrom }}</div>
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
        Sblocca
      </ClubButton>

      <ClubButton :only-icon="$store.getters['smAndDown']" v-if="movement.hasWithdrawMovements"
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
import { useWithdrawal } from '@/composables/walletPremium/withdrawal'

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
  setup (props) {
    const withdrawal = useWithdrawal()

    // indicates if the movement is past but has been withdrawn
    const isPastAndWithdrawn = computed(() => props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) < new Date()
        && props.movement.withdrawalDate)

    // indicates if the movement is past and can no more be withdrawn
    const isPastAndLost = computed(() => props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) < new Date()
        && !props.movement.withdrawalDate)

    // indicates if the movement has been withdrawn regardless of the date
    const isWithdrawn = computed(() => !!props.movement.withdrawalDate)

    // indicates if the movement is currently withdrawable based on the date
    const isWithdrawable = computed(() => props.movement.withdrawableFrom && props.movement.withdrawableUntil
        && new Date(props.movement.withdrawableUntil) > new Date()
        && new Date(props.movement.withdrawableFrom) < new Date()
        && !props.movement.withdrawalDate)

    // indicates if the movement will be withdrawable in the future
    const isFuture = computed(() => props.movement.withdrawableFrom
        && new Date(props.movement.withdrawableFrom) > new Date())

    // return the text color to be used
    const textColor = computed(() => {
      let color = 'grey'

      if (isPastAndWithdrawn.value || isWithdrawn.value) {
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

    // return the icon to be used
    const icon = computed(() => {
      let icon = 'timeline-start'

      if (isPastAndWithdrawn.value || isWithdrawn.value) {
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

    // return the withdrawableFrom date formatted
    const withdrawableFrom = computed(() => {
      if (!props.movement.withdrawableFrom) return ''

      const finalDate = formatLocaleDateLong(new Date(props.movement.withdrawableFrom), {
        month: 'long',
        year: '2-digit'
      }).split(' ')

      finalDate[1] = '\'' + finalDate[1]

      return finalDate.join(' ')
    })

    /**
     * When the user clicks on the withdrawal button, trigger the withdrawal
     */
    async function onWithdrawalClick () {
      if (!props.movement.withdrawalRemaining) return

      withdrawal.setUserId(props.movement.userId)

      await withdrawal.onWithdrawClick(props.movement.semester, props.movement.withdrawalRemaining)
    }

    /**
     * When the user clicks on the movements button, show the withdrawal movements list of the current movement
     */
    async function showMovementsList () {
      const modal = await modalController.create({
        component: WPWithdrawMovementsModal,
        componentProps: {
          title: 'Dettaglio movimenti di sblocco',
          movementId: props.movement._id
        },
        mode: 'ios',
        swipeToClose: true,
        // open the modal as a card only on iOS
        presentingElement: document.querySelector('.app-tabs') as HTMLElement
      })
      return modal.present()
    }

    return {
      textColor,
      icon,
      isWithdrawable,
      formatBrites,
      formatLocaleDateLong,
      withdrawableFrom,
      onWithdrawalClick,
      showMovementsList,
      WalletPremiumMovementEnum
    }
  }
})
</script>


<style scoped lang="scss">

</style>
