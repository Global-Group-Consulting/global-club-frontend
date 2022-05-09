<template>
  <IonPage>
    <TopToolbar>Prodotti</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <div class="mb-5">
          <SearchBar :filters="searchFilters"
                     @update:filters="onSearchUpdate"
                     @remove:filters="onSearchRemove"
                     :chips-to-ignore="['categories', 'level']"></SearchBar>
        </div>

        <!------------------------------------------------------------->
        <!-- Categorie -->
        <!------------------------------------------------------------->
        <!--        <h2>Categorie Disponibili</h2>-->

        <div class="breadcrumbs-container">
          <template v-for="(breadcrumb, i) in categoryBreadcrumbs"
                    :key="breadcrumb.level">
            <ion-chip @click="onBreadcrumbClick(breadcrumb)"
                      color="primary"
                      :disabled="i === categoryBreadcrumbs.length-1">
              {{ breadcrumb?.title ?? 'Tutte le categorie' }}
            </ion-chip>

            <Icon name="chevron-right" v-if="i < categoryBreadcrumbs.length-1"/>
          </template>
        </div>

        <Swiper :slidesPerView="2"
                :centeredSlides="false"
                :spaceBetween="$store.getters['smAndDown'] ? 8: 16"
                :allowTouchMove="true"
                :simulate-touch="false"
                :scrollbar="{draggable: true }"
                :mousewheel="true"
                :modules="[Scrollbar]"
                @swiper="onSwiper">
          >
          <swiper-slide class="statistics-card-wrapper"
                        v-for="category of activeCategories" :key="category._id"
          >
            <a class="product-category-card"
               href="#"
               @click.prevent="onCategoryClick(category)">

              <div class="product-category-card-img">
                <Image :file-id="category.thumbnail?.id" class="w-100"
                       aspect-ratio="3/2"/>
              </div>

              <div class="product-category-card-title">{{ category.title }}</div>
            </a>
          </swiper-slide>
        </Swiper>

        <!------------------------------------------------------------->
        <!-- Prodotti -->
        <!------------------------------------------------------------->
        <h2 class="mt-5">Prodotti</h2>

        <PaginatedList :paginated-data="paginatedProductsList"
                       v-slot:default="{data}"
                       :no-data-text="categoryBreadcrumbs.length <= 1 ? 'Scegliere una categoria o cercare un prodotto per titolo per iniziare' : null"
                       @pageChanged="onPageChanged">
          <ion-row>
            <ion-col size-lg="3" size-md="4" size="6" v-for="product of data" :key="product._id">
              <PrivateProductCardItem :product="product" class="m-0 h-100"/>
            </ion-col>
          </ion-row>
        </PaginatedList>

      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, nextTick, Ref, ref, watch } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { onIonViewWillEnter } from '@ionic/vue'
