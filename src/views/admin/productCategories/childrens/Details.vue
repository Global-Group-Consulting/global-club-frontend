<template>
  <TopToolbar include-back>{{ t('pages.productCategoryDetails.title') }}</TopToolbar>

  <ion-grid fixed>
    <SimpleToolbar>
      <template v-slot:center>
        <SimpleToolbarButton :text="'Elimina'"
                             @click="onCategoryDeleteClick"/>
      </template>
    </SimpleToolbar>

    <ion-row>
      <ion-col>
        <form-file-previewer v-model="formData.thumbnail"
                             @delete="onImageDeleteClick"
                             :max-images="1"
                             :label="t('forms.productCategories.thumbnail')"></form-file-previewer>

        <!--        <ion-thumbnail>
                  <img :src="formatImgUrl(formData.thumbnail.id)" alt="">
                </ion-thumbnail>
                -->
        <!--        <form-upload></form-upload>-->

        <!--        <input type="file" @change="onFileChange($event, 'thumbnail')">-->
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="6">
        <FormInput :label="t('forms.productCategories.title')" v-model="formData.title"/>
      </ion-col>

      <ion-col size="6">
        <FormInput :label="t('forms.productCategories.description')" v-model="formData.description"/>
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
  import { inject, onMounted, reactive, Ref, ref } from 'vue';
  import { Product } from '@/@types/Product';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { useI18n } from 'vue-i18n';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import FormFilePreviewer from '@/components/forms/FormFilePreviewer.vue';
  import { Attachment } from '@/@types/Attachment';
  import { AlertsPlugin } from '@/plugins/Alerts';

  interface ProductCreateDto extends Pick<Product, "title" | "description"> {
    thumbnail: Attachment | null;
  }

  const http = inject<HttpPlugin>('http') as HttpPlugin;
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
  const route = useRoute();
  const { t } = useI18n();

  const currentCategory: Ref<ProductCategory | null> = ref(null);

  const formData = reactive<ProductCreateDto>({
    title: '',
    description: '',
    thumbnail: null,
  });

  function onSubmitClick () {
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    http?.api.productCategories.create(formDataToSend);
  }

  function onFileChange (e: InputEvent, target: any) {
    // formData[target] = e.target.files[0];
  }

  async function onImageDeleteClick (image: Attachment) {
    if (!currentCategory.value) {
      return;
    }

    const alertResult = await alerts.ask({
      header: t('alerts.productCategories.deleteThumbnail.title'),
      message: t('alerts.productCategories.deleteThumbnail.message', { imageName: image.fileName }),
      buttonCancelText: t('alerts.productCategories.deleteThumbnail.buttonCancel'),
      buttonOkText: t('alerts.productCategories.deleteThumbnail.buttonOk'),
    });

    if (alertResult) {
      try {
        await http.api.productCategories.deleteThumbnail(currentCategory.value._id);
      }catch (er){
        console.log(er)

      }
    }
  }

  async function onCategoryDeleteClick () {
    /* const alertResult = await alerts.ask({
       header: 'Cancellare l\'immagine?',
       message: `Continuando, l'immagine <strong>${image.fileName}</strong> verrà cancellata in modo irreversibile.`,
       buttonCancelText: 'Annulla',
       buttonOkText: 'Si, cancella',
     });

     if (alertResult) {
       await http.api.productCategories.deleteThumbnail(currentCategory.value._id);
     }*/
  }

  onMounted(async () => {
    if (route.params.id) {
      const data: ProductCategory = await http.api.productCategories.read(route.params.id as string);

      currentCategory.value = data;
      Object.assign(formData, data);
    }
  });
</script>
