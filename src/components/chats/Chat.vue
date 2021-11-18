<template>
  <div class="chat-component">
    <div v-if="communication.messages && communication.messages.length > 0"
         class="chat-container">
      <ChatMessage v-for="message in communication.messages" :key="message._id"
                   :data="message"></ChatMessage>
    </div>

    <p v-else>
      Nessun messaggio disponibile
    </p>

  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Communication } from '@/@types/Communication';
  import ChatMessage from '@/components/chats/ChatMessage.vue';

  export default defineComponent({
    name: "Chat",
    components: { ChatMessage },
    props: {
      communication: {
        type: Object as PropType<Communication>,
        default: () => ({})
      }
    }
  });
</script>

<style scoped>

</style>
