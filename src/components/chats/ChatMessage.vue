<template>
  <div class="chat-message"
       :class="{'status-change': typeOfOrderStatusChange, 'incoming': !senderIsUser || typeOfOrderStatusChange}">
    <div class="status-index" v-if="typeOfOrderStatusChange">{{ statusIndex }}</div>

    <strong class="chat-message-title">{{ title }}</strong>
    <div v-html="data.content"></div>

    <div class="attachments-container" v-if="data.attachments && data.attachments.length > 0">
      <ul class>
        <li v-for="file of data.attachments" :key="file.id">
          <a href="#" @click.prevent="previewFile(file)">{{ file.fileName }}</a>
        </li>
      </ul>
    </div>

    <div class="ion-text-right">
      <strong><small style="color: var(--ion-color-secondary-border)">{{
          formatLocaleDate(new Date(data.createdAt))
        }}</small></strong>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType } from 'vue';
  import { Message } from '@/@types/Communication';
  import { formatUserName, getUserId } from "@/@utilities/fields"
  import { formatLocaleDate } from '@/@utilities/dates';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { User } from '@/@types/User';
  import { MessageTypeEnum } from '@/@enums/message.type.enum';
  import { CommunicationApis } from '@/plugins/httpCalls/CommunicationApis';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import { formatImgUrl } from '@/@utilities/images';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Attachment } from '@/@types/Attachment';

  export default defineComponent({
    name: "ChatMessage",
    props: {
      data: {
        type: Object as PropType<Message>,
        required: true
      },
      communication: Object as PropType<CommunicationApis>
    },
    setup (props) {
      const http = inject("http") as HttpPlugin
      const store = useStore(storeKey);

      const senderIsUser = computed(() => {
        const authUser: User = store.getters['auth/user']

        return authUser.id === getUserId(props.data.sender)
      })

      const typeOfOrderStatusChange = computed(() => {
        return props.data.type === MessageTypeEnum.ORDER_STATUS_UPDATE
      })

      const title = computed(() => {
        if (typeOfOrderStatusChange.value && props.data.data?.orderStatus) {
          if (props.data.data.orderStatus === OrderStatusEnum.PENDING) {
            return "Ordine creato"
          }

          return "Ordine" + formatOrderStatus(props.data.data.orderStatus)
        }

        if (senderIsUser.value) {
          return 'Tu'
        } else {
          return formatUserName(props.data.sender)
        }
      })

      const statusIndex = computed(() => {
        return (1).toString()//.padStart(2, "0")
      })

      async function previewFile (file: Attachment) {
        await http.api.files.preview(file.id, file.mimetype, file.fileName)
      }

      return {
        formatUserName, formatLocaleDate, formatImgUrl,
        previewFile,
        senderIsUser, typeOfOrderStatusChange,
        title, statusIndex
      }
    }
  });
</script>

<style scoped>

</style>
