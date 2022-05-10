<template>
  <IonPage>
    <TopToolbar include-back>Ordine #{{ order?._id }}</TopToolbar>

    <IonContent>
      <ion-grid fixed class="mb-5">
        <ion-row class="">
          <ion-col class="ion-text-start">
            <h3 class="m-0">Totale</h3>
          </ion-col>

          <ion-col class="icon-position">
            <h3 class="m-0 ion-text-right">
              <BriteValue :value="order?.amount"></BriteValue>
            </h3>
          </ion-col>
        </ion-row>

        <ion-row class="">
          <ion-col class="ion-text-start">
            <h4 class="m-0">Stato ordine</h4>
          </ion-col>

          <ion-col class="icon-position">
            <h4 class="m-0 ion-text-right" :style="`color: ${getOrderStatusColor(order?.status)}`">
              {{ formatOrderStatus(order?.status) }}
            </h4>
          </ion-col>
        </ion-row>

        <ion-row class="mb-4">
          <ion-col class="ion-text-start">
            <h4 class="m-0">Data creazione</h4>
          </ion-col>

          <ion-col class="icon-position">
            <h4 class="m-0 ion-text-right">
              {{ formatLocaleDate(order?.createdAt) }}
            </h4>
          </ion-col>
        </ion-row>


        <ion-row class="mb-4 ion-text-center">
          <ion-col v-if="order?.notes" size="12" sizeLg="6">
            <div class="static-alert alert-info" v-if="order?.notes">
              <h5 class="mt-0">Note ordine</h5>
              <div v-html="order?.notes" class="notes-container"></div>
            </div>
          </ion-col>
          <ion-col v-if="order?.cancelReason" size="12" sizeLg="6">
            <div class="static-alert alert-error">
              <h5 class="mt-0">Motivo annullamento</h5>
              <div v-html="order?.cancelReason" class="notes-container"></div>
            </div>
          </ion-col>
        </ion-row>

        <ion-list class="list-transparent" lines="full">
          <PrivateOrderProductListItem v-for="(product, i) in order?.products" :key="i"
                                       :order-product="product"
                                       :readonly="!product.product || product.product.packChange"></PrivateOrderProductListItem>
        </ion-list>
      </ion-grid>

      <BottomDrawer :order="order" slot="fixed" :message-to-highlight="messageToHighlight"></BottomDrawer>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue'
import { useRoute } from 'vue-router'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { Order } from '@/@types/Order'
import BriteValue from '@/components/BriteValue.vue'
import PrivateOrderProductListItem from '@/components/lists/products/PrivateOrderProductListItem.vue'
import BottomDrawer from '@/views/private/orders/BottomDrawer.vue'
import { formatOrderStatus, getOrderStatusColor } from '@/@utilities/statuses'
import { formatLocaleDate } from '@/@utilities/dates'

export default defineComponent({
  name: 'Details',
  components: { BottomDrawer, PrivateOrderProductListItem, BriteValue },
  setup () {
    const order: Ref<Order | undefined> = ref()
    const route = useRoute()
    const http = inject('http') as HttpPlugin
    const messageToHighlight = ref('')

    onIonViewWillEnter(async () => {
      const orderId = route.params['id'] as string
      const query = route.query

      if (query.message) {
        messageToHighlight.value = query.message as string
      }

      order.value = await http.api.orders.read(orderId)
    })

    onIonViewDidLeave(() => {
      order.value = undefined
    })

    return {
      order,
      formatOrderStatus, getOrderStatusColor, formatLocaleDate,
      messageToHighlight
    }
  }
})
</script>

<style scoped>

</style>
