<template>
  <TopToolbar include-back>{{ t('pages.productDetails.title') }}</TopToolbar>

  <ion-grid fixed>
    <SimpleToolbar>
      <template v-slot:center>
        <!--        <SimpleToolbarButton :text="'aaa'"
                                     @click="$router.push({name: 'admin.products.new'})"/>-->
      </template>
    </SimpleToolbar>

    <ion-row>
      <ion-col size="4">
        <FormInput label="Titolo" v-model="formData.title"/>

        <FormInput label="Description" v-model="formData.description"/>
      </ion-col>

      <ion-col size="4">
        <input type="file" @change="onFileChange($event, 'images')">
        <input type="file" @change="onFileChange($event, 'thumbnail')">
        <!--        <FormInput label="Immagini" type="file"/>
                <FormInput label="Anteprima"/>-->
      </ion-col>

      <ion-col size="4">
        <FormInput label="Prezzo" v-model="formData.price"/>
        <FormInput label="Categoria" v-model="formData.categories"/>
        <FormInput label="Tags" v-model="formData.tags"/>
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
  import { inject, reactive} from 'vue';
  import { Product } from '@/@types/Product';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();
  const http = inject<HttpPlugin>('http');

  const formData = reactive<Product>({
    title: '',
    description: '',
    price: null,
    tags: '',
    categories: '',
    thumbnail: '',
    images: '',
  });

  function onSubmitClick () {
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (['categories', 'images'].includes(key)) {
        formDataToSend.append(key + '[]', formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    http?.api.products.create(formDataToSend);
  }

  function onFileChange (e: InputEvent, target: any) {
    formData[target] = e.target.files[0];
  }
</script>
