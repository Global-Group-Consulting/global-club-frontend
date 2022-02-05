<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.productDetails.title') }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <SimpleToolbar v-if="!isNew">
          <template v-slot:center>
            <SimpleToolbarButton v-if="!isNew"
                                 :text="$t('pages.productDetails.btn_delete')"
                                 @click="onDeleteClick"/>
          </template>
        </SimpleToolbar>

        <Form @submit="productForm.onSubmit">
          <ion-row>
            <ion-col size="12" sizeMd="6">
              <FormFiles v-model="productForm.formData.images.modelValue"
                         :error="productForm.formData.images.errorMessage"
                         :remote-images="currentProduct ? currentProduct['images'] : null"
                         :label="$t('forms.products.images')"
                         :multiple="true"
                         @delete="onImageDeleteClick"/>
            </ion-col>
            <ion-col size="12" sizeMd="6">
              <FormFiles v-model="productForm.formData.thumbnail.modelValue"
                         :error="productForm.formData.thumbnail.errorMessage"
                         :remote-images="currentProduct ? currentProduct['thumbnail'] : null"
                         :max-images="1"
                         :label="$t('forms.products.thumbnail')"
                         @delete="onImageDeleteClick"/>
            </ion-col>
          </ion-row>

          <ion-row class="masonry-row">
            <ion-col>
              <FormInputV :label="$t('forms.products.title')"
                          v-model="productForm.formData.title.modelValue"
                          :error="productForm.formData.title.errorMessage"/>
            </ion-col>

            <ion-col>
              <FormRTE :label="$t('forms.products.description')"
                       v-model="productForm.formData.description.modelValue"
                       :error="productForm.formData.description.errorMessage"/>
            </ion-col>

            <ion-col>
              <FormRTE :label="$t('forms.products.conditions')"
                       v-model="productForm.formData.conditions.modelValue"
                       :error="productForm.formData.conditions.errorMessage"/>
            </ion-col>

            <ion-col>
              <FormInputV :label="$t('forms.products.price')"
                          v-model="productForm.formData.price.modelValue"
                          :error="productForm.formData.price.errorMessage"
                          :disabled="productForm.formData.priceUndefined.modelValue"/>
            </ion-col>

            <ion-col>
              <FormToggleV :label="$t('forms.products.priceUndefined')"
                           v-model="productForm.formData.priceUndefined.modelValue"
                           :error="productForm.formData.priceUndefined.errorMessage"
              />
            </ion-col>

            <ion-col>
              <FormToggleV :label="$t('forms.products.hasQta')"
                           v-model="productForm.formData.hasQta.modelValue"
                           :error="productForm.formData.hasQta.errorMessage"
              />
            </ion-col>

            <ion-col>
              <FormToggleV :label="$t('forms.products.visible')"
                           v-model="productForm.formData.visible.modelValue"
                           :error="productForm.formData.visible.errorMessage"
              />
            </ion-col>

            <ion-col>
              <FormInputV :label="$t('forms.products.categories')"
                          v-model="productForm.formData.categories.modelValue"
                          :error="productForm.formData.categories.errorMessage"
                          component="ion-select"
                          :multiple="true"
                          :options="categoryOptionsList"/>
            </ion-col>

            <ion-col>
              <FormInputV :label="$t('forms.products.minPacks')"
                          v-model="productForm.formData.minPacks.modelValue"
                          :error="productForm.formData.minPacks.errorMessage"
                          component="ion-select"
                          :multiple="true"
                          :options="packsOptionsList"/>
            </ion-col>

            <ion-col>
              <FormInputV :label="$t('forms.products.createdAt')"
                          disabled v-if="!isNew"
                          :model-value="formatLocaleDate(currentProduct?.createdAt)"/>
            </ion-col>
            <ion-col>
              <FormInputV :label="$t('forms.products.updatedAt')"
                          disabled v-if="!isNew"
                          :model-value="formatLocaleDate(currentProduct?.updatedAt)"/>
            </ion-col>
          </ion-row>

          <h3 class="d-flex ion-align-items-center">
            Dati geografici
          </h3>

          <ion-row class="masonry-row">
            <ion-col>
              <FormInputV :label="$t('forms.products.location.region')"
                          component="ion-select"
                          :options="regionsList"
                          :interface-options="{cssClass: 'alert-large'}"
                          v-model="productForm.formData['location.region'].modelValue"
                          :error="productForm.formData['location.region'].errorMessage"
                          @update:modelValue="onRegionChange"
                          clear-input/>
            </ion-col>
            <ion-col>
              <FormInputV :label="$t('forms.products.location.province')"
                          component="ion-select"
                          :options="provincesList"
                          :interface-options="{cssClass: 'alert-large'}"
                          v-model="productForm.formData['location.province'].modelValue"
                          :error="productForm.formData['location.province'].errorMessage"
                          @update:modelValue="onProvinceChange"
                          :disabled="provincesList.length === 0"
                          clear-input />
            </ion-col>
            <ion-col>
              <FormInputV :label="$t('forms.products.location.city')"
                          component="ion-select"
                          :options="citiesList"
                          :interface-options="{cssClass: 'alert-large'}"
                          v-model="productForm.formData['location.city'].modelValue"
                          :error="productForm.formData['location.city'].errorMessage"
                          :disabled="citiesList.length === 0"
                          clear-input/>
            </ion-col>
          </ion-row>

          <h3 class="d-flex ion-align-items-center">
            Dati aggiuntivi
            <ClubButton version="outline" size="small" class="ms-3"
                        @click="addExtraData">Aggiungi
            </ClubButton>
          </h3>

          <ion-row>
            <ion-col>
              <FormCustomField v-for="(field, i) in extraData" :key="i"
                               @removeInput="removeExtraData(i)"/>
            </ion-col>
          </ion-row>

          <ion-row>
            <ion-col size="4" offset="4">
              <ClubButton type="submit">
                {{ $t('forms.products.' + (currentProduct ? "btnUpdate" : "btnCreate")) }}
              </ClubButton>
            </ion-col>
          </ion-row>
        </Form>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, inject, nextTick, ref, Ref, watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute, useRouter} from 'vue-router';
