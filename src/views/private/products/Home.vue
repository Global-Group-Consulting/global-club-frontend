<template>
  <IonPage>
    <TopToolbar>Prodotti</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <div class="mb-5">
          <search-bar></search-bar>
        </div>

        <ion-row>
          <ion-col size-lg="3" size-md="4" size="6" v-for="product of productsList" :key="product._id">
            <PrivateProductCardItem :product="product" class="m-0 h-100"/>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import PrivateProductCardItem from '@/components/lists/products/PrivateProductCardItem.vue';
  import SearchBar from '@/views/shared/SearchBar.vue';

  export default defineComponent({
    name: 'ProductsList',
    components: { SearchBar, PrivateProductCardItem, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>('http');
      const productsList: Ref<Product[]> = ref([]);

      onIonViewWillEnter(async () => {
        const result = await http?.api.products.readAll();

        productsList.value = result?.data ?? [];
      });

      return {
        productsList,
        formatImgUrl
      };
    },
  });
</script>
