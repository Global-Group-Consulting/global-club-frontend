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
      <!--    <ion-row class="mb-4">-->
      <!--      <ion-col >-->
      <h5>Totale disponibile:
        <BriteValue :value="movement?.incomeAmount ?? 0" class="font-bold"></BriteValue>
      </h5>
      <h5>Totale riscosso:
        <BriteValue :value="(movement?.incomeAmount ?? 0) - (movement?.withdrawalRemaining || 0)" class="font-bold"></BriteValue>
      </h5>
      <h5>Totale rimanente:
        <BriteValue :value="movement?.withdrawalRemaining ?? 0" class="font-bold"></BriteValue>
      </h5>
      <!--      </ion-col>-->
      <!--      <ion-col>-->
      <!--        -->
      <!--      </ion-col>-->
      <!--    </ion-row>-->
    </div>

    <ion-list>
      <ion-item v-for="withdrawMovement in movement?.withdrawalMovements" :key="withdrawMovement._id">
        <ion-label>
          <div>
            <BriteValue :value="withdrawMovement.amountChange"/>
          </div>
          <div>{{ t('enums.MovementTypeEnum.' + withdrawMovement.movementType) }}</div>

          <div><small class="ion-text-wrap">{{ withdrawMovement.notes }}</small></div>

          <div>
            {{ formatLocaleDate(withdrawMovement.createdAt) }}
          </div>
        </ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, Ref, ref } from 'vue'
import { modalController } from '@ionic/vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import BriteValue from '@/components/BriteValue.vue'
import { formatLocaleDate } from '@/@utilities/dates'
import { useI18n } from 'vue-i18n'

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

    function dismissModal () {
      modalController.dismiss()
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
      formatLocaleDate
    }
  }
})
</script>

<style scoped>

</style>
