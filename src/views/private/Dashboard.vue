<template>
  <IonPage>
    <TopToolbar></TopToolbar>

    <ion-content>
      Dashboard component
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TopToolbar from '@/components/toolbars/TopToolbar.vue';

export default defineComponent({
  name: "Dashboard",
  components: { TopToolbar },
});
</script>
