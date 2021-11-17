<template>
  <ion-page>
    <TopToolbar></TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <ion-list>
          <AdminListItem v-for="order of ordersList" :key="order._id"
                         :title="order._id"
                         :open-link="{ name: 'admin.orders.details', params: { id: order._id } }"
          >
          </AdminListItem>
        </ion-list>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue';
  import { IonPage, onIonViewWillEnter } from '@ionic/vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Order } from '@/@types/Order';
  import AdminListItem from '@/components/lists/AdminListItem.vue';

  export default defineComponent({
    name: "OrdersPage",
    components: { AdminListItem, TopToolbar, IonPage },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const ordersList: Ref<Order[]> = ref([])

      onIonViewWillEnter(async () => {
        const paginatedData = await http.api.orders.readAll();

        ordersList.value = paginatedData?.data ?? []
      })

      return {
        ordersList
      }
    }
  });
</script>

<style scoped>
</style>
