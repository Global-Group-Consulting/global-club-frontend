<template>
  <div class="chat-message ">
    <strong class="chat-message-title">{{ senderIsUser ? 'Tu' : formatUserName(data.sender) }}</strong>
    <div v-html="data.content"></div>

    <div class="ion-text-right">
      <strong><small style="color: var(--ion-color-secondary-border)">{{
          formatLocaleDate(new Date(data.createdAt))
        }}</small></strong>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { Message } from '@/@types/Communication';
  import { formatUserName, getUserId } from "@/@utilities/fields"
  import { formatLocaleDate } from '@/@utilities/dates';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { User } from '@/@types/User';

  export default defineComponent({
    name: "ChatMessage",
    props: {
      data: {
        type: Object as PropType<Message>,
        required: true
      }
    },
    setup (props) {
      const store = useStore(storeKey);

      const senderIsUser = computed(() => {
        const authUser: User = store.getters['auth/user']

        return authUser.id === getUserId(props.data.sender)
      })

      return {
        formatUserName, formatLocaleDate,
        senderIsUser
      }
    }
  });
</script>

<style scoped>

</style>
