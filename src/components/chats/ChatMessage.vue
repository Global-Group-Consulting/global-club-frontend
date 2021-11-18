<template>
  <div class="chat-message">
    <div v-html="data.content"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Message } from '@/@types/Communication';

  export default defineComponent({
    name: "ChatMessage",
    props: {
      data: {
        type: Object as PropType<Message>,
        required: true
      }
    }
  });
</script>

<style scoped>

</style>
