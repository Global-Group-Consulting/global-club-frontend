<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <div class="content-container" v-if="!validated">
      <ClubButton @click="onSubmitClick">Trasferisci al mio Wallet</ClubButton>

      <div class="center-text">
        - oppure -
      </div>

      <div class="w-100 w-sm-75">
        Invia ad un utente
        <FormInputV label="N° tessera" v-model="clubCardNumber"></FormInputV>
      </div>
    </div>

    <div class="content-container" v-if="validated">
      <p style="font-size: 18px; line-height: 30px">
        Siete sicuri di voler trasferire l'importo disponibile a <strong>{{ destinationUser?.firstName }}
        {{ destinationUser?.lastName }}</strong>?
        Se non lo si desidera, premere "Annulla" e svuotare il campo <strong>"N° tessera"</strong>.
      </p>
    </div>

  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">
      {{ validated ? 'Annulla' : 'Chiudi' }}
    </ClubButton>

    <ClubButton @click="onSubmitClick" v-if="clubCardNumber.trim()">
      {{ validated ? 'Trasferisci' : 'Verifica' }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { modalController } from '@ionic/vue'
import ClubButton from '@/components/ClubButton.vue'
import { formatBrites, formatCurrency } from '@/@utilities/currency'
import FormInputV from '@/components/forms/FormInputV.vue'
import { useWithdrawal } from '@/composables/walletPremium/withdrawal'

export default defineComponent({
  name: 'WPWithdrawModal',
  components: { FormInputV, ClubButton },
  props: {
    title: String,
    okText: {
      type: String,
      default: 'Invia'
    },
    cancelText: {
      type: String,
      default: 'Annulla'
    },
    amount: Number
  },
  setup (props) {
    const withdraw = useWithdrawal()
    const validated = ref(false)
    const destinationUser = ref()
    const clubCardNumber = ref('')

    async function onCancelClick () {
      if (validated.value) {
        validated.value = false
        clubCardNumber.value = ''
        destinationUser.value = null

        return
      }

      (await modalController.getTop())?.dismiss()
    }

    async function onSubmitClick () {
      if (!validated.value && clubCardNumber.value.trim()) {
        const resp = await withdraw.checkClubCardNum(clubCardNumber.value)

        if (resp) {
          destinationUser.value = resp
          validated.value = true
        }

        return
      }

      const modal = await modalController.getTop()

      if (!modal) {
        return
      }

      await modal.dismiss({
        amount: props.amount,
        destinationUser: destinationUser.value
      }, 'ok')
    }

    return {
      onCancelClick,
      onSubmitClick,
      formatBrites,
      formatCurrency,
      clubCardNumber,
      validated,
      destinationUser
    }
  }
})
</script>

<style scoped lang="scss">
.content-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;

  & * {
    flex-shrink: 0;
  }
}

.center-text {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
