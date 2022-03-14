<template>
  <div>
    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <PaginatedList :paginated-data="paginatedData"
                   v-slot:default="{data}"
                   :visible="visible"
                   @pageChanged="onPageChanged"
                   @manualRefresh="onManualRefresh">
      <ion-list>
        <AdminListItem v-for="(order, i) in data" :key="i"
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

          <template v-slot:buttons-start v-if="order.unreadCount">
            <ion-chip color="danger" class="unreadCounter small" mode="ios">{{ order.unreadCount }}</ion-chip>
          </template>

        </AdminListItem>
      </ion-list>
    </PaginatedList>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject, onMounted, PropType, Ref, ref, watch} from 'vue';
import {Order} from '@/@types/Order';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {OrderStatusEnum} from '@/@enums/order.status.enum';
import AdminListItem from '@/components/lists/AdminListItem.vue';
import {formatLocaleDate} from '@/@utilities/dates';
import {formatOrderStatus, getOrderStatusColor} from '@/@utilities/statuses';
import {useI18n} from 'vue-i18n';
import PaginatedList from "@/components/lists/PaginatedList.vue";
import {PaginatedResult} from "@/@types/Pagination";

export default defineComponent({
  name: "AdminOrdersList",
  components: {PaginatedList, AdminListItem},
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
    limit: Number,
    filters: Object,
    eager: Boolean,
    refreshAsap: Boolean,
  },
  setup(props, {emit}) {
    const http = inject("http") as HttpPlugin;
    const {t} = useI18n();
    const paginatedData: Ref<PaginatedResult<any> | undefined> = ref();
    const loaded = ref(false);
    const pendingRefresh = ref(false);

    function getTitle(order: Order) {
      return t('pages.orders.list.text', {
        fullName: order.user.firstName + ' ' + order.user.lastName,
        date: formatLocaleDate(order.createdAt)
      })
    }

    function getDescription(order: Order) {
      return t('pages.orders.list.subText', {
        number: order._id,
        status: formatOrderStatus(order.status),
        color: getOrderStatusColor(order.status)
      })
    }

    async function fetchData(page?: number) {
      if (props.filters && Object.keys(props.filters).length === 0) {
        paginatedData.value = undefined;

        return;
      }

      try {
        paginatedData.value = await http.api.orders.readAll(props.statuses, props.userId, props.limit, page, props.filters);

        loaded.value = true;
        pendingRefresh.value = false

        emit("dataFetched");
      } catch (er) {
        paginatedData.value = undefined;
      }
    }

    async function onPageChanged(page: number) {
      await fetchData(page);
    }

    async function onManualRefresh(event) {
      await fetchData(paginatedData.value?.page);

      // Must call complete to let the loader know all is done
      event.target.complete();
    }

    watch(() => props.visible, (value) => {
      if ((!loaded.value && value) || (value && pendingRefresh.value)) {
        fetchData()
      }
    })

    watch(() => props.filters, () => {
      if (loaded.value || props.eager) {
        fetchData()
      }
    }, {immediate: true, deep: true})

    watch(() => props.refreshAsap, value => {
      if (value) {
        pendingRefresh.value = true
      }
    })

    /*  onMounted(async () => {
        if (!loaded.value && props.visible) {
          await fetchData()
        }
      });*/

    return {
      paginatedData,
      formatLocaleDate, formatOrderStatus,
      getTitle, getDescription,
      onPageChanged, onManualRefresh
    }
  }
  });
</script>

<style scoped>

</style>