import {Product} from '@/@types/Product';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {AlertsPlugin} from '@/plugins/Alerts';
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
import FormFiles from '@/components/forms/FormFiles.vue';
import {ProductCategory} from '@/@types/ProductCategory';
import {Attachment} from '@/@types/Attachment';
import {onIonViewDidLeave, onIonViewWillEnter} from '@ionic/vue';
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
import ClubButton from '@/components/ClubButton.vue';
import {ProductForm} from '@/composables/forms/ProductForm';
import FormInputV from '@/components/forms/FormInputV.vue';
import FormRTE from '@/components/forms/FormRTE.vue';
import FormToggleV from '@/components/forms/FormToggleV.vue';
import {formatLocaleDate} from '@/@utilities/dates';
import {PackEnum} from '@/@enums/pack.enum';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import FormCustomField from "@/components/forms/FormCustomField.vue";
import {City, Province, Region} from "@/@types/Location";
import {SelectOption} from "@/@types/Form";
import {capitalize} from "lodash";

export default defineComponent({
  components: {
    FormCustomField,
    TopToolbar,
    FormToggleV,
    FormRTE,
    FormInputV,
    ClubButton,
    SimpleToolbarButton,
    SimpleToolbar,
    FormFiles
  },
  setup(props, {emit}) {
    const {t} = useI18n();
    const route = useRoute();
    const router = useRouter();
    const http = inject<HttpPlugin>('http') as HttpPlugin;
    const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
    const colSizes = {
      size: 6
    }
    const extraData: Ref<any[]> = ref([]);

    const regions: Ref<Region[]> = ref([]);
    const provinces: Ref<Province[]> = ref([]);
    const cities: Ref<City[]> = ref([]);
    const currentProduct: Ref<Product & { categories: string[] } | undefined> = ref()
    const categoriesList: Ref<ProductCategory[]> = ref([])
    const categoryOptionsList = computed(() => {
      return categoriesList.value.map(el => ({
        text: el.title,
        value: el._id
      }))
    })
    const packsOptionsList = computed(() => {
      const toReturn = Object.values(PackEnum).map(el => ({
        text: t("enums.PackEnum." + el),
        value: el
      }))

      return toReturn;
    })

    const regionsList: ComputedRef<SelectOption[]> = computed(() => {
      return regions.value.map(region => {
        return {
          text: capitalize(region.nome),
          value: region.nome.toLocaleLowerCase()
        }
      })
    })
    const provincesList: ComputedRef<SelectOption[]> = computed(() => {
      return provinces.value.map(province => {
        return {
          text: capitalize(province.nome),
          value: province.nome.toLocaleLowerCase()
        }
      })
    })
    const citiesList: ComputedRef<SelectOption[]> = computed(() => {
      return cities.value.map(city => {
        return {
          text: capitalize(city.nome),
          value: city.nome.toLocaleLowerCase()
        }
      })
    })

    const productForm = new ProductForm({
      dataToWatch: () => currentProduct.value,
      emit
    })

    const isNew = computed(() => !currentProduct.value?._id)

    productForm.addEventListener("submitCompleted", (e) => {
      currentProduct.value = productForm.formatCurrentProduct(e.detail);
    })

    /**
     * Delete a single image
     */
    async function onImageDeleteClick(image: Attachment) {
      if (!currentProduct.value) {
        return;
      }

      const alertResult = await alerts.ask({
        header: t('alerts.products.deleteThumbnail.title'),
        message: t('alerts.products.deleteThumbnail.message', {imageName: image.fileName}),
        buttonCancelText: t('alerts.products.deleteThumbnail.buttonCancel'),
        buttonOkText: t('alerts.products.deleteThumbnail.buttonOk'),
      });

      if (alertResult) {
        const result = await http.api.products.deleteFile(currentProduct.value._id, image.id);

        if (result) {
          currentProduct.value = productForm.formatCurrentProduct(result);
        }
      }
    }

    /**
     * Delete the current Product
     */
    async function onDeleteClick() {
      if (!currentProduct.value) {
        return
      }

      const alertResult = await alerts.ask({
        header: t('alerts.products.deleteProduct.title'),
        message: t('alerts.products.deleteProduct.message', {productName: currentProduct.value?.title}),
        buttonCancelText: t('alerts.products.deleteProduct.buttonCancel'),
        buttonOkText: t('alerts.products.deleteProduct.buttonOk'),
      });

      if (alertResult) {
        await http.api.products.deleteProduct(currentProduct.value._id);

        await router.replace({name: "admin.products"})
      }
    }

    function addExtraData() {

      // TODO:: aprire un modale per inz<erire le specifiche del nuovo campo.
      extraData.value.push({})
    }

    function removeExtraData(index: number) {
      debugger
      extraData.value.splice(index, 1)
    }

    async function onRegionChange(value: string) {
      provinces.value = value ? (await http.api.locations.provinces(value) || []) : []

      productForm.formData['location.province'].modelValue = ""
    }

    async function onProvinceChange(value: string) {
      cities.value = value ? (await http.api.locations.cities(productForm.formData['location.region'].modelValue, value) || []) : []

      productForm.formData['location.city'].modelValue = ""
    }

    watch(() => productForm.formData.priceUndefined.modelValue, (value => {
      if (value) {
        productForm.formData.price.modelValue = 0
      }
    }))

    onIonViewWillEnter(async () => {
      const apiCalls: any[] = [
        http.api.productCategories.readAllRaw(),
        http.api.locations.regions(),
      ]

      if (route.params.id) {
        apiCalls.push(http.api.products.read(route.params.id as string))
      }

      const results = await Promise.all(apiCalls);
      //@ts-ignore
      categoriesList.value = results[0];
      regions.value = results[1];
      //@ts-ignore
      currentProduct.value = productForm.formatCurrentProduct(results[2])

      await nextTick(async () => {
        if (currentProduct.value?.location && currentProduct.value.location.province) {
          provinces.value = await http.api.locations.provinces(currentProduct.value.location.region) || [];
          await nextTick(() => {
            productForm.formData['location.province'].resetField()
          })
        }

        if (currentProduct.value?.location && currentProduct.value.location.city) {
          cities.value = await http.api.locations.cities(currentProduct.value.location.region, currentProduct.value.location.province) || [];
          await nextTick(() => {
            productForm.formData['location.city'].resetField()
          })
        }
      });

    });

    onIonViewDidLeave(async () => {
      categoriesList.value = []
      currentProduct.value = undefined
    });

    return {
      currentProduct, categoriesList, categoryOptionsList, packsOptionsList,
      onImageDeleteClick, onDeleteClick,
      productForm, colSizes,
      formatLocaleDate, isNew,
      addExtraData, removeExtraData, extraData,
      regionsList, provincesList, citiesList,
      onRegionChange, onProvinceChange
    }
  }
})


</script>