import { ProductCategory } from '@/@types/ProductCategory'
import Image from '@/components/Image.vue'
import { Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import SearchBar from '@/components/SearchBar.vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { PaginatedResult } from '@/@types/Pagination'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import PrivateProductCardItem from '@/components/lists/products/PrivateProductCardItem.vue'
import Filters from '@/composables/filters'
import Icon from '@/components/Icon.vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'ProductsByCategory',
  components: {
    Icon,
    PrivateProductCardItem,
    PaginatedList,
    TopToolbar,
    SearchBar,
    Image, Swiper,
    SwiperSlide
  },

  setup () {
    const categoriesSwiper = ref()
    const store = useStore(storeKey)
    const http = inject('http') as HttpPlugin
    const route = useRoute()
    const router = useRouter()
    const filtersComposable = Filters()

    const categoriesList: Ref<ProductCategory[]> = ref([])
    const searchFilters: Ref<any> = ref({})
    const paginatedProductsList: Ref<PaginatedResult | undefined> = ref()

    /**
     * Computed that returns the filtered categories based on the query params
     */
    const activeCategories = computed(() => {
      const categoryToSearch = queryFilters.value.categories

      if (!categoryToSearch) {
        return categoriesList.value.filter(category => category.level === 0)
      }

      return categoriesList.value.filter(category => {
        return category.parent?._id === categoryToSearch
      })
    })

    /**
     * Computed that returns the active filters as a linear object
     * and removes the "filter" prefix for each key
     *
     * @return {Record<'title' | 'categories' | 'level', any>}
     */
    const queryFilters: ComputedRef<Record<'title' | 'categories' | 'level', any>> = computed(() => {
      return Object.entries(route.query).reduce((acc, curr) => {
        const field: string = curr[0].slice(curr[0].indexOf('[') + 1, curr[0].indexOf(']'))

        acc[field] = curr[1]

        return acc
      }, {} as any)
    })

    /**
     * Returns an array of categories path starting from the current one
     */
    const categoryBreadcrumbs = computed(() => {
      const toReturn: ProductCategory[] = []
      let parent = queryFilters.value.categories

      while (parent) {
        const parentCat = categoriesList.value.find(category => category._id === parent)

        if (!parentCat) {
          parent = null

          break
        }

        parent = parentCat.parent?._id
        toReturn.unshift(parentCat)
      }

      // Always add the root category
      toReturn.unshift({
        _id: '',
        title: 'Tutte le categorie',
        level: 0,
        description: '',
        parent: null,
        thumbnail: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })

      return toReturn
    })

    /**
     * Fetch products list based on the current query params
     * @param {number} page
     */
    async function fetchProducts (page = 1) {
      const filters = filtersComposable.prepareFilters(queryFilters.value)

      if (!queryFilters.value.categories && !queryFilters.value.title) {
        paginatedProductsList.value = undefined

        return
      }

      if (queryFilters.value.categories) {
        // Cerco tutte le sotto categorie partendo dalla categoria attuale
        const childs = categoriesList.value.filter(category => category.parent?._id === queryFilters.value.categories)
        const childsList: string[] = [queryFilters.value.categories]

        let index = 0

        while (index < childs.length) {
          const category = childs[index]
          childsList.push(category._id)

          const subChilds = categoriesList.value.filter(subCat => subCat.parent?._id === category._id)

          if (subChilds.length > 0) {
            childs.push(...subChilds)
          }

          index++
        }

        filters[`filter[categories]`] = childsList
      }

      paginatedProductsList.value = await http.api.products.readAll(filters, page)
    }

    /**
     * Adds to query params the filters to be used for the search
     * @param {Record<string, any>} filter
     */
    function addQueryFilters (filter: Record<string, any>) {
      const newFilters = { ...route.query }

      Object.entries(filter).forEach(entry => {
        const key = entry[0]
        const value = entry[1]

        if (!value) {
          delete newFilters[`filter[${key}]`]
          return
        }

        newFilters[`filter[${key}]`] = value
      })

      router.push({
        query: newFilters
      })

      nextTick(() => {
        setTimeout(() => {
          categoriesSwiper.value?.update()
        }, 100)
      })
    }

    /**
     * When clicking on a category, it adds the filter to the query params
     */
    function onCategoryClick (category: ProductCategory) {
      addQueryFilters({ categories: category._id })
    }

    /**
     * When clicking on a breadcrumb, updates the category filters by setting the new parent
     * based on the clicked breadcrumb
     */
    function onBreadcrumbClick (breadcrumb: any) {
      addQueryFilters({ categories: breadcrumb._id })
    }

    function onPageChanged (page: number) {
      fetchProducts(page)
    }

    function onSearchUpdate (filters) {
      addQueryFilters(filters)
    }

    function onSearchRemove (key: string) {
      addQueryFilters({ [key]: '' })
    }

    function onSwiper (swiper: any) {
      categoriesSwiper.value = swiper
    }

    onIonViewWillEnter(async () => {
      categoriesList.value = (await http.api.productCategories.readAllRaw()) ?? []
    })

    watch(() => queryFilters.value, (value) => {
      searchFilters.value = value

      fetchProducts()
    }, {
      deep: true,
      immediate: true
    })

    return {
      activeCategories,
      paginatedProductsList,
      categoryBreadcrumbs, searchFilters,
      onPageChanged, onCategoryClick, onBreadcrumbClick,
      onSearchUpdate, onSearchRemove,
      Scrollbar,
      categoriesSwiper, onSwiper
    }

  }
})
</script>

<style scoped lang="scss">
.product-category-card {
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  display: inline-block;

  .product-category-card-img {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .product-category-card-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(var(--ion-color-secondary-rgb), 0.6);
    backdrop-filter: blur(10px);
    padding: .4rem .4rem;
    color: white;
  }

  @media screen and (max-width: 575.98px) {
    .product-category-card-title {
      font-size: .8rem;
    }
  }
}
</style>
