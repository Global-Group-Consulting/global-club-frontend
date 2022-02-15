<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <Form @submit="productForm.onSubmit">
      <FormInputV v-model.number="productForm.formData.qta.modelValue"
                  type="number"
                  label="Quantità"
                  :error="productForm.formData.qta.errorMessage"></FormInputV>

      <FormInputV v-model.number="productForm.formData.price.modelValue"
                  type="currency"
                  label="Prezzo unitario"
                  :error="productForm.formData.price.errorMessage"></FormInputV>

      <FormToggleV v-model.number="productForm.formData.repayment.modelValue"
                   label="Applica Rimborso"
                   :error="productForm.formData.repayment.errorMessage"></FormToggleV>

      <h4 class="ion-text-left">Prezzo totale: <strong v-html="formatBrites(totalPrice)"></strong></h4>
      <h4 class="ion-text-left" v-if="productForm.formData.repayment.modelValue">
        Totale rimborso: <strong>{{ formatCurrency(totalPrice / 2, true) }}</strong>
      </h4>
    </Form>
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">
      {{ cancelText }}
    </ClubButton>

    <ClubButton @click="productForm.onSubmit">
      {{ okText }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import {modalController} from '@ionic/vue';
import {OrderProduct} from '@/@types/Order';
import {OrderProductForm} from '@/composables/forms/OrderProductForm';
import ClubButton from '@/components/ClubButton.vue';
import FormInputV from '@/components/forms/FormInputV.vue';
import {formatBrites, formatCurrency} from '@/@utilities/currency';
import FormToggleV from "@/components/forms/FormToggleV.vue";

export default defineComponent({
  name: "OrderProductEditModal",
  components: {FormToggleV, FormInputV, ClubButton},
  props: {
    title: String,
    okText: {
      type: String,
      default: "Salva"
    },
    cancelText: {
      type: String,
      default: "Annulla"
    },
    product: Object as PropType<OrderProduct>,
    orderId: {
      type: String,
      required: true
    },
  },
  setup(props) {
    const newMessage = ref("");
    const attachments = ref(null)
    const productForm = new OrderProductForm({
        dataToWatch: () => props.product
      }, props.orderId)

      const totalPrice = computed(() => productForm.formData.price.modelValue * productForm.formData.qta.modelValue)

      productForm.addEventListener("submitCompleted", (evt) => {
        modalController.dismiss(evt.detail, "ok")

        return
      })

      function onCancelClick () {
        modalController.dismiss()
      }

      return {
        newMessage,
        attachments,
        onCancelClick, formatBrites,
        formatCurrency,
        productForm,
        totalPrice
      }
    }
  });
</script>

<style scoped>

</style>
