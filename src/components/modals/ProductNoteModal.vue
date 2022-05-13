<template>
<!--  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>ciao</ion-title>
    </ion-toolbar>
  </ion-header>-->
  <ion-content class="popover-content">
    ciao come va?
    <!--    <Form @submit="chatForm.onSubmit">
          <FormRTE v-model="chatForm.formData.message.modelValue" label="Messaggio"
                   :error="chatForm.formData.message.errorMessage"></FormRTE>

          <FormFiles label="Allegati" v-model="chatForm.formData.attachments.modelValue"
                     accept="image/png,image/jpeg,image/png,image/jpg,application/pdf"
          ></FormFiles>
        </Form>-->
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">Annulla</ClubButton>

    <ClubButton @click="onSubmitClick">Salva</ClubButton>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ClubButton from '@/components/ClubButton.vue'
import { modalController, popoverController } from '@ionic/vue'

export default defineComponent({
  name: 'ProductNoteModal',
  components: { ClubButton },
  setup () {
    function onCancelClick () {
      popoverController.dismiss()
    }

    function onSubmitClick () {
      popoverController.dismiss()
    }

    return {
      onCancelClick,
      onSubmitClick
    }
  }
})
</script>

<style scoped>

</style>
