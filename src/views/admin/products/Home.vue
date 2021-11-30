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
          <ion-list>
            <AdminListItem v-for="product of productsList" :key="product._id"
                           :title="product.title"
                           :description="product.description"
                           :open-link="{ name: 'admin.products.details', params: { id: product._id || '' } }"
                           :open-link-label="$t('pages.products.btn_open')"
                           :image="product.thumbnail?.id"
            >
            </AdminListItem>
          </ion-list>
        </ion-list>
      </ion-grid>
    </ion-content>
  </ion-page>
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
  import AdminListItem from '@/components/lists/AdminListItem.vue';

  export default defineComponent({
    components: { AdminListItem, SimpleToolbar, SimpleToolbarButton },
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
