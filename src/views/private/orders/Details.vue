<template>
  <IonPage>
    <TopToolbar include-back>Ordine #{{ order?._id }}</TopToolbar>

    <IonContent>
      <ion-grid fixed>
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
        <ion-row class="mb-4">
          <ion-col class="ion-text-start">
            <h4 class="m-0">Stato ordine</h4>
          </ion-col>

          <ion-col class="icon-position">
            <h4 class="m-0 ion-text-right" :style="`color: ${getOrderStatusColor(order?.status)}`">
              {{ formatOrderStatus(order?.status) }}
            </h4>
          </ion-col>
        </ion-row>

        <ion-list class="list-transparent" lines="full">
          <PrivateOrderProductListItem v-for="product in order?.products" :key="product.product._id"
                                       :order-product="product"></PrivateOrderProductListItem>
        </ion-list>
      </ion-grid>

      <BottomDrawer :order="order"></BottomDrawer>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import { useRoute } from 'vue-router';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Order } from '@/@types/Order';
  import BriteValue from '@/components/BriteValue.vue';
  import PrivateOrderProductListItem from '@/components/lists/products/PrivateOrderProductListItem.vue';
  import BottomDrawer from '@/views/private/orders/BottomDrawer.vue';
  import { formatOrderStatus, getOrderStatusColor } from '@/@utilities/statuses';

  export default defineComponent({
    name: "Details",
    components: { BottomDrawer, PrivateOrderProductListItem, BriteValue },
    setup () {
      const order: Ref<Order | undefined> = ref()
      const route = useRoute();
      const http = inject("http") as HttpPlugin;

      onIonViewWillEnter(async () => {
        const orderId = route.params["id"] as string;

        order.value = await http.api.orders.read(orderId);
      })

      return {
        order,
        formatOrderStatus, getOrderStatusColor
      }
    }
  });
</script>

<style scoped>

</style>
