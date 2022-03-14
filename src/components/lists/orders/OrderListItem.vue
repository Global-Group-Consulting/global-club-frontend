<template>
  <div>
    <ion-item>
      <!--    <ion-thumbnail slot="start" class="center-inner-icon" v-if="$store.getters['mdAndUp']">
            <Icon name="cart" size="large"></Icon>
          </ion-thumbnail>-->

      <ion-label>
        <h2 v-html="$t('sections.orders.order_at_date', {
            date: formatLocaleDate(order.createdAt),
            number: order._id
          })"></h2>
        <h4 v-html="$t('sections.orders.order_status', {
            status: formatOrderStatus(order.status),
            color: getOrderStatusColor(order.status)
          })"></h4>
      </ion-label>

      <div slot="end" class="d-flex ion-align-items-center">
        <ion-chip color="danger" class="unreadCounter small"  mode="ios" v-if="order.unreadCount">{{ order.unreadCount }}</ion-chip>

        <PageLink :to="{name: 'private.orders.details', params: { id: order._id }}"
                  :btn-props="{icon: true, onlyIcon: true, iconName: 'chevron-right', fill:'outline', size:'small'}">
          {{ $t("sections.orders.btn_got_to_details") }}
        </PageLink>
      </div>
    </ion-item>

    <PrivateProductListItem v-for="(product, i) in order.products" :key="i"
                            :order-product="product"
                            readonly>
    </PrivateProductListItem>

  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Order } from '@/@types/Order';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatMovementType, formatOrderStatus, getOrderStatusColor } from '@/@utilities/statuses';
  import PageLink from '@/components/PageLink.vue';
  import PrivateProductListItem from '@/components/lists/products/PrivateOrderProductListItem.vue';

  export default defineComponent({
    name: "OrderListItem",
    components: { PrivateProductListItem, PageLink },
    props: {
      order: {
        type: Object as PropType<Order>,
        required: true
      }
    },
    setup () {
      return {
        formatLocaleDate, formatOrderStatus, formatMovementType,
        getOrderStatusColor
      }
    }
  });
</script>

<style scoped>

</style>
