<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon">
      <Icon name="cart" size="large"></Icon>
    </ion-thumbnail>

    <ion-label>
      <h2 v-html="$t('sections.orders.order_at_date', {
            date: formatLocaleDate(order.createdAt),
            number: order._id
          })"></h2>
      <h4 v-html="$t('sections.orders.order_status', {
            status: formatOrderStatus(order.status)
          })"></h4>
    </ion-label>

    <ion-label slot="end">
      <PageLink :to="{name: 'admin.orders.details', params: { id: order._id }}">
        {{ $t("sections.orders.btn_got_to_details") }}
      </PageLink>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Order } from '@/@types/Order';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatMovementType, formatOrderStatus } from '@/@utilities/statuses';
  import PageLink from '@/components/PageLink.vue';

  export default defineComponent({
    name: "OrderListItem",
    components: { PageLink },
    props: {
      order: {
        type: Object as PropType<Order>,
        required: true
      }
    },
    setup () {

      return {
        formatLocaleDate, formatOrderStatus, formatMovementType
      }
    }
  });
</script>

<style scoped>

</style>
