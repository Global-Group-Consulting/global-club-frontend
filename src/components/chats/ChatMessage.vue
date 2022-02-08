<template>
  <div class="chat-message"
       :class="{'status-change': typeOfOrderStatusChange, 'incoming': !senderIsUser || typeOfOrderStatusChange}">
    <div class="status-index">{{ statusIndex }}</div>

    <strong class="chat-message-title">{{ title }}</strong>

    <div v-html="content" v-if="content"></div>

    <div class="attachments-container" v-if="data.attachments && data.attachments.length > 0">
      <ul class>
        <li v-for="file of data.attachments" :key="file.id">
          <a target="_blank" :href="formatImgUrl(file.id, file.server === 'files') ">{{ file.fileName }}</a>
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
import {computed, defineComponent, inject, PropType} from 'vue';
import {Communication, Message} from '@/@types/Communication';
import {formatUserName, getUserId} from "@/@utilities/fields"
import {formatLocaleDate} from '@/@utilities/dates';
import {useStore} from 'vuex';
import {storeKey} from '@/store';
import {User} from '@/@types/User';
import {MessageTypeEnum} from '@/@enums/message.type.enum';
import {formatOrderStatus} from '@/@utilities/statuses';
import {formatImgUrl, resolveDownloadUrl} from '@/@utilities/images';
import {Attachment} from '@/@types/Attachment';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: "ChatMessage",
  props: {
    data: {
      type: Object as PropType<Message>,
      required: true
    },
    communication: Object as PropType<Communication>
  },
  setup(props) {
    const store = useStore(storeKey);
    const {t} = useI18n();

    const senderIsUser = computed(() => {
      const authUser: User = store.getters['auth/user']

      if (!props.data.sender) {
        return false
      }

      return authUser.id === getUserId(props.data.sender)
    })

    const typeOfOrderStatusChange = computed(() => {
      return [MessageTypeEnum.ORDER_STATUS_UPDATE, MessageTypeEnum.ORDER_CREATED, MessageTypeEnum.ORDER_PRODUCT_UPDATE].includes(props.data.type)
    })

    const statusIndex = computed(() => {
      const messagesTypes = [MessageTypeEnum.ORDER_STATUS_UPDATE, MessageTypeEnum.ORDER_CREATED];
      let index = 0;
      let foundedIndex;

      for (const msg of props.communication?.messages || []) {
        if (messagesTypes.includes(msg.type)) {
          index++

          if (msg._id === props.data._id) {
            foundedIndex = index
            break
          }
        }
      }

      return foundedIndex
    })

      const isFirstMessage = computed(() => {
        return props.data?.type === MessageTypeEnum.ORDER_CREATED
      })

      const title = computed(() => {
        if (isFirstMessage.value) {
          return "Ordine creato"
        }

        if (props.data.type === MessageTypeEnum.ORDER_PRODUCT_UPDATE) {
          return "Dati ordine aggiornati"
        }

        if (typeOfOrderStatusChange.value) {
          return "Ordine " + formatOrderStatus(props.data.data?.orderStatus)
        }

        if (senderIsUser.value) {
          return 'Tu'
        } else {

          if (!props.data.sender) {
            return "Amministrazione"
          }

          return formatUserName(props.data.sender)
        }
      })

      const content = computed(() => {
        if (props.data.type === MessageTypeEnum.MESSAGE) {
          return props.data.content
        }

        if (props.data.type === MessageTypeEnum.ORDER_PRODUCT_UPDATE && props.data.data?.productUpdate) {
          const updates = props.data.data.productUpdate;
          const product = updates.product;
          const toReturn: string[] = [`Prodotto: <strong>${product.title}</strong>`, "<ul>"];

          Object.keys(updates.diff).forEach(key => {
            toReturn.push(`<li>${t("pages.orderDetails." + key)}: <strong>${updates.originalData[key]} -> ${updates.diff[key]}</strong></li>`)
          })

          toReturn.push("</ul>")

          return toReturn.join("")
        }

        if (props.data.type === MessageTypeEnum.ORDER_CREATED && props.data.data?.orderProducts) {
          const orderProducts = props.data.data.orderProducts;
          const toReturn = ["Riepilogo dell'ordine<br>", `N° prodotti: ${orderProducts.length}<br>`, "<ul>"];

          orderProducts.forEach(el => {
            toReturn.push(`<li><strong>${el.product.title}</strong> x ${el.qta}</li>`)
          })
          toReturn.push("</ul>")

          return toReturn.join("")
        }

        return ""
      })

      async function previewFile (file: Attachment) {
        // const url = await http.api.files.fetchPublicUrl(file.id)
        // const url = await http.api.files.fetchPublicUrl(file.id)

        // const fileTransfer: FileTransferObject = FileTransfer.create();
        // window.open(url)
        /*if (url) {
          try {
            const downloadedFile = await fileTransfer.download(url, File.dataDirectory + file.id)

            console.log(downloadedFile)
            debugger
            // await FileOpener.open(url, file.mimetype)
          } catch (er) {
            // await alerts.error(er);
            window.open(url)

            // await http.api.files.preview(file.id, file.mimetype, file.fileName)
          }*/
        // }
      }

      return {
        formatUserName, formatLocaleDate, formatImgUrl, resolveDownloadUrl,
        previewFile, isFirstMessage,
        senderIsUser, typeOfOrderStatusChange,
        title, statusIndex,
        MessageTypeEnum,
        content
      }
    }
  });
</script>

<style scoped>

</style>
