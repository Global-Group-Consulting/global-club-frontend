<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.orderDetails.title', { number: order?._id }) }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton :disabled="!order"
                                 :text="$t('pages.orderDetails.btn_cancel')"
            />
            <SimpleToolbarButton :disabled="!order"
                                 :text="$t('pages.orderDetails.btn_approve')"
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
                {{ $t("pages.orderDetails.order_amount") }}: <strong>{{ formatCurrency(order?.amount) }}</strong>
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


        <AccordionList :sections="accordionSections">
          <template v-slot:content_communication>
            <ul>
              <li v-for="message in order?.communication.messages" :key="message._id">
                <div v-html="message.content"></div>
              </li>
            </ul>
          </template>
        </AccordionList>

      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from 'vue';
  import { Order } from '@/@types/Order';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import { formatLocaleDate } from "@/@utilities/dates"
  import { formatCurrency } from "@/@utilities/currency"
  import { formatOrderStatus } from "@/@utilities/statuses"
  import AccordionList from '@/components/AccordionList.vue';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: "Details",
    components: { AccordionList, SimpleToolbarButton, SimpleToolbar, TopToolbar },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const route = useRoute()
      const { t } = useI18n()
      const order: Ref<Order | null> = ref(null)
      const accordionSections = ref([
        {
          id: "communication",
          text: t("pages.orderDetails.tab_communication"),
          open: false
        },
        {
          id: "products",
          text: t("pages.orderDetails.tab_products"),
          open: false
        },
        {
          id: "user",
          text: t("pages.orderDetails.tab_user"),
          open: false
        }
      ])

      onIonViewWillEnter(async () => {
        const result = await http.api.orders.read(route.params.id as string);

        order.value = result ?? null
      })

      return {
        order,
        accordionSections,
        formatLocaleDate, formatCurrency, formatOrderStatus
      }
    }
  });
</script>

<style scoped>

</style>
