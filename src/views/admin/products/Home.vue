<template>
  <ion-page>
    <TopToolbar>{{ $t('pages.products.title') }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton :text="$t('pages.products.btn_add')"
                                 @click="$router.push({name: 'admin.products.new'})"/>
          </template>
        </SimpleToolbar>


        <ion-list>
          <ion-item v-for="product of productsList" :key="product._id">
            <ion-thumbnail slot="start">
              <img :src="formatImgUrl(product.thumbnail.id)">
            </ion-thumbnail>

            <ion-label>
              <h2>{{ product.title }}</h2>
              <h4>{{ product.description }}</h4>
            </ion-label>

            <page-link :to="{ name: 'admin.products.details', params: { id: product._id } }"
                       :btn-props="{ fill: 'outline', shape: 'round' }">
              {{ $t("pages.products.btn_open") }}
            </page-link>
          </ion-item>
        </ion-list>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import { useI18n } from 'vue-i18n';
  import { inject, onMounted, Ref, ref } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';
  import { useRouter } from 'vue-router';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import { onIonViewWillEnter } from '@ionic/vue';

  export default defineComponent({
    components: { SimpleToolbar, SimpleToolbarButton },
    setup () {
      // const { t } = useI18n();
      // const router = useRouter();
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const productsList: Ref<Product[]> = ref([]);

      /*     function resolveUrl () {
             const val = router.resolve({
               name: 'admin.products.details',
               params: { id: 'asdasd' }
             });

             return val;
           }

           resolveUrl();*/

      onIonViewWillEnter(async () => {
        const result = await http.api.products.readAll();

        productsList.value = result;
      });

      return { productsList, formatImgUrl }
    }
  })
</script>

<style scoped>

</style>
