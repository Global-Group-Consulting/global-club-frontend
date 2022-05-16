<template>
  <IonPage>
    <TopToolbar include-back>I miei ordini</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <PrivateOrdersList :statuses="pendingStatuses" title="Ordini in corso"
                           class="mb-5"
                           v-model:updateAsap="updateAsap"></PrivateOrdersList>

        <PrivateOrdersList :statuses="completedStatuses" title="Ordini conclusi"></PrivateOrdersList>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { OrderStatusEnum } from '@/@enums/order.status.enum'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import PrivateOrdersList from '@/components/lists/orders/PrivateOrdersList.vue'
import { onIonViewWillEnter } from '@ionic/vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: { PrivateOrdersList, TopToolbar },
  setup () {
    const route = useRoute()
    const pendingStatuses = [OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS]
    const completedStatuses = [OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED]
    const updateAsap = ref(false)

    onIonViewWillEnter(() => {
      if (route.query.refreshPending) {
        updateAsap.value = true
      }
    })

    return {
      pendingStatuses,
      completedStatuses,
      updateAsap
    }
  }
})
</script>

<style scoped>

</style>
