<template>
  <IonPage>
    <div class="header-nav"> 
      <TopToolbar include-back>Il mio portfolio</TopToolbar>
        </div>
    
    <IonContent class="ion-padding">
    <Movement></Movement>
    
</IonContent>
</IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent, ref } from "vue";
import VSwitch from '@lmiller1990/v-switch';
import BriteValue from '@/components/BriteValue.vue';
import ClubButton from '@/components/ClubButton.vue';
import Movement from '@/views/shared/Movement.vue';


export default defineComponent({
  name: "PremiumWallet",
  components: {
    VSwitch,ClubButton, BriteValue,Movement},
  setup() {
    return {
      categoria: ref('totale-resoconto')
    }
    //const http: HttpPlugin = inject('http');
  },

});
</script>

<style>

</style>