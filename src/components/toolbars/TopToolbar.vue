<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button menu="main-menu" ></ion-menu-button>
      </ion-buttons>
      <ion-title>My Navigation Bar</ion-title>
    </ion-toolbar>
  </ion-header>

</template>

<script lang="ts" setup>
import { menuController } from '@ionic/vue' ;
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
window['menuController'] = menuController;

/*watch(() => store.getters['gridSize'], (value) => {
  if (['md', 'lg', 'xl'].includes(value)) {

  }
});*/
</script>

<style scoped>

</style>
