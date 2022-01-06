<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.orderDetails.title', { number: order?._id }) }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar v-if="order && actions.length > 0">
          <template v-slot:center>
            <SimpleToolbarButton v-for="(action, i) in actions" :key="i"
                                 :text="action.text"
                                 @click="action.click"
            />
          </template>
        </SimpleToolbar>

        <ion-row>
          <ion-col size="12" sizeLg="6" class="pb-0 py-lg-5">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                {{ $t("pages.orderDetails.order_status") }}: <strong>{{ formatOrderStatus(order?.status) }}</strong>
              </li>
              <li>
                {{ $t("pages.orderDetails.order_amount") }}: <strong v-html="formatBrites(order?.amount)"></strong>
              </li>
              <li>
                {{ $t("pages.orderDetails.user_pack") }}: <strong>{{ formatClubPack(order?.user.clubPack) }}</strong>
              </li>
            </ul>
          </ion-col>
          <ion-col size="12" sizeLg="6" class="pt-0 py-lg-5 mb-5 mb-lg-0">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                {{ $t("pages.orderDetails.order_created_at") }}: <strong>{{
                  formatLocaleDate(order?.createdAt)
                }}</strong>
              </li>
              <li>
                {{ $t("pages.orderDetails.order_updated_at") }}: <strong>{{
                  formatLocaleDate(order?.updatedAt)
                }}</strong>
              </li>
            </ul>
          </ion-col>
        </ion-row>

        <OrderAccordion :order-data="order" @productUpdated="updateOrder"></OrderAccordion>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, Ref, ref } from 'vue';
  import { Order } from '@/@types/Order';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import { formatLocaleDate } from "@/@utilities/dates"
  import { formatBrites } from "@/@utilities/currency"
  import { formatClubPack, formatOrderStatus } from "@/@utilities/statuses"
  import OrderAccordion from '@/components/accordions/admin/OrderAccordion.vue';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import { useI18n } from 'vue-i18n';
  import { AlertsPlugin } from '@/plugins/Alerts';

  export default defineComponent({
    name: "Details",
    components: { OrderAccordion, SimpleToolbarButton, SimpleToolbar, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
      const route = useRoute()
      const { t } = useI18n()
      const order: Ref<Order | null> = ref(null)
      const mustStartWorking = computed(() => order.value?.status === OrderStatusEnum.PENDING)
      const mustCompleteWorking = computed(() => order.value?.status === OrderStatusEnum.IN_PROGRESS)
      const completedWorking = computed(() => order.value && [OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED].includes(order.value?.status))

      function updateOrder (updatedOrder: Order) {
        console.log("[] Updating order!")

        Object.assign(order.value, updatedOrder)
        // order.value = updatedOrder
      }

      const actions = computed(() => {
        return [{
          icon: "",
          text: t('pages.orderDetails.btn_cancel'),
          if: mustCompleteWorking,
          click: async () => {
            if (order.value) {
              const result = await http.api.orders.updateStatus(order.value._id, {
                status: OrderStatusEnum.PENDING
              })

              if (result) {
                updateOrder(result)

                await alerts.toastSuccess("Ordine preso in carico correttamente.")
              }
            }
          }
        }, {
          icon: "",
          text: t('pages.orderDetails.btn_approve'),
          if: mustCompleteWorking,
          click: async () => {
            if (order.value) {
              const result = await http.api.orders.updateStatus(order.value._id, {
                status: OrderStatusEnum.COMPLETED
              })

              if (result) {
                updateOrder(result)

                await alerts.toastSuccess("Ordine concluso correttamente.")
              }
            }
          }
        }, {
          icon: "",
          text: t('pages.orderDetails.btn_start_working'),
          if: mustStartWorking,
          click: async () => {
            if (order.value) {
              const result = await http.api.orders.updateStatus(order.value._id, {
                status: OrderStatusEnum.IN_PROGRESS
              })

              if (result) {
                updateOrder(result)

                await alerts.toastSuccess("Ordine preso in carico correttamente.")
              }
            }
          }
        }].filter(el => el.if.value)
      })

      onIonViewWillEnter(async () => {
        const result = await http.api.orders.read(route.params.id as string);

        order.value = result ?? null
      })

      return {
        actions,
        order, mustStartWorking, mustCompleteWorking, completedWorking,
        formatLocaleDate, formatBrites, formatOrderStatus,
        formatClubPack, updateOrder
      }
    }
  });
</script>

<style scoped>

</style>
