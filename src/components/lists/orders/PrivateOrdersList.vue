<template>
  <div>
    <h4 class="sticky-text" v-if="title">{{ title }}</h4>

    <PaginatedList :paginated-data="paginatedData"
                   v-slot:default="{data}"
                   visible
                   @pageChanged="onPageChanged"
                   @manualRefresh="onManualRefresh">
      <ion-list v-for="(order, i) in data" :key="i" class="mb-3">
        <OrderListItem :order="order"></OrderListItem>
      </ion-list>
    </PaginatedList>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, PropType, Ref, ref, watch } from 'vue'
import { PaginatedResultEntity } from '@/@entities/paginatedResult.entity'
import { Order } from '@/@types/Order'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { OrderStatusEnum } from '@/@enums/order.status.enum'
import OrderListItem from '@/components/lists/orders/OrderListItem.vue'
import NoData from '@/components/NoData.vue'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { PaginatedResult } from '@/@types/Pagination'

export default defineComponent({
  name: 'PrivateOrdersList',
  components: { PaginatedList, OrderListItem },
  props: {
    title: String,
    statuses: {
      type: Array as PropType<OrderStatusEnum[]>,
      required: true
    },
    noDataText: String,
    updateAsap: Boolean
  },
  setup (props, { emit }) {
    const http = inject('http') as HttpPlugin
    const orders = new PaginatedResultEntity<Order>()
    const paginatedData: Ref<PaginatedResult<any> | undefined> = ref()

    async function fetchData (page = 1) {
      const result = await http.api.orders.readByStatus(props.statuses, page)

      // orders.merge(result)
      paginatedData.value = result ?? undefined

      emit('update:updateAsap', false)
    }

    async function onPageChanged (page: number) {
      await fetchData(page)
    }

    async function onManualRefresh (event) {
      await fetchData(paginatedData.value?.page)

      // Must call complete to let the loader know all is done
      event.target.complete()
    }

    onMounted(async () => {
      await fetchData()
    })

    watch(() => props.updateAsap, async (newValue) => {
      if (newValue) {
        await fetchData()
      }
    })

    return {
      orders,
      fetchData,
      paginatedData,
      onPageChanged,
      onManualRefresh
    }
  }
})
</script>

<style scoped lang="scss">
.sticky-text {
  position: sticky;
  top: -.5rem;
  z-index: 3;
  background: rgba(var(--ion-color-primary-rgb), .3);
  padding: 1rem .5rem;
  backdrop-filter: blur(10px);
  border-radius: .5rem;
  margin-left: -1rem;
  margin-right: -1rem;

}
</style>
