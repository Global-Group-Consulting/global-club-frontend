<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.productCategoryDetails.title') }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton v-if="currentCategory"
                                 :text="$t('pages.productCategoryDetails.btn_delete')"
                                 @click="onDeleteClick"/>
          </template>
        </SimpleToolbar>

        <ion-row>
          <ion-col>
            <FormFiles v-model="formData.thumbnail"
                       :remote-images="currentCategory ? currentCategory['thumbnail'] : null"
                       :max-images="1"
                       :label="$t('forms.productCategories.thumbnail')"
                       @delete="onImageDeleteClick"/>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6">
            <FormInput :label="$t('forms.productCategories.title')" v-model="formData.title"/>
          </ion-col>

          <ion-col size="6">
            <FormInput :label="$t('forms.productCategories.description')" v-model="formData.description"/>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="4" offset="4">
            <ClubButton @click="onSubmitClick" version="link">
              {{ $t('forms.productCategories.' + (currentCategory ? "btnUpdate" : "btnCreate")) }}
            </ClubButton>
          </ion-col>
        </ion-row>


      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, reactive, Ref, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { Attachment } from '@/@types/Attachment';
  import { ProductCategory } from '@/@types/ProductCategory';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import FormFiles from '@/components/forms/FormFiles.vue';
  import { CreateProductCategoryDto } from '@/views/admin/productCategories/dto/create.product.category.dto';
  import { UpdateProductCategoryDto } from '@/views/admin/productCategories/dto/update.product.category.dto';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    components: { ClubButton, TopToolbar, SimpleToolbar, SimpleToolbarButton, FormFiles },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const router = useRouter();
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

      /**
       * Delete the clicked image
       */
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

        if (alertResult.resp) {
          const result = await http.api.productCategories.deleteThumbnail(currentCategory.value._id);

          if (result) {
            currentCategory.value = result;
          }
        }
      }

      /**
       * Delete the current ProductCategory
       */
      async function onDeleteClick () {
        if (!currentCategory.value) {
          return
        }

        const alertResult = await alerts.ask({
          header: t('alerts.productCategories.deleteCategory.title'),
          message: t('alerts.productCategories.deleteCategory.message', { categoryName: currentCategory.value?.title }),
          buttonCancelText: t('alerts.productCategories.deleteCategory.buttonCancel'),
          buttonOkText: t('alerts.productCategories.deleteCategory.buttonOk'),
        });

        if (alertResult.resp) {
          await http.api.productCategories.deleteCategory(currentCategory.value._id);

          await router.replace({ name: "admin.productCategories" })
        }
      }

      function mergeInFormData (data: ProductCategory | undefined) {
        formData.title = data?.title ?? '';
        formData.description = data?.description ?? '';
        formData.thumbnail = undefined
      }

      watch(() => currentCategory.value, (value) => {
        mergeInFormData(value as ProductCategory)
      })

      onIonViewWillEnter(async () => {
        if (route.params.id) {
          const data: ProductCategory | undefined = await http.api.productCategories.read(route.params.id as string);

          data && (currentCategory.value = data);
        }
      });

      onIonViewDidLeave(() => {
        currentCategory.value = undefined
      })

      return {
        currentCategory, formData,
        onSubmitClick, onImageDeleteClick, onDeleteClick
      }
    }
  })

</script>
