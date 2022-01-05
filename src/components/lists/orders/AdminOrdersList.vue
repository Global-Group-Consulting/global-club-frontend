<template>
  <div>
    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <ion-list v-if="orders.data.length > 0">
      <AdminListItem v-for="(order, i) in orders.data" :key="i"
                     :title="getTitle(order)"
                     :description="getDescription(order)"
                     :open-link="{ name: 'admin.orders.details', params: { id: order._id } }"
                     :open-link-label="$t('pages.orders.btn_open')">

        <template v-slot:image>
          <Icon name="cart"></Icon>
        </template>
        <template v-slot:extraLabels="{}">
          <small v-html="$t('pages.orders.list.lastUpdate', {date: formatLocaleDate(order.updatedAt)})"></small>
        </template>

      </AdminListItem>
    </ion-list>

    <template v-else>
      <NoData :text="noDataText"></NoData>
    </template>

    <!--        <PaginationBar :pagination-data="paginationData"></PaginationBar>-->
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, onMounted, PropType, ref, watch } from 'vue';
  import { PaginatedResultEntity } from '@/@entities/paginatedResult.entity';
  import { Order } from '@/@types/Order';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import NoData from '@/components/NoData.vue';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: "AdminOrdersList",
    components: { AdminListItem, NoData },
    props: {
      title: String,
      statuses: {
        type: Array as PropType<OrderStatusEnum[]>,
      },
      noDataText: String,
      visible: {
        type: Boolean,
        default: true
      },
      userId: String,
      limit: Number
    },
    setup (props) {
      const http = inject("http") as HttpPlugin;
      const { t } = useI18n();
      const orders = new PaginatedResultEntity<Order>();
      const loaded = ref(false);

      function getTitle (order: Order) {
        return t('pages.orders.list.text', {
          fullName: order.user.firstName + ' ' + order.user.lastName,
          date: formatLocaleDate(order.createdAt)
        })
      }

      function getDescription (order: Order) {
        return t('pages.orders.list.subText', {
          number: order._id,
          status: formatOrderStatus(order.status)
        })
      }

      async function fetchData () {
        const result = await http.api.orders.readAll(props.statuses, props.userId, props.limit);

        orders.merge(result);

        loaded.value = true;
      }

      watch(() => props.visible, (value) => {
        if (!loaded.value && value) {
          fetchData()
        }
      })

      onMounted(async () => {
        if (!loaded.value && props.visible) {
          await fetchData()
        }
      });

      return {
        orders,
        formatLocaleDate, formatOrderStatus,
        getTitle, getDescription
      }
    }
  });
</script>

<style scoped>

</style>
