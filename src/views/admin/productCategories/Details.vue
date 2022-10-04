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

        <Form @submit="productCategoriesForm.onSubmit">
          <ion-row>
            <ion-col>
              <FormFiles v-model="productCategoriesForm.formData.thumbnail.modelValue"
                         :error="productCategoriesForm.formData.thumbnail.errorMessage"
                         :remote-images="currentCategory ? currentCategory['thumbnail'] : null"
                         :max-images="1"
                         :label="$t('forms.productCategories.thumbnail')"
                         @delete="onImageDeleteClick"/>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="12" size-sm="6" size-lg="4">
              <FormInputV :label="$t('forms.productCategories.title')"
                          v-model="productCategoriesForm.formData.title.modelValue"
                          :error="productCategoriesForm.formData.title.errorMessage"/>
            </ion-col>

            <ion-col size="12" size-sm="6" size-lg="4">
              <FormInputV :label="$t('forms.productCategories.description')"
                          v-model="productCategoriesForm.formData.description.modelValue"
                          :error="productCategoriesForm.formData.description.errorMessage"/>
            </ion-col>

            <ion-col size="12" size-sm="6" size-lg="4">
              <FormInputV :label="$t('forms.productCategories.parent')"
                          component="ion-select"
                          v-model="productCategoriesForm.formData.parent.modelValue"
                          :error="productCategoriesForm.formData.parent.errorMessage"
                          :interface-options="{cssClass: 'alert-large'}"
                          :options="parentListOptions"/>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col>
              <ClubButton type="submit">
                {{ $t('forms.productCategories.' + (currentCategory ? 'btnUpdate' : 'btnCreate')) }}
              </ClubButton>
            </ion-col>
          </ion-row>

        </Form>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, Ref, ref } from 'vue'
import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { AlertsPlugin } from '@/plugins/Alerts'
import { Attachment } from '@/@types/Attachment'
import { ProductCategory } from '@/@types/ProductCategory'
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue'
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue'
import FormFiles from '@/components/forms/FormFiles.vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import ClubButton from '@/components/ClubButton.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import { ProductCategoryForm } from '@/composables/forms/ProductCategoryForm'
import { SelectOption } from '@/@types/Form'

export default defineComponent({
  components: { FormInputV, ClubButton, TopToolbar, SimpleToolbar, SimpleToolbarButton, FormFiles },
  setup () {
    const { t } = useI18n()
    const route = useRoute()
    const router = useRouter()
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin
    const currentCategory: Ref<ProductCategory | undefined> = ref()
    const currentLevel: ComputedRef<number> = computed(() => currentCategory.value?.level ?? 0)
    const validParentCategories: Ref<ProductCategory[]> = ref([])
    const parentListOptions: ComputedRef<SelectOption[]> = computed(() => {
      const options = validParentCategories.value.reduce((acc, el) => {
        if (el._id !== currentCategory.value?._id) {
          acc.push({
            text: el.title + (el.parent ? ` (${el.parent?.title})` : ''),
            value: el._id
          })
        }

        return acc
      }, [] as SelectOption[])

      options.unshift({
        text: '- Nessuna categoria -',
        value: ''
      })

      return options
    })
    const productCategoriesForm = new ProductCategoryForm({
      dataToWatch: () => currentCategory.value
    })

    const getValidLevels = (startingLevel?: number) => {
      const levels: number[] = []
      let i = startingLevel ?? 0

      while (i >= 0) {
        levels.push(i)
        i--
      }

      return levels
    }

    productCategoriesForm.addEventListener('submitCompleted', (e) => {
      if (!currentCategory.value || !currentCategory.value._id) {
        router.replace({ name: 'admin.productCategories.details', params: { id: e.detail._id } })

        alerts.toastSuccess('Categoria creata correttamente!')
      } else {
        currentCategory.value = e.detail

        alerts.toastSuccess('Categoria aggiornata correttamente!')
      }
    })

    /**
     * Delete the clicked image
     */
    async function onImageDeleteClick (image: Attachment) {
      if (!currentCategory.value) {
        return
      }

      const alertResult = await alerts.ask({
        header: t('alerts.productCategories.deleteThumbnail.title'),
        message: t('alerts.productCategories.deleteThumbnail.message', { imageName: image.fileName }),
        buttonCancelText: t('alerts.productCategories.deleteThumbnail.buttonCancel'),
        buttonOkText: t('alerts.productCategories.deleteThumbnail.buttonOk')
      })

      if (alertResult.resp) {
        const result = await http.api.productCategories.deleteThumbnail(currentCategory.value._id)

        if (result) {
          currentCategory.value = result
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
        buttonOkText: t('alerts.productCategories.deleteCategory.buttonOk')
      })

      if (alertResult.resp) {
        await http.api.productCategories.deleteCategory(currentCategory.value._id)

        await router.replace({ name: 'admin.productCategories' })
      }
    }

    onIonViewWillEnter(async () => {
      let categoryData: ProductCategory | undefined = undefined

      // Execute a single call at a time so that for the readAllRows call,
      // we have the level to filter the categories

      if (route.params.id) {
        categoryData = await http.api.productCategories.read(route.params.id as string)
      }

      validParentCategories.value = (await http.api.productCategories.readAllRaw({ 'filter[levels][]': getValidLevels(categoryData?.level) })) ?? []

      if (categoryData) {
        currentCategory.value = categoryData
      }
    })

    onIonViewDidLeave(() => {
      currentCategory.value = undefined
      validParentCategories.value = []
    })

    return {
      currentCategory,
      productCategoriesForm,
      currentLevel,

      parentListOptions,
      onImageDeleteClick, onDeleteClick
    }
  }
})

</script>
