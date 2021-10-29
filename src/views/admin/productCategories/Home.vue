<template>
  <ion-page>
    <TopToolbar>{{ t("pages.productCategories.title") }}</TopToolbar>

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

        <ion-list>
          <ion-item v-for="category of categoriesList" :key="category._id">
            <ion-thumbnail slot="start">
              <img :src="formatImgUrl(category.thumbnail?.id)" />
            </ion-thumbnail>

            <ion-label>
              <h2>{{ category.title }}</h2>
              <h3>{{ category.description }}</h3>
            </ion-label>

            <page-link
              :to="{
                name: 'admin.productCategories.details',
                params: { id: category._id },
              }"
              :btn-props="{ fill: 'outline', shape: 'round' }"
            >
              {{ t("pages.productCategories.btn_open") }}
            </page-link>
          </ion-item>
        </ion-list>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import SimpleToolbar from "@/components/toolbars/SimpleToolbar.vue";
import { useI18n } from "vue-i18n";
import { defineComponent, inject, onMounted, Ref, ref } from "vue";
import { HttpPlugin } from "@/plugins/HttpPlugin";
import { ProductCategory } from "@/@types/ProductCategory";
import { formatImgUrl } from "@/@utilities/images";
import SimpleToolbarButton from "@/components/toolbars/SimpleToolbarButton.vue";
import { onIonViewDidEnter, onIonViewWillEnter } from "@ionic/vue";

export default defineComponent({
  components: { SimpleToolbar, SimpleToolbarButton },
  setup() {
    const { t } = useI18n();
    const http = inject<HttpPlugin>("http");

    const categoriesList: Ref<ProductCategory[]> = ref([]);

    onIonViewWillEnter(async () => {
      const data: ProductCategory[] | undefined =
        await http?.api.productCategories.readAll();

      data && (categoriesList.value = data);
    });

    return { t, categoriesList, formatImgUrl };
  },
});
</script>


<style scoped>
</style>
