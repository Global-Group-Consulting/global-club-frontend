<template>
  <AccordionList :sections="accordionSections">
    <template v-slot:content_communication>
      <Chat :communication="order?.communication" @newMessage="onNewMessage"></Chat>
    </template>
    <template v-slot:content_products>
      <ion-list>
        <ProductListItem v-for="(prod, i) in order?.products" :key="'prod_' + i"
                         :product="prod.product"
                         :qta="prod.qta"
                         :price="prod.price">
          <template v-slot:buttons-start>
            <ClubButton only-icon icon icon-name="edit-square" version="link"
                        color="secondary" @click="editProduct(prod)"></ClubButton>
          </template>
        </ProductListItem>
      </ion-list>
    </template>
  </AccordionList>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType, ref, Ref, watch } from 'vue';
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useI18n } from 'vue-i18n';
  import { Order, OrderProduct, UpdateOrderProductDto } from '@/@types/Order';
  import { formatBrites, formatCurrency } from '@/@utilities/currency';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import Chat from '@/components/chats/Chat.vue';
  import ProductListItem from '@/components/lists/products/AdminProductListItem.vue';
  import { Communication } from '@/@types/Communication';
  import ClubButton from '@/components/ClubButton.vue';
  import { modalController } from '@ionic/vue';
  import OrderProductEditModal from '@/components/modals/OrderProductEditModal.vue';

  export default defineComponent({
    name: "OrderAccordion",
    components: { ClubButton, ProductListItem, Chat, AccordionList },
    props: {
      orderData: {
        type: Object as PropType<Order>
      },
      orderId: {
        type: String,
      }
    },
    setup (props, { emit }) {
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
          text: computed(() => t("pages.orderDetails.tab_products", {
            qta: productsCount.value ?? 0,
            total: formatBrites(order.value?.amount ?? 0)
          })),
          open: false
        },
        {
          id: "user",
          text: t("pages.orderDetails.tab_user"),
          open: false,
        }
      ])

      function onNewMessage (data: Communication) {
        if (order.value?.communication?.messages) {
          order.value.communication.messages = data.messages;
        }
      }

      async function editProduct (product: OrderProduct) {
        const modal = await modalController
            .create({
              component: OrderProductEditModal,
              componentProps: {
                title: 'Modifica prodotto',
                product: product,
                orderId: order.value?._id
              },
            })

        await modal.present();
        const result = await modal.onWillDismiss<UpdateOrderProductDto>();

        if (result.role === "ok" && result.data) {
          emit("productUpdated", result.data);
        }
      }

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
        accordionSections,
        formatLocaleDate, formatCurrency, formatOrderStatus,
        onNewMessage, editProduct
      }
    }
  });
</script>

<style scoped>

</style>
