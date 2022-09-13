<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="dismissModal()">Chiudi</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding"> PASSARE LA LISTA DEI MOVIMENTI E MOSTRARLI NEL MODALE</ion-content>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { modalController } from '@ionic/vue'

export default defineComponent({
  name: 'WPWithdrawMovementsModal',
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  setup () {
    function dismissModal () {
      modalController.dismiss()
    }

    return {
      dismissModal
    }
  }
})
</script>

<style scoped>

</style>
