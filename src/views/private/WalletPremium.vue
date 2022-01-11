<template>
  <IonPage>
    <TopToolbar include-back>Il mio Wallet Premium</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <NoData text="Presto disponibile"></NoData>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import NoData from '@/components/NoData.vue';

  export default defineComponent({
    name: "WalletPremium",
    components: { NoData, TopToolbar },
    setup () {
      return {}
    },
  });
</script>
