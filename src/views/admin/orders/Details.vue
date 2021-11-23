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
            <Chat :communication="order?.communication"></Chat>
          </template>
          <template v-slot:content_products>
            <AccordionList :sections="productSections">
              <template v-slot:content_product="{item}">
                {{ item.data }}
              </template>
            </AccordionList>
          </template>
        </AccordionList>

      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, Ref, ref } from 'vue';
  import { Order, OrderProduct } from '@/@types/Order';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import { formatLocaleDate } from "@/@utilities/dates"
  import { formatCurrency } from "@/@utilities/currency"
  import { formatOrderStatus } from "@/@utilities/statuses"
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { useI18n } from 'vue-i18n';
  import Chat from '@/components/chats/Chat.vue';

  export default defineComponent({
    name: "Details",
    components: { Chat, AccordionList, SimpleToolbarButton, SimpleToolbar, TopToolbar },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const route = useRoute()
      const { t } = useI18n()
      const order: Ref<Order | null> = ref(null)

      const productsCount = computed(() => order.value?.products.reduce((acc, curr) => acc + curr.qta, 0))

      const accordionSections: Ref<AccordionSection[]> = ref([
        {
          id: "communication",
          text: t("pages.orderDetails.tab_communication"),
          open: false
        },
        {
          id: "products",
          text: t("pages.orderDetails.tab_products", {
            qta: productsCount.value,
            total: formatCurrency(order.value?.amount ?? 0)
          }),
          open: true
        },
        {
          id: "user",
          text: t("pages.orderDetails.tab_user"),
          open: false,
        }
      ])
      const productSections: Ref<(AccordionSection & { data: OrderProduct })[]> = computed(() => {
        if (order.value) {
          return order.value.products.map((el) => {
            return {
              id: "product",//el.product._id,
              text: el.product.title + ` (x${el.qta}) = ` + formatCurrency(el.product.price * el.qta),
              open: ref(false) as any,
              data: el
            }
          })
        }

        return []
      })

      onIonViewWillEnter(async () => {
        const result = await http.api.orders.read(route.params.id as string);

        order.value = result ?? null
      })

      return {
        order,
        accordionSections, productSections,
        formatLocaleDate, formatCurrency, formatOrderStatus
      }
    }
  });
</script>

<style scoped>

</style>
