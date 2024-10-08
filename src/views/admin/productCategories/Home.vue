<template>
  <ion-page>
    <TopToolbar>{{ t('pages.productCategories.title') }}</TopToolbar>

    <ion-content>
      <!-- must use fixed to prevent container from beeing too large -->
      <ion-grid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton
                :text="t('pages.productCategories.btn_add')"
                @click="$router.push({ name: 'admin.productCategories.new' })"
            />
          </template>
        </SimpleToolbar>

        <PaginatedList :paginated-data="paginatedData"
                       v-if="paginatedData?.data.length > 0"
                       v-slot:default="{data}"
                       @pageChanged="onPageChanged">
          <ion-list>
            <page-link v-for="category of data" :key="category._id"
                       :to="{ name: 'admin.productCategories.details',
                              params: { id: category._id },
                            }" only-container>
              <template v-slot:default="{href, navigate}">
                <ion-item button detail :href="href" @click="navigate">
                  <ion-thumbnail slot="start">
                    <Image :file-id="category.thumbnail?.id"/>
                  </ion-thumbnail>

                  <ion-label>
                    <h2 class="ion-item-title">{{ category.title }}</h2>
                    <h3 class="ion-item-subtitle">{{ category.description }}</h3>
                    <div v-if="category.parent">Categoria: {{ category.level }} -
                      <strong>{{ category.parent?.title }}</strong></div>
                  </ion-label>
                </ion-item>
              </template>
            </page-link>
          </ion-list>
        </PaginatedList>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue'
import { useI18n } from 'vue-i18n'
import { defineComponent, inject, Ref, ref } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { formatImgUrl } from '@/@utilities/images'
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue'
import { onIonViewWillEnter } from '@ionic/vue'
import Image from '@/components/Image.vue'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { PaginatedResult } from '@/@types/Pagination'
import PageLink from '@/components/PageLink.vue'

export default defineComponent({
  components: { PageLink, PaginatedList, Image, SimpleToolbar, SimpleToolbarButton },
  setup () {
    const { t } = useI18n()
    const http = inject<HttpPlugin>('http') as HttpPlugin

    const paginatedData: Ref<PaginatedResult | undefined> = ref()

    async function onPageChanged (page: number) {
      paginatedData.value = await http.api.productCategories.readAll({ page: page.toString() })
    }

    onIonViewWillEnter(async () => {
      paginatedData.value = await http.api.productCategories.readAll({})
    })

    return { t, paginatedData, formatImgUrl, onPageChanged }
  }
})
</script>


<style scoped>
</style>
