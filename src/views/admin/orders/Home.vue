<template>
  <ion-page>
    <TopToolbar>{{ $t("pages.orders.title") }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <TabsItems :tabs-list="tabs" v-model="activeTab"></TabsItems>

        <ion-list>
          <AdminListItem v-for="order of ordersList" :key="order._id"
                         :title="$t('pages.orders.list.text', {
                           fullName: order.user.firstName + ' ' + order.user.lastName,
                           date: formatLocaleDate(order.createdAt)
                         })"
                         :description="$t('pages.orders.list.subText', {
                           number: order._id,
                           status: formatOrderStatus(order.status)
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
  import { defineComponent, inject, Ref, ref, watch } from 'vue';
  import { IonPage, onIonViewWillEnter } from '@ionic/vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Order } from '@/@types/Order';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import PaginationBar from '@/components/PaginationBar.vue';
  import { PaginatedResult } from '@/@types/Pagination';
  import { omit } from 'lodash';
  import { formatLocaleDate } from "@/@utilities/dates"
  import { formatOrderStatus } from "@/@utilities/statuses"
  import Icon from '@/components/Icon.vue';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import { useI18n } from 'vue-i18n';
  import { TabEntry } from '@/@types/TabEntry';
  import TabsItems from '@/components/tabs/TabsItems.vue';

  export default defineComponent({
    name: "OrdersPage",
    components: { TabsItems, Icon, PaginationBar, AdminListItem, TopToolbar, IonPage },
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

      async function fetchData (status: OrderStatusEnum) {
        const paginatedResult = await http.api.orders.readAll(status);

        ordersList.value = paginatedResult?.data ?? []
        paginationData.value = omit(paginatedResult, ["data"])
      }

      // when activeTab changes, fetch the corresponding data
      watch(activeTab, async (value) => fetchData(value))

      onIonViewWillEnter(async () => {
        // Fetch counters and actual data for the current tab
        await Promise.all([
          fetchCounters(),
          fetchData(activeTab.value)
        ])
      })

      return {
        ordersList,
        paginationData,
        tabs,
        activeTab,
        formatLocaleDate, formatOrderStatus
      }
    }
  });
</script>

<style scoped>
</style>
