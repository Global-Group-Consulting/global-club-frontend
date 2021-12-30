<template>
  <IonPage>
    <TopToolbar include-back>I miei ordini</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <PrivateOrdersList :statuses="pendingStatuses" title="Ordini in corso"
                           class="mb-5"></PrivateOrdersList>

        <PrivateOrdersList :statuses="completedStatuses" title="Ordini conclusi"></PrivateOrdersList>
      </ion-grid>
      <br/>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import PrivateOrdersList from '@/components/lists/orders/PrivateOrdersList.vue';

  export default defineComponent({
    name: "Home",
    components: { PrivateOrdersList, TopToolbar },
    setup () {
      const pendingStatuses = [OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS];
      const completedStatuses = [OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED];

      return {
        pendingStatuses,
        completedStatuses
      };
    },
  });
</script>

<style scoped>

</style>
