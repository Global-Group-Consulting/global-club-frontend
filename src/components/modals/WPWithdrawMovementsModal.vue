<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal()">Chiudi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <div class="mb-5 ion-text-start">
      <h5>Totale accumulato:
        <BriteValue :value="movement?.incomeAmount ?? 0" class="font-bold"></BriteValue>
      </h5>
      <h5>Totale sbloccato:
        <BriteValue :value="(movement?.incomeAmount ?? 0) - (movement?.withdrawalRemaining || 0)"
                    class="font-bold"></BriteValue>
      </h5>
      <h5>Totale rimanente:
        <BriteValue :value="movement?.withdrawalRemaining ?? 0" class="font-bold"></BriteValue>
      </h5>
    </div>

    <ion-list>
      <ion-item v-for="withdrawMovement in movement?.withdrawalMovements" :key="withdrawMovement._id">
        <ion-label>
          <div>
            <BriteValue :value="withdrawMovement.amountChange"/>
          </div>
          <div>{{ movementType(withdrawMovement) }}</div>

          <div><small class="ion-text-wrap">{{ notes(withdrawMovement) }}</small></div>

          <div>
            {{ formatLocaleDate(withdrawMovement.createdAt) }}
          </div>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref } from 'vue'
import { modalController } from '@ionic/vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import BriteValue from '@/components/BriteValue.vue'
import { formatLocaleDate } from '@/@utilities/dates'
import { useI18n } from 'vue-i18n'
import { MovementTypeEnum } from '@/@enums/movement.type.enum'

export default defineComponent({
  name: 'WPWithdrawMovementsModal',
  components: { BriteValue },
  props: {
    title: {
      type: String,
      required: true
    },
    movementId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { t } = useI18n()
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const movement: Ref<WalletPremiumMovement | undefined> = ref()

    function movementType (withdrawMovement) {
      return t('enums.MovementTypeEnum.' + withdrawMovement.movementType + '_self')
    }

    function dismissModal () {
      modalController.dismiss()
    }

    function notes(withdrawMovement){
      return withdrawMovement.notes;
    }

    onMounted(() => {
      http.api.walletPremium.show(props.movementId)
          .then((resp) => {
            movement.value = resp
          })
    })

    return {
      t,
      dismissModal,
      movement,
      movementType,
      formatLocaleDate,
      notes
    }
  }
})
</script>

<style scoped>

</style>
