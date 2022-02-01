<template>
  <IonPage>
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
          <ProductListItem v-for="product of productsList" :key="product._id"
                           :product="product"/>
        </ion-list>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import { inject, Ref, ref } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import ProductListItem from '@/components/lists/products/AdminProductListItem.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';

  export default defineComponent({
    components: { TopToolbar, ProductListItem, SimpleToolbar, SimpleToolbarButton },
    setup () {
      // const { t } = useI18n();
      // const router = useRouter();
      const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
      const productsList: Ref<Product[]> = ref([]);

      onIonViewWillEnter(async () => {
        const paginatedData = await http.api.products.readAll();

        productsList.value = paginatedData?.data ?? [];
      });

      return { productsList, formatImgUrl }
    }
  })
</script>

<style scoped>

</style>
