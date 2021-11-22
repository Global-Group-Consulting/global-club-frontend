<template>
  <div class="chat-component">
    <div v-if="communication.messages && communication.messages.length > 0">
      <div class="chat-container">
        <ChatMessage v-for="message in communication.messages" :key="message._id"
                     :data="message"></ChatMessage>
      </div>

      <div class="mt-3 mx-auto w-lg-50 w-75">
        <ClubButton expanded @click="onAnswerClick">Rispondi</ClubButton>
      </div>
    </div>

    <p v-else>
      Nessun messaggio disponibile
    </p>

  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, PropType } from 'vue';
  import { Communication } from '@/@types/Communication';
  import ChatMessage from '@/components/chats/ChatMessage.vue';
  import ChatAnswerModal from '@/components/modals/ChatAnswerModal.vue';
  import { modalController } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    name: "Chat",
    components: { ClubButton, ChatMessage },
    props: {
      communication: {
        type: Object as PropType<Communication>,
        default: () => ({})
      }
    },
    setup () {
      const http = inject<HttpPlugin>('http') as HttpPlugin;

      async function onAnswerClick () {
        const modal = await modalController
            .create({
              component: ChatAnswerModal,
              componentProps: {
                title: 'Nuovo risposta al messaggio'
              },
            })

        await modal.present();

        const result = await modal.onWillDismiss();

        if (result.role === "ok") {
          // await http.api
        }
      }

      return {
        onAnswerClick
      }
    }
  });
</script>

<style scoped>

</style>
