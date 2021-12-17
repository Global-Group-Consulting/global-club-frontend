<template>
    <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png" />
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br />
            Stato: <span class="completato">Completato</span>
            <ion-progress-bar
              class="progress"
              color="primary"
              value="1"
            ></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-icon
              style="zoom: 2; padding-top: 9px"
              src="./assets/icons/circle-right.svg"
            ></ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br />
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png" />
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br />
            Stato: <span class="annullato">Annullato</span>
            <ion-progress-bar
              class="progress"
              color="primary"
              value="1"
            ></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-icon
              style="zoom: 2; padding-top: 9px"
              src="./assets/icons/circle-right.svg"
            ></ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br />
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png" />
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br />
            Stato: <span class="completato">Completato</span>
            <ion-progress-bar
              class="progress"
              color="primary"
              value="1"
            ></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-icon
              style="zoom: 2; padding-top: 9px"
              src="./assets/icons/circle-right.svg"
            ></ion-icon>
          </ion-col>
        </ion-row>
      </ion-grid>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name:'CompletedOrders',
    setup() {
        
    },
})
</script>
<style>

</style>