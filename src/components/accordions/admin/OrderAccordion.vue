<template>
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
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType, ref, Ref, watch } from 'vue';
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useI18n } from 'vue-i18n';
  import { Order, OrderProduct } from '@/@types/Order';
  import { formatCurrency } from '@/@utilities/currency';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import Chat from '@/components/chats/Chat.vue';

  export default defineComponent({
    name: "OrderAccordion",
    components: { Chat, AccordionList },
    props: {
      orderData: {
        type: Object as PropType<Order>
      },
      orderId: {
        type: String,
      }
    },
    setup (props) {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
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

      watch(() => props.orderId, async (orderId) => {
        if (!orderId) {
          return
        }

        const result = await http.api.orders.read(orderId);

        order.value = result ?? null
      }, { immediate: true })
      watch(() => props.orderData, (newOrder) => {
        if (!newOrder) {
          return
        }
        order.value = newOrder
      }, { immediate: true })

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
