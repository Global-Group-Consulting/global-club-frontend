<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.orderDetails.title', { number: order?._id }) }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        
        
        <AccordionList :sections="accordionSections">
          <template v-slot:content_communication>
            <Chat :communication="order?.communication"></Chat>
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
  import Chat from '@/components/chats/Chat.vue';
import DashboardVue from '@/views/private/Dashboard.vue';

  export default defineComponent({
    name: "Details",
    components: { Chat, AccordionList, SimpleToolbarButton, SimpleToolbar, TopToolbar },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const route = useRoute()
      const { t } = useI18n()
      const order: Ref<Order | null> = ref(null)
      const accordionSections = ref([
        {
          id: "anagrafici",
          text: t("pages.orderDetails.tab_anagrafici"),
          open: true,
          desc:"gerta habibi",
          html: '<ion-button color="success">Success</ion-button>'
          
        },
        {
          id: "nascita",
          text: t("pages.orderDetails.tab_nascita"),
          open: false,
          desc:"gerta"
        },
        {
          id: "residenza",
          text: t("pages.orderDetails.tab_residenza"),
          open: false,
          desc:"habibi"
        },
        {
          id: "contatti",
          text: t("pages.orderDetails.tab_contatti"),
          open: false,
          desc:"testoooo"
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
