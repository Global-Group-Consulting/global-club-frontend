<template>
  <IonPage>
    <TopToolbar include-back>Il mio portfolio</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <UserStatistics></UserStatistics>
      </ion-grid>


    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, ref } from "vue";
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import UserStatistics from '@/components/UserStatistics.vue';

  export default defineComponent({
    name: "PremiumWallet",
    components: {
      UserStatistics,
      TopToolbar,
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
