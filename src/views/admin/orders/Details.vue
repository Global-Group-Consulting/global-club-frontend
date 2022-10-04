<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.orderDetails.title', {number: order?._id}) }}</TopToolbar>

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
                {{ $t("pages.orderDetails.order_status") }}: <strong
                  :style="'color:' + getOrderStatusColor(order?.status)">{{ formatOrderStatus(order?.status) }}
                <span v-if="order?.cancelledByUser"> dall'utente</span></strong>
              </li>
              <li>
                {{ $t("pages.orderDetails.order_amount") }}: <strong v-html="formatBrites(order?.amount)"></strong>
              </li>
              <li>
                Utente: <strong>{{ order?.user.firstName }} {{ order?.user.lastName }}</strong>
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

        <ion-row class="mb-5 ion-text-center">
          <ion-col v-if="order?.notes">
            <div class="static-alert alert-info">
              <h5 class="mt-0">Note ordine</h5>
              <div v-html="order?.notes" class="notes-container"></div>
            </div>
          </ion-col>
          <ion-col v-if="order?.cancelReason">
            <div class="static-alert alert-error">
              <h5 class="mt-0">Motivo annullamento</h5>
              <div v-html="order?.cancelReason" class="notes-container"></div>
            </div>
          </ion-col>
        </ion-row>


        <OrderAccordion :order-data="order" @productUpdated="updateOrder"
        :message-to-highlight="messageToHighlight"></OrderAccordion>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import {computed, defineComponent, inject, Ref, ref} from 'vue';
import {Order} from '@/@types/Order';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import {onIonViewDidLeave, onIonViewWillEnter} from '@ionic/vue';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {useRoute} from 'vue-router';
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
import {formatLocaleDate} from "@/@utilities/dates"
import {formatBrites} from "@/@utilities/currency"
import {formatClubPack, formatOrderStatus, getOrderStatusColor} from "@/@utilities/statuses"
import OrderAccordion from '@/components/accordions/admin/OrderAccordion.vue';
import {OrderStatusEnum} from '@/@enums/order.status.enum';
import {useI18n} from 'vue-i18n';
import {AlertsPlugin} from '@/plugins/Alerts';
import * as yup from "yup";

export default defineComponent({
  name: "Details",
  components: {OrderAccordion, SimpleToolbarButton, SimpleToolbar, TopToolbar},
  setup() {
    const http = inject<HttpPlugin>('http') as HttpPlugin;
    const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
    const route = useRoute()
    const {t} = useI18n()
    const messageToHighlight = ref('')
    const order: Ref<Order | null> = ref(null)
    const mustStartWorking = computed(() => order.value?.status === OrderStatusEnum.PENDING)
    const mustCompleteWorking = computed(() => order.value?.status === OrderStatusEnum.IN_PROGRESS)
    const completedWorking = computed(() => order.value && [OrderStatusEnum.COMPLETED, OrderStatusEnum.CANCELLED].includes(order.value?.status))

    function updateOrder(updatedOrder: Order) {
      console.log("[] Updating order!")

      Object.assign(order.value, updatedOrder)
      // order.value = updatedOrder
    }

    const actions = computed(() => {
      return [{
        icon: "",
        text: t('pages.orderDetails.btn_cancel'),
        if: mustStartWorking.value || mustCompleteWorking.value,
        click: async () => {
          if (!order.value) {
            return
          }

          const schema = yup.object({
            reason: yup.string().required().min(5)
          })

          const answer = await alerts.ask<{ reason: string }>({
            header: "Rifiutare l'ordine?",
            message: "Siete sicuri di voler rifiutare questo ordine? Proseguendo, l'utente verrà informato e l'ordine non potrà essere ripreso.",
            buttonOkText: "Si, rifiuta!",
            inputs: [
              {
                name: 'reason',
                id: 'reasonInput',
                value: '',
                placeholder: 'Motivo del rifiuto',
              },
            ]
          })

          if (!answer.resp) {
            return;
          }

          try {
            const data = await schema.validate(answer.values);

            const result = await http.api.orders.updateStatus(order.value._id, {
              status: OrderStatusEnum.CANCELLED,
              ...data
            })

            if (result) {
              updateOrder(result)

              await alerts.toastSuccess("Ordine respinto correttamente.")
            }
          } catch (er) {
            await alerts.error(er);
          }
        }
      }, {
        icon: "",
        text: t('pages.orderDetails.btn_approve'),
        if: mustCompleteWorking.value,
        click: async () => {
          if (!order.value) {
            return
          }

          const answer = await alerts.ask({
            header: "Approvare l'ordine?",
            message: "Siete sicuri di voler approvare questo ordine? Proseguendo il conto dell'utente verrà aggiornato ed eventualmente verranno scalati i Brite usati. L'ordine inoltre verrà segnato come completato.",
            buttonOkText: "Si, approva!"
          })

          if (!answer.resp) {
            return;
          }

          const result = await http.api.orders.updateStatus(order.value._id, {
            status: OrderStatusEnum.COMPLETED
          })

          if (result) {
            updateOrder(result)

            await alerts.toastSuccess("Ordine concluso correttamente.")
          }
        }
      }, {
        icon: "",
        text: t('pages.orderDetails.btn_start_working'),
        if: mustStartWorking.value,
        click: async () => {
          if (!order.value) {
            return
          }

          const answer = await alerts.ask({
            header: "Prendere in carico l'ordine?",
            message: "Siete sicuri di voler prendere in carico questo ordine e di conseguenza iniziare a lavorarlo, eventualmente contattando l'utente?",
            buttonOkText: "Si, prendi in carico!"
          })

          if (!answer.resp) {
            return;
          }

          const result = await http.api.orders.updateStatus(order.value._id, {
            status: OrderStatusEnum.IN_PROGRESS
          })

          if (result) {
            updateOrder(result)

            await alerts.toastSuccess("Ordine preso in carico correttamente.")
          }
        }
      }].filter(el => el.if)
    })

    onIonViewWillEnter(async () => {
      const result = await http.api.orders.read(route.params.id as string);
      const query = route.query

      if (query.message) {
        messageToHighlight.value = query.message as string
      }

      order.value = result ?? null
    })

    onIonViewDidLeave(async () => {
      order.value = null;
    })

    return {
      actions,
      order, mustStartWorking, mustCompleteWorking, completedWorking,
      formatLocaleDate, formatBrites, formatOrderStatus,
      formatClubPack, updateOrder, getOrderStatusColor,
      messageToHighlight
    }
  }
});
</script>

<style scoped>

</style>
