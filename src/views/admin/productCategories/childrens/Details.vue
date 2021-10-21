<template>
  <TopToolbar></TopToolbar>

  <ion-grid class="form" fixed>

    <ion-row>
      <ion-col size="4">
        <FormInput label="Titolo" v-model="formData.title"/>

        <FormInput label="Description" v-model="formData.description"/>
      </ion-col>

      <ion-col size="4">
        <ion-thumbnail>
          <img :src="formatImgUrl(formData.thumbnail.id)" alt="">
        </ion-thumbnail>
        <input type="file" @change="onFileChange($event, 'thumbnail')">
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="4">
        <ion-button @click="onSubmitClick">Invia</ion-button>
      </ion-col>
    </ion-row>


  </ion-grid>

</template>

<script lang="ts" setup>
  import FormInput from '@/components/forms/FormInput.vue';
  import { inject, onMounted, reactive } from 'vue';
  import { Product } from '@/@types/Product';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { formatImgUrl } from '@/@utilities/images';

  const http = inject<HttpPlugin>('http');
  const route = useRoute();

  const formData = reactive<Product>({
    title: '',
    description: '',
    thumbnail: '',
  });

  function onSubmitClick () {
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    http?.api.productCategories.create(formDataToSend);
  }

  function onFileChange (e: InputEvent, target: any) {
    formData[target] = e.target.files[0];
  }

  onMounted(async () => {
    if (route.params.id) {
      const data: ProductCategory = await http?.api.productCategories.read(route.params.id);

      Object.assign(formData, data);
    }
  });
</script>
