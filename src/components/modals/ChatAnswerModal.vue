<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">

    <FormRTE v-model="newMessage" label="Messaggio"></FormRTE>

    <FormFiles label="Allegati" v-model="attachments"></FormFiles>

  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onOkClick">
      {{ cancelText }}
    </ClubButton>

    <ClubButton @click="onOkClick">
      {{ okText }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import FormFiles from '@/components/forms/FormFiles.vue';
  import FormRTE from '@/components/forms/FormRTE.vue';
  import { modalController } from '@ionic/vue';
  import ClubButton from '@/components/ClubButton.vue';

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
      }
    },
    setup () {
      const newMessage = ref("");
      const attachments = ref(null)

      function onOkClick () {
        //TODO::  must check data validity

        modalController.dismiss({
          message: newMessage.value,
          attachments: attachments.value
        }, "ok")
      }

      return {
        newMessage,
        attachments,
        onOkClick
      }
    }
  });
</script>

<style scoped>

</style>
