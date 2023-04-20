<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <Form @submit="reservationForm.onSubmit">
      <FormInputAutocomplete v-model:asyncModelValue="reservationForm.formData.userId.modelValue"
                             :async-options-url="$http.api.users.getUsersListOptionsUrl()"
                             async-filter-key="name"
                             async-options-value-key="value"
                             async-options-label-key="text"
                             async-options-emit-key="value"
                             :label="$t('forms.filters.user')"
                             :error="reservationForm.formData.userId.errorMessage"></FormInputAutocomplete>

      <fieldset v-for="(companion, i) in reservationForm.formData.companions.modelValue" :key="'companion_' + i">
        <legend>Accompagnatore #{{ i + 1 }} <a class="ms-2" href="#" @click="removeCompanion(i)">Rimuovi</a></legend>
        <!--        <p class="text-danger">{{ reservationForm.formData.companions.errorMessage }}</p>-->

        <FormInputV v-model="companion.firstName" label="Nome"></FormInputV>
        <FormInputV v-model="companion.lastName" label="Cognome"></FormInputV>
        <!--        <FormInputV v-model="companion.age" label="Età"></FormInputV>-->
      </fieldset>

      <club-button version="link" @click="addCompanion">Aggiungi accompagnatore</club-button>

    </Form>
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">
      {{ cancelText }}
    </ClubButton>

    <ClubButton @click="reservationForm.onSubmit">
      {{ okText }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'
import ClubButton from '@/components/ClubButton.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import FormToggleV from '@/components/forms/FormToggleV.vue'
import { modalController } from '@ionic/vue'
import { EventReservationForm } from '@/composables/forms/EventReservationForm'
import FormInputAutocomplete from '@/components/forms/FormInputAutocomplete.vue'

export default defineComponent({
  name: 'reservationModal',
  components: { FormInputV, FormInputAutocomplete, ClubButton },
  props: {
    title: String,
    okText: {
      type: String,
      default: 'Salva'
    },
    cancelText: {
      type: String,
      default: 'Annulla'
    },
    eventId: {
      type: String,
      required: true
    }
  },
  setup (props) {

    const reservationForm = new EventReservationForm({
      dataToWatch: () => props.eventId
    }, props.eventId)

    const companions: Ref<any[]> = ref([])

    reservationForm.updateInitialFormData({
      companions: []
    })

    function onCancelClick () {
      modalController.dismiss()
    }

    function addCompanion () {
      reservationForm.formData.companions.modelValue.push({
        firstName: '',
        lastName: '',
        age: ''
      })
    }

    function removeCompanion (index: number) {
      reservationForm.formData.companions.modelValue.splice(index, 1)
    }

    return {
      reservationForm,
      companions,
      onCancelClick,
      addCompanion,
      removeCompanion
    }
  }
})
</script>

<style scoped lang="scss">

</style>
