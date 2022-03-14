<template>
  <Waypoint @change="onWaypointChange">
    <div class="chat-message"
         :class="{'status-change': typeOfOrderStatusChange,
                  'incoming': !senderIsUser || typeOfOrderStatusChange,
                  'unread': isUnread && (!senderIsUser || typeOfOrderStatusChange)
                }">
      <div class="status-index">{{ statusIndex }}</div>

      <strong class="chat-message-title">{{ title }}</strong>

      <div v-html="content" v-if="content"></div>

      <div class="attachments-container" v-if="data.attachments && data.attachments.length > 0">
        <ul class>
          <li v-for="file of data.attachments" :key="file.id">
            <a target="_blank" :href="formatImgUrl(file.id, file.server === 'files')"
               @click="previewFile(file, $event)">{{ file.fileName }}</a>
          </li>
        </ul>
      </div>

      <div class="ion-text-right">
        <strong><small style="color: var(--ion-color-secondary-border)">{{
            formatLocaleDate(new Date(data.createdAt))
          }}</small></strong>
      </div>
    </div>
  </Waypoint>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, PropType, ref} from 'vue';
import {Communication, Message, MessageRead} from '@/@types/Communication';
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
import {PreviewAnyFile} from "@awesome-cordova-plugins/preview-any-file";
import {isPlatform} from "@ionic/vue";
import {HttpPlugin} from "@/plugins/HttpPlugin";
import {Waypoint} from "vue-waypoint";
import {WaypointState} from "@/@types/WaypointState";

export default defineComponent({
  name: "ChatMessage",
  components: {Waypoint},
  props: {
    data: {
      type: Object as PropType<Message>,
      required: true
    },
    communication: Object as PropType<Communication>
  },
  emits: ["messageRead"],
  setup(props, {emit}) {
    const store = useStore(storeKey);
    const http = inject("http") as HttpPlugin;
    const {t} = useI18n();
    const read = ref();
    const isUnread = ref(false);

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

        if (updates.diff) {
          Object.keys(updates.diff).forEach(key => {
            toReturn.push(`<li>${t("pages.orderDetails." + key)}: <strong>${updates.originalData[key]} -> ${updates.diff[key]}</strong></li>`)
          })
        }

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

    async function previewFile(file: Attachment, event) {
      if (isPlatform("cordova")) {
        event.preventDefault();

        await http.loading.show();
        const path = formatImgUrl(file.id, file.server === 'files');

        try {
          await PreviewAnyFile.previewPath(path, {
            name: file.fileName,
            mimeType: file.mimetype
          }).subscribe((value) => {

            console.log(value);
            http.loading.hide();
          });
        } catch (e) {
          console.error(e);
        } finally {
          await http.loading.hide();
        }
      }
    }

    async function onWaypointChange(waypointState: WaypointState) {
      if (!props.communication) {
        return;
      }

      if (waypointState.going === "IN" && !props.data.isRead) {
        const result: MessageRead = await http.api.communications
            .setMessageAsRead(props.communication._id, props.data._id);

        // come faccio ad aggiornare la comunicazione in caso di lettura messaggio
        // così che la lettura rimanga associata alla comunicazione senza doverla ricreare ogni volta?????
        emit("messageRead", {
          ...result,
          messageId: props.data._id
        })
      }
    }

    onMounted(() => {
      isUnread.value = !props.data.isRead;
    })

    return {
      formatUserName, formatLocaleDate, formatImgUrl, resolveDownloadUrl,
      previewFile, isFirstMessage,
      senderIsUser, typeOfOrderStatusChange,
      title, statusIndex,
      MessageTypeEnum,
      content,
      onWaypointChange,
      isUnread
    }
  }
});
</script>

<style scoped>

</style>
