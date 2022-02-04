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

        <PaginatedList :paginated-data="paginatedData"
                       v-if="paginatedData?.data.length > 0"
                       v-slot:default="{data}"
                       @pageChanged="onPageChanged">
          <ion-list>
            <ProductListItem v-for="product of data" :key="product._id"
                             :product="product"/>
          </ion-list>
        </PaginatedList>


      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
import {inject, Ref, ref} from 'vue';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {formatImgUrl} from '@/@utilities/images';
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
import {onIonViewWillEnter} from '@ionic/vue';
import ProductListItem from '@/components/lists/products/AdminProductListItem.vue';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import PaginatedList from "@/components/lists/PaginatedList.vue";
import {PaginatedResult} from "@/@types/Pagination";

export default defineComponent({
  components: {PaginatedList, TopToolbar, ProductListItem, SimpleToolbar, SimpleToolbarButton},
  setup() {
    // const { t } = useI18n();
    // const router = useRouter();
    const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
    const paginatedData: Ref<PaginatedResult<any> | undefined> = ref();

    async function onPageChanged(page: number) {
      paginatedData.value = await http.api.products.readAll({page: page.toString()});
    }

    onIonViewWillEnter(async () => {
      paginatedData.value = await http.api.products.readAll();
    });

    return {
      paginatedData, formatImgUrl,
      onPageChanged
    }
  }
})
</script>

<style scoped>

</style>
