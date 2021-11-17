<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.orderDetails.title', { number: order?._id }) }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>

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

  export default defineComponent({
    name: "Details",
    components: { TopToolbar },
    setup () {
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const route = useRoute()
      const order: Ref<Order | null> = ref(null)

      onIonViewWillEnter(async () => {
        const result = await http.api.orders.read(route.params.id as string);

        order.value = result ?? null
      })

      return { order }
    }
  });
</script>

<style scoped>

</style>
