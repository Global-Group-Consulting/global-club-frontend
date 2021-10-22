<template>
  <IonPage> Prodotti

    <ul>
      <li v-for="product of productsList" :key="product._id">
        <ion-thumbnail slot="start">
          <ion-img :src="formatImgUrl(product.thumbnail.id)"></ion-img>
        </ion-thumbnail>

        titolo:
        {{ product.title }}
      </li>
    </ul>
  </IonPage>
</template>

<script lang="ts">
  //import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { defineComponent, inject, onMounted, ref, Ref } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';

  export default defineComponent({
    name: 'ProductsList',
    setup () {
      const http = inject<HttpPlugin>('http');
      const productsList: Ref<Product[]> = ref([]);

      onMounted(async () => {
        const result = await http?.api.products.readAll() as Product[];

        productsList.value = result;
      });

      return {
        productsList,
        formatImgUrl
      };
    },
  });
</script>
