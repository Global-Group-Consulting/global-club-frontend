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
import { defineComponent, ref } from "vue";
import Movement from '@/views/shared/Movement.vue';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';


export default defineComponent({
  name: "PremiumWallet",
  components: {
    TopToolbar,
    Movement
  },
  setup () {
    return {
      categoria: ref('totale-resoconto')
    }
    //const http: HttpPlugin = inject('http');
  },

});
</script>

<style>

</style>
