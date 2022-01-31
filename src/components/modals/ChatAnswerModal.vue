<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <Form @submit="chatForm.onSubmit">
      <FormRTE v-model="chatForm.formData.message.modelValue" label="Messaggio"
               :error="chatForm.formData.message.errorMessage"></FormRTE>

      <FormFiles label="Allegati" v-model="chatForm.formData.attachments.modelValue"
                 accept="image/png,image/jpeg,image/png,image/jpg,application/pdf"
      ></FormFiles>
    </Form>
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">
      {{ cancelText }}
    </ClubButton>

    <ClubButton @click="chatForm.onSubmit">
      {{ okText }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import FormFiles from '@/components/forms/FormFiles.vue';
  import FormRTE from '@/components/forms/FormRTE.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import { ChatMessageForm } from '@/composables/forms/ChatMessageForm';
  import { modalController } from '@ionic/vue';
  import { Communication } from '@/@types/Communication';

  export default defineComponent({
    name: "ChatAnswerModal",
    components: { ClubButton, FormRTE, FormFiles },
    props: {
      title: String,
      okText: {
        type: String,
        default: "Invia"
      },
      cancelText: {
        type: String,
        default: "Annulla"
      },
      conversation: Object as PropType<Communication>
    },
    setup (props) {
      const newMessage = ref("");
      const attachments = ref(null)
      const chatForm = new ChatMessageForm({
        dataToWatch: () => props.conversation
      })

      chatForm.addEventListener("submitCompleted", (evt) => {
        modalController.dismiss(evt.detail, "ok")

        return
      })

      function onCancelClick () {
        modalController.dismiss()
      }

      return {
        newMessage,
        attachments,
        onCancelClick,
        chatForm
      }
    }
  });
</script>

<style scoped>

</style>
