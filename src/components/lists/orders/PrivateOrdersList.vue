<template>
  <div>
    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <ion-list v-if="orders.data.length > 0">
      <OrderListItem v-for="(order, i) in orders.data" :key="i"
                     :order="order"></OrderListItem>
    </ion-list>

    <template v-else>
      <NoData :text="noDataText"></NoData>
    </template>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, onMounted, PropType } from 'vue';
  import { PaginatedResultEntity } from '@/@entities/paginatedResult.entity';
  import { Order } from '@/@types/Order';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import OrderListItem from '@/components/lists/orders/OrderListItem.vue';
  import NoData from '@/components/NoData.vue';

  export default defineComponent({
    name: "PrivateOrdersList",
    components: { NoData, OrderListItem },
    props: {
      title: String,
      statuses: {
        type: Array as PropType<OrderStatusEnum[]>,
        required: true
      },
      noDataText: String
    },
    setup (props) {
      const http = inject("http") as HttpPlugin;
      const orders = new PaginatedResultEntity<Order>();

      onMounted(async () => {
        const result = await http.api.orders.readByStatus(props.statuses);

        orders.merge(result);
      });

      return {
        orders
      }
    }
  });
</script>

<style scoped>

</style>
