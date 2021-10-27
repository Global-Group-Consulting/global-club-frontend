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
      <ion-col size="6">
        <form-file-previewer v-model="formData.images"
                             :remote-images="currentProduct ? currentProduct['images'] : null"
                             :label="t('forms.products.images')"
                             :multiple="true"
                             @delete="onImageDeleteClick"/>
      </ion-col>
      <ion-col size="6">
        <form-file-previewer v-model="formData.thumbnail"
                             :remote-images="currentProduct ? currentProduct['thumbnail'] : null"
                             :max-images="1"
                             :label="t('forms.products.thumbnail')"
                             @delete="onImageDeleteClick"/>
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="6">
        <FormInput :label="t('forms.products.title')" v-model="formData.title"/>

        <FormInput :label="t('forms.products.description')" v-model="formData.description"/>
      </ion-col>

      <ion-col size="6">
        <FormInput :label="t('forms.products.price')" v-model="formData.price"/>
        <FormInput :label="t('forms.products.categories')" v-model="formData.categories"
                   component="ion-select"
                   :multiple="true"
                   :options="categoryOptionsList"/>
        <!--        <FormInput :label="t('forms.products.tags')" v-model="formData.tags" component="ion-select"/>-->
      </ion-col>
    </ion-row>

    <ion-row>
      <ion-col size="4" offset="4">
        <ion-button @click="onSubmitClick">
          {{ t('forms.products.' + (currentProduct ? "btnUpdate" : "btnCreate")) }}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>

</template>

<script lang="ts" setup>
  import { computed, inject, onMounted, reactive, ref, Ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { Product } from '@/@types/Product';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import FormInput from '@/components/forms/FormInput.vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import FormFilePreviewer from '@/components/forms/FormFilePreviewer.vue';
  import { CreateProductDto } from '@/views/admin/products/dto/create.product.dto';
  import { UpdateProductDto } from '@/views/admin/products/dto/update.product.dto';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { Attachment, NewAttachmentFile } from '@/@types/Attachment';

  const { t } = useI18n();
  const route = useRoute();
  const http = inject<HttpPlugin>('http') as HttpPlugin;
  const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;

  const currentProduct: Ref<Product | undefined> = ref()
  const categoriesList: Ref<ProductCategory[]> = ref([])

  const formData = reactive<CreateProductDto | UpdateProductDto>({
    title: '',
    description: '',
    price: undefined,
    tags: [],
    categories: [],
    thumbnail: undefined,
    images: [],
  });

  const categoryOptionsList = computed(() => {
    return categoriesList.value.map(el => ({
      text: el.title,
      value: el._id
    }))
  })

  async function onSubmitClick () {
    let result: Product | undefined;

    if (currentProduct.value) {
      const newData = { ...formData }

      if (!newData.thumbnail) {
        delete newData.thumbnail
      }

      result = await http?.api.products.update(newData, currentProduct.value._id);
    } else {
      result = await http?.api.products.create(formData as CreateProductDto);
    }

    if (result) {
      currentProduct.value = result;
    }
  }

  async function onImageDeleteClick (image: Attachment) {
    if (!currentProduct.value) {
      return;
    }

    const alertResult = await alerts.ask({
      header: t('alerts.productCategories.deleteThumbnail.title'),
      message: t('alerts.productCategories.deleteThumbnail.message', { imageName: image.fileName }),
      buttonCancelText: t('alerts.productCategories.deleteThumbnail.buttonCancel'),
      buttonOkText: t('alerts.productCategories.deleteThumbnail.buttonOk'),
    });

    if (alertResult) {
      const result = await http.api.products.deleteFile(currentProduct.value._id, image.id);

      if (result) {
        currentProduct.value = result;
      }
    }
  }

  function mergeInFormData (data: Product) {
    formData.title = data.title;
    formData.description = data.description;
    formData.price = data.price;
    formData.tags = data.tags;
    formData.categories = data.categories ? data.categories.reduce((acc, curr) => {
      acc.push(curr._id)
      return acc
    }, [] as any) : [];
    formData.thumbnail = undefined;
    formData.images = [];
  }

  watch(() => currentProduct.value, (value) => {
    mergeInFormData(value as Product)
  })

  onMounted(async () => {
    categoriesList.value = await http.api.productCategories.readAll();

    if (route.params.id) {
      const data: Product | undefined = await http.api.products.read(route.params.id as string);

      if (data) {
        currentProduct.value = data;
      }
    }
  });

</script>
