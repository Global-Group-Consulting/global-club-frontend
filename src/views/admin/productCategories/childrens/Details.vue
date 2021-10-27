<template>
  <TopToolbar include-back>{{ t('pages.productCategoryDetails.title') }}</TopToolbar>

  <ion-grid fixed>
    <SimpleToolbar>
      <template v-slot:center>
        <SimpleToolbarButton :text="'Elimina'"/>
      </template>
    </SimpleToolbar>

    <ion-row>
      <ion-col>
        <form-file-previewer v-model="formData.thumbnail"
                             :remote-images="currentCategory ? currentCategory['thumbnail'] : null"
                             :max-images="1"
                             :label="t('forms.productCategories.thumbnail')"
                             @delete="onImageDeleteClick"/>
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
      <ion-col size="4" offset="4">
        <ion-button @click="onSubmitClick">
          {{ t('forms.productCategories.' + (currentCategory ? "btnUpdate" : "btnCreate")) }}
        </ion-button>
      </ion-col>
    </ion-row>


  </ion-grid>

</template>

<script lang="ts" setup>
  import { inject, onMounted, reactive, Ref, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { Attachment } from '@/@types/Attachment';
  import { ProductCategory } from '@/@types/ProductCategory';
  import FormInput from '@/components/forms/FormInput.vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import FormFilePreviewer from '@/components/forms/FormFilePreviewer.vue';
  import { CreateProductCategoryDto } from '@/views/admin/productCategories/dto/create.product.category.dto';
  import { UpdateProductCategoryDto } from '@/views/admin/productCategories/dto/update.product.category.dto';

  const { t } = useI18n();
  const route = useRoute();
  const http = inject<HttpPlugin>('http') as HttpPlugin;
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;

  const currentCategory: Ref<ProductCategory | undefined> = ref();

  const formData = reactive<CreateProductCategoryDto | UpdateProductCategoryDto>({
    title: '',
    description: '',
    thumbnail: undefined,
  });

  /**
   * On submit click, i must check if i need to update or to create a new category
   */
  async function onSubmitClick () {
    let result: ProductCategory | undefined;

    if (currentCategory.value) {
      result = await http?.api.productCategories.update(formData, currentCategory.value._id);
    } else {
      result = await http?.api.productCategories.create(formData as CreateProductCategoryDto);
    }

    if (result) {
      currentCategory.value = result;
    }
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
      const result = await http.api.productCategories.deleteThumbnail(currentCategory.value._id);

      if (result) {
        currentCategory.value = result;
      }
    }
  }

  function mergeInFormData (data: ProductCategory) {
    formData.title = data.title;
    formData.description = data.description;
    formData.thumbnail = undefined
  }

  watch(() => currentCategory.value, (value) => {
    mergeInFormData(value as ProductCategory)
  })

  onMounted(async () => {
    if (route.params.id) {
      const data: ProductCategory | undefined = await http.api.productCategories.read(route.params.id as string);

      if (data) {
        currentCategory.value = data;
      }
    }
  });
</script>
