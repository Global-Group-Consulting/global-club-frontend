<template>
  <ion-page>
    <TopToolbar>{{ $t("pages.orders.title") }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <Tabs :data="tabs">
          <template v-slot:tabSlide_pending="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.PENDING]" :visible="isActive"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_inProgress="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.IN_PROGRESS]" :visible="isActive"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_completed="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.COMPLETED]" :visible="isActive"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_cancelled="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.CANCELLED]" :visible="isActive"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
        </Tabs>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue';
  import { IonPage, onIonViewWillEnter } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Order } from '@/@types/Order';
  import { PaginatedResult } from '@/@types/Pagination';
  import { formatLocaleDate } from "@/@utilities/dates"
  import { formatOrderStatus } from "@/@utilities/statuses"
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import { useI18n } from 'vue-i18n';
  import { TabEntry } from '@/@types/TabEntry';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import Tabs from '@/components/tabs/Tabs.vue';
  import AdminOrdersList from '@/components/lists/orders/AdminOrdersList.vue';

  export default defineComponent({
    name: "OrdersPage",
    components: { AdminOrdersList, Tabs, TopToolbar, IonPage },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const { t } = useI18n();
      const ordersList: Ref<Order[]> = ref([])
      const paginationData: Ref<Partial<PaginatedResult>> = ref({})
      const activeTab = ref(OrderStatusEnum.PENDING);
      const tabs: Ref<TabEntry[]> = ref(Object.values(OrderStatusEnum).map(key => {
        return {
          id: key,
          text: t("enums.OrderStatusEnum." + key),
          count: 0
        }
      }))

      /**
       * Fetches the counters and store the value in the tabs list
       */
      async function fetchCounters () {
        const result = await http.api.orders.readCounters()

        result?.forEach(el => {
          const correspondingTab = tabs.value.find(tab => tab.id === el._id)

          if (correspondingTab) {
            correspondingTab.count = el.count
          }
        })
      }


      onIonViewWillEnter(async () => {
        // Fetch counters and actual data for the current tab
        await Promise.all([
          fetchCounters(),
        ])
      })

      return {
        ordersList,
        paginationData,
        tabs,
        activeTab,
        formatLocaleDate, formatOrderStatus,
        OrderStatusEnum
      }
    }
  });
</script>

<style scoped>
</style>
