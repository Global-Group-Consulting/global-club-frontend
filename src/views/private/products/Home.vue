<template>
  <IonPage>
    <TopToolbar>Prodotti</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <div class="mb-5">
          <SearchBar v-model:filters="activeFilters"></SearchBar>
        </div>

        <ion-row v-if="productsList.length > 0">
          <ion-col size-lg="3" size-md="4" size="6" v-for="product of productsList" :key="product._id">
            <PrivateProductCardItem :product="product" class="m-0 h-100"/>
          </ion-col>
        </ion-row>

        <NoData v-else></NoData>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref, watch } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import PrivateProductCardItem from '@/components/lists/products/PrivateProductCardItem.vue';
  import SearchBar, { SearchFilters } from '@/views/shared/SearchBar.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { PaginatedResult } from '@/@types/Pagination';
  import Filters from '@/composables/filters';
  import NoData from "@/components/NoData.vue";

  export default defineComponent({
    name: 'Home',
    components: {NoData, SearchBar, PrivateProductCardItem, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>('http');
      const route = useRoute();
      const router = useRouter();
      const productsList: Ref<Product[]> = ref([]);
      const fetchingResult: Ref<PaginatedResult | undefined> = ref();
      const activeFilters: Ref<SearchFilters> = ref({});
      const filtersComposable = Filters()

      function getQueryFilters (): Record<string, string> {
        return Object.keys(route.query).reduce((acc, curr) => {
          if (curr.indexOf("filter") === 0) {
            acc[curr] = route.query[curr]
          }

          return acc;
        }, {})
      }

      async function fetchData (filters: SearchFilters) {
        const formattedFilters = filtersComposable.prepareFilters(filters)
        const result = await http?.api.products.readAll(formattedFilters);

        fetchingResult.value = result;
        productsList.value = result?.data ?? [];
      }

      watch(() => activeFilters.value, (filters: SearchFilters) => {
        router.replace({ query: filtersComposable.prepareFilters(filters) })

        fetchData(filters);
      })

      onIonViewWillEnter(async () => {
        const queryParams = getQueryFilters();

        activeFilters.value = Object.entries(queryParams).reduce((acc, curr) => {
          const field = curr[0].slice(curr[0].indexOf("[") + 1, curr[0].indexOf("]"));
          acc[field] = curr[1];

          return acc
        }, {} as SearchFilters);

        // avoid calling the fetch method because this will be called by the watcher
        // await fetchData(activeFilters.value);
      });

      return {
        productsList,
        activeFilters,
        formatImgUrl,
      };
    },
  });
</script>
