<template>
  <TopToolbar></TopToolbar>

  <!-- must use fixed to prevent contianer from beeing too large -->
  <ion-grid fixed>
    <SimpleToolbar>
      <template v-slot:center>
        <ion-button @click="$router.push({name: 'admin.productCategories.new'})">
          {{ t("pages.products.btn_add") }}
        </ion-button>
      </template>
    </SimpleToolbar>


    <ion-list>

      <ion-item v-for="(category) of categoriesList" :key="category._id">
        <ion-thumbnail slot="start">
          <img :src="formatImgUrl(category.thumbnail.id)">
        </ion-thumbnail>

        <ion-label>
          <h2>{{ category.title }}</h2>
          <h3>{{ category.description }}</h3>
        </ion-label>

        <ion-button slot="end"
                    @click="$router.push({
                      name: 'admin.productCategories.details',
                      params: {id: category._id}
                    })">
          Apri
        </ion-button>

      </ion-item>
    </ion-list>
  </ion-grid>
</template>

<script lang="ts" setup>
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import { useI18n } from 'vue-i18n';
  import { inject, onMounted, Ref, ref } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';

  const { t } = useI18n();
  const http = inject<HttpPlugin>('http');

  const categoriesList: Ref<ProductCategory[]> = ref([]);

  onMounted(async () => {
    const result: ProductCategory[] = await http?.api.productCategories.readAll();

    categoriesList.value = result;
  });
</script>

<style scoped>

</style>
