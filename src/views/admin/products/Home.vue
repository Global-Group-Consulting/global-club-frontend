<template>
  <IonPage>
    <TopToolbar>{{ $t('pages.products.title') }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <AdminSearchBar class="mb-5" has-advanced-filters
                        main-field="title" placeholder="Indica il titolo del prodotto"
                        @update:filters="onUpdateFilters">
          <template v-slot:advancedFilters="{filters}">
            <ion-row>
              <ion-col size="12" sizeMd="6">
                <FormInputV v-model="filters['categories']"
                            component="ion-select"
                            :label="$t('forms.filters.status')"
                            multiple
                            :options="categoriesOptions"></FormInputV>
              </ion-col>
              <ion-col size="12" sizeMd="6">
                <FormToggleV :label="$t('forms.products.priceUndefined')"
                             v-model="filters['priceUndefined']"
                />
              </ion-col>
            </ion-row>
          </template>

          <template v-slot:filterChip_categories="{data}">
            {{ formatCategoriesChip(data) }}
          </template>

          <template v-slot:filterChip_priceUndefined="{data}">
            {{ data.value ? "Si" : "No" }}
          </template>
        </AdminSearchBar>

        <SimpleToolbar v-if="!hasFilters">
          <template v-slot:center>
            <SimpleToolbarButton :text="$t('pages.products.btn_add')"
                                 @click="$router.push({name: 'admin.products.new'})"/>
          </template>
        </SimpleToolbar>

        <PaginatedList :paginated-data="paginatedData"
                       v-slot:default="{data}"
                       visible
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
import {computed, ComputedRef, defineComponent, watch} from 'vue';
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
import AdminSearchBar from "@/components/AdminSearchBar.vue";
import FormInputV from "@/components/forms/FormInputV.vue";
import {SelectOption} from "@/@types/Form";
import {ProductCategory} from "@/@types/ProductCategory";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";
import FormToggleV from "@/components/forms/FormToggleV.vue";
import {FilterChip} from "@/composables/filters";

export default defineComponent({
  components: {
    FormToggleV,
    FormInputV,
    AdminSearchBar, PaginatedList, TopToolbar, ProductListItem, SimpleToolbar, SimpleToolbarButton
  },
  setup() {
    const {t} = useI18n();
    const route = useRoute();
    // const router = useRouter();
    const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
    const paginatedData: Ref<PaginatedResult<any> | undefined> = ref();
    const categories: Ref<ProductCategory[]> = ref([]);
    const filters = ref({});
    const hasFilters = computed(() => Object.keys(filters.value).length > 0)

    const categoriesOptions: ComputedRef<SelectOption[]> = computed(() => {
      return categories.value.reduce((acc, curr) => {
        acc.push({
          text: curr.title,
          value: curr._id
        })

        return acc
      }, [] as SelectOption[])
    })

    async function fetchData(page?: number) {
      paginatedData.value = await http.api.products.readAll(filters.value, page);
    }

    async function onPageChanged(page: number) {
      await fetchData(page);
    }

    async function onUpdateFilters(newFilters: any) {
      if (JSON.stringify(filters.value) !== JSON.stringify(newFilters)) {
        filters.value = newFilters;
      }
    }

    function formatCategoriesChip(data: FilterChip) {
      const toReturn: string[] = [];

      if (data.value instanceof Array && categories.value) {
        data.value.forEach(id => {
          const category = categories.value.find(cat => cat._id === id)

          category && toReturn.push(category.title)
        })
      }

      let result = toReturn.join(", ");

      if(result.length > 25){
        result = result.substring(0, 25) + "..."
      }

      return result;
    }

    watch(() => filters.value, () => {
      console.log('filter changed')
      fetchData();
    }, { deep: true})

    onIonViewWillEnter(async () => {
      // Check if the query contains filters, then avoid fetching data
      if (!Object.keys(route.query).find(key => key.startsWith("filter"))) {
        await fetchData();
      }
      categories.value = (await http.api.productCategories.readAllRaw()) ?? []
    });

    return {
      paginatedData, formatImgUrl, hasFilters,
      onPageChanged, categoriesOptions, onUpdateFilters,
      formatCategoriesChip
    }
  }
})
</script>

<style scoped>

</style>
