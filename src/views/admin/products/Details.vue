<template>
  <ion-page>
    <TopToolbar include-back>{{ $t('pages.productDetails.title') }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton v-if="currentProduct"
                                 :text="$t('pages.productDetails.btn_delete')"
                                 @click="onDeleteClick"/>
          </template>
        </SimpleToolbar>

        <ion-row>
          <ion-col size="6">
            <FormFiles v-model="formData.images"
                       :remote-images="currentProduct ? currentProduct['images'] : null"
                       :label="$t('forms.products.images')"
                       :multiple="true"
                       @delete="onImageDeleteClick"/>
          </ion-col>
          <ion-col size="6">
            <FormFiles v-model="formData.thumbnail"
                       :remote-images="currentProduct ? currentProduct['thumbnail'] : null"
                       :max-images="1"
                       :label="$t('forms.products.thumbnail')"
                       @delete="onImageDeleteClick"/>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6">
            <FormInput :label="$t('forms.products.title')" v-model="formData.title"/>

            <FormInput :label="$t('forms.products.description')" v-model="formData.description"
                       component="ion-textarea"/>
          </ion-col>

          <ion-col size="6">
            <FormInput :label="$t('forms.products.price')" v-model="formData.price"/>
            <FormInput :label="$t('forms.products.categories')" v-model="formData.categories"
                       component="ion-select"
                       :multiple="true"
                       :options="categoryOptionsList"/>
            <!--        <FormInput :label="$t('forms.products.tags')" v-model="formData.tags" component="ion-select"/>-->
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="4" offset="4">
            <ion-button @click="onSubmitClick">
              {{ $t('forms.products.' + (currentProduct ? "btnUpdate" : "btnCreate")) }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, reactive, ref, Ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { Product } from '@/@types/Product';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import FormInput from '@/components/forms/FormInput.vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import FormFiles from '@/components/forms/FormFiles.vue';
  import { CreateProductDto } from '@/views/admin/products/dto/create.product.dto';
  import { UpdateProductDto } from '@/views/admin/products/dto/update.product.dto';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { Attachment } from '@/@types/Attachment';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';

  export default defineComponent({
    components: { SimpleToolbarButton, FormInput, SimpleToolbar, FormFiles },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const router = useRouter();
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

      /**
       * On submit click, check if must be created a new product or just updated
       */
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

      /**
       * Delete a single image
       */
      async function onImageDeleteClick (image: Attachment) {
        if (!currentProduct.value) {
          return;
        }

        const alertResult = await alerts.ask({
          header: t('alerts.products.deleteThumbnail.title'),
          message: t('alerts.products.deleteThumbnail.message', { imageName: image.fileName }),
          buttonCancelText: t('alerts.products.deleteThumbnail.buttonCancel'),
          buttonOkText: t('alerts.products.deleteThumbnail.buttonOk'),
        });

        if (alertResult) {
          const result = await http.api.products.deleteFile(currentProduct.value._id, image.id);

          if (result) {
            currentProduct.value = result;
          }
        }
      }

      /**
       * Delete the current Product
       */
      async function onDeleteClick () {
        if (!currentProduct.value) {
          return
        }

        const alertResult = await alerts.ask({
          header: t('alerts.products.deleteProduct.title'),
          message: t('alerts.products.deleteProduct.message', { productName: currentProduct.value?.title }),
          buttonCancelText: t('alerts.products.deleteProduct.buttonCancel'),
          buttonOkText: t('alerts.products.deleteProduct.buttonOk'),
        });

        if (alertResult) {
          await http.api.products.deleteProduct(currentProduct.value._id);

          await router.replace({ name: "admin.products" })
        }
      }

      function mergeInFormData (data: Product | undefined) {
        formData.title = data?.title ?? "";
        formData.description = data?.description ?? "";
        formData.price = data?.price ?? undefined;
        formData.tags = data?.tags ?? [];
        formData.categories = data?.categories ? data.categories.reduce((acc, curr) => {
          acc.push(curr._id)
          return acc
        }, [] as any) : [];
        formData.thumbnail = undefined;
        formData.images = [];
      }

      watch(() => currentProduct.value, (value) => {
        mergeInFormData(value as Product)
      })

      onIonViewWillEnter(async () => {
        const apiCalls: any[] = [
          http.api.productCategories.readAll()
        ]

        if (route.params.id) {
          apiCalls.push(http.api.products.read(route.params.id as string))
        }

        const results = await Promise.all<ProductCategory[], Product>(apiCalls as any);
        categoriesList.value = results[0]
        currentProduct.value = results[1];
      });

      onIonViewDidLeave(async () => {
        categoriesList.value = []
        currentProduct.value = undefined
      });

      return {
        currentProduct, categoriesList, formData, categoryOptionsList,
        onSubmitClick, onImageDeleteClick, onDeleteClick
      }
    }
  })


</script>
