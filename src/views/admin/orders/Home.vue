<template>
  <ion-page>
    <TopToolbar>{{ $t("pages.orders.title") }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <ion-list>
          <AdminListItem v-for="order of ordersList" :key="order._id"
                         :title="$t('pages.orders.list.text', {
                           fullName: order.user.firstName + ' ' + order.user.lastName,
                           date: formatLocaleDate(order.createdAt)
                         })"
                         :description="$t('pages.orders.list.subText', {
                           number: order._id,
                           status: order.status
                         })"
                         :open-link="{ name: 'admin.orders.details', params: { id: order._id } }"
                         :open-link-label="$t('pages.orders.btn_open')"
          >
            <template v-slot:image>
              <Icon name="cart"></Icon>
            </template>
            <template v-slot:extraLabels="{}">
              <small v-html="$t('pages.orders.list.lastUpdate', {date: formatLocaleDate(order.updatedAt)})"></small>
            </template>
          </AdminListItem>
        </ion-list>

        <PaginationBar :pagination-data="paginationData"></PaginationBar>
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
  import PaginationBar from '@/components/PaginationBar.vue';
  import { PaginatedResult } from '@/@types/Pagination';
  import { omit } from 'lodash';
  import { formatLocaleDate } from "@/@utilities/dates"
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "OrdersPage",
    components: { Icon, PaginationBar, AdminListItem, TopToolbar, IonPage },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const ordersList: Ref<Order[]> = ref([])
      const paginationData: Ref<Partial<PaginatedResult>> = ref({})

      onIonViewWillEnter(async () => {
        const paginatedResult = await http.api.orders.readAll();

        ordersList.value = paginatedResult?.data ?? []
        paginationData.value = omit(paginatedResult, ["data"])
      })

      return {
        ordersList,
        paginationData,
        formatLocaleDate
      }
    }
  });
</script>

<style scoped>
</style>
