<template>
  <div class="chat-component">
    <div v-if="communication.messages && communication.messages.length > 0">
      <div class="chat-container">
        <ChatMessage v-for="message in communication.messages" :key="message._id"
                     :data="message"
                     :communication="communication"
                     :highlight="highlight === message._id"
                     @messageRead="$emit('messageRead', $event)"/>
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
import { defineComponent, PropType, watch } from 'vue'
import { Communication, CommunicationAnswerDto } from '@/@types/Communication'
import ChatMessage from '@/components/chats/ChatMessage.vue'
import ChatAnswerModal from '@/components/modals/ChatAnswerModal.vue'
import { modalController } from '@ionic/vue'
import ClubButton from '@/components/ClubButton.vue'

export default defineComponent({
  name: 'Chat',
  components: { ClubButton, ChatMessage },
  props: {
    communication: {
      type: Object as PropType<Communication>,
      default: () => ({})
    },
    highlight: {
      type: String
    }
  },
  emits: ['messageRead', 'newMessage'],
  setup (props, { emit }) {

    watch(() => props.communication, (value) => {
      console.log(value)
    }, {
      deep: true
    })

    async function onAnswerClick () {
      const modal = await modalController
          .create({
            component: ChatAnswerModal,
            componentProps: {
              title: 'Nuovo risposta al messaggio',
              conversation: props.communication
            }
          })

      await modal.present()
      const result = await modal.onWillDismiss<CommunicationAnswerDto>()

      if (result.role === 'ok' && result.data) {
        emit('newMessage', result.data)
      }
    }

    return {
      onAnswerClick
    }
  }
})
</script>

<style scoped>

</style>
