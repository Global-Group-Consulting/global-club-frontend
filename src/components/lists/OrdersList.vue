<template>
  <div v-if="ordersList?.length > 0">
    <p class="ion-text-center mb-4">{{ $t("sections.orders.last_x_orders", { number: 5 }) }}</p>

    <ion-list class="mb-3">
      <OrderListItem v-for="order of ordersList" :key="order._id"
                     :order="order"></OrderListItem>
    </ion-list>

    <div class="ion-text-center">
      <PageLink :to="{name: 'admin.orders'}" :btn-props="{target: '_blank'}"
                color="primary" version="outline" icon
                icon-name="link" icon-position="end">
        {{ $t("sections.orders.show_all_orders") }}
      </PageLink>
    </div>

  </div>

  <NoData v-else/>

  <PaginationBar :pagination-data="paginationData"></PaginationBar>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref, watch } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { PaginatedResultData, PaginationData } from '@/@entities/pagination.entity';
  import { PaginatedResult } from '@/@types/Pagination';
  import { Order } from '@/@types/Order';
  import Tabs from '@/components/Tabs.vue';
  import PaginationBar from '@/components/PaginationBar.vue';
  import NoData from '@/components/NoData.vue';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import ClubButton from '@/components/ClubButton.vue';
  import OrderListItem from '@/components/lists/orders/OrderListItem.vue';
  import PageLink from '@/components/PageLink.vue';

  export default defineComponent({
    name: "OrdersList",
    components: { PageLink, OrderListItem, NoData, PaginationBar },
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    setup (props) {
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const ordersList: Ref<Order[] | null> = ref(null)
      const paginationData: Ref<PaginationData> = ref(new PaginationData())
      const activeTab = ref(OrderStatusEnum.PENDING);

      watch(() => props.userId, async (userId: string) => {
        if (!userId) {
          return
        }

        const apiCalls: any[] = [
          http.api.orders.readAll(undefined, userId, 5)
        ]

        const results = await Promise.all<PaginatedResult<Order[]>>(apiCalls);
        const paginatedResult = new PaginatedResultData(results[0])

        ordersList.value = paginatedResult.data
        paginationData.value = paginatedResult.paginationData;

      }, { immediate: true });

      return {
        ordersList, activeTab,
        paginationData,
        formatLocaleDate, formatOrderStatus
      }
    }
  });
</script>

<style scoped>

</style>
