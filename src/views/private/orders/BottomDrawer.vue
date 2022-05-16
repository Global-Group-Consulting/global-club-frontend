<template>
  <div class="bottom-drawer" :class="{'opened': opened}" v-show="communication">
    <ion-grid fixed class="ion-no-padding">
      <div @click="toggleDrawer" class="toggle-drawer-btn pt-2 pb-4 py-md-3 "
           ref="toggleDrawerBtn">
        <Icon :name="opened ? 'chevron-down' : 'chevron-up'" style="width: 24px; height: 24px;"></Icon>
        {{ opened ? 'Chiudi' : 'Apri' }} chat
      </div>

      <div class="toggle-drawer-content pe-4 ps-5 pb-4"
           ref="toggleDrawerContent">
        <Chat :communication="communication"
              @newMessage="onNewMessage"
              @messageRead="onMessageRead"
              :highlight="messageToHighlight"></Chat>
      </div>
    </ion-grid>
  </div>
</template>

<script lang="ts">
import { createGesture } from '@ionic/core'
import Icon from '@/components/Icon.vue'
import { computed, defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import Chat from '@/components/chats/Chat.vue'
import { Order } from '@/@types/Order'
import { Communication, MessageReadResult } from '@/@types/Communication'

export default defineComponent({
  name: 'BottomDrawer',
  components: { Chat, Icon },
  props: {
    order: {
      type: Object as PropType<Order>,
      required: true
    },
    messageToHighlight: String
  },
  setup (props) {
    const toggleDrawerContent = ref<HTMLDivElement>()
    const store = useStore(storeKey)
    const opened = ref(false)
    const toggleDrawerBtn: Ref<HTMLElement | undefined> = ref()
    const mdAndUp = computed(() => store.getters['mdAndUp'])
    const communication: Ref<Communication | undefined> = ref()

    function toggleDrawer () {
      // if (mdAndUp.value) {
        opened.value = !opened.value
      // }
    }

    function onNewMessage (data: Communication) {
      if (communication.value?.messages) {
        communication.value.messages = data.messages
      }
    }

    /**
     * When a message gets read, add the read entry to the array of readings
     *
     * @param messageReadData
     */
    function onMessageRead (messageReadData: MessageReadResult) {
      if (communication.value?.messages) {
        const foundMessage = communication.value.messages.find(msg => msg._id === messageReadData.messageId)

        if (foundMessage) {
          if (!foundMessage.readings) {
            foundMessage.readings = []
          }

          foundMessage.readings.push(messageReadData)
          foundMessage.isRead = messageReadData
        }
      }
    }

    watch(() => props.order, (value: Order) => {
      communication.value = value?.communication
      /*   setTimeout(() => {
           toggleDrawerContent.value?.scrollTo(0, 1000)
         }, 1500)*/
    }, { immediate: true })

    watch(() => props.messageToHighlight, (value) => {
      opened.value = true

    })

    onMounted(() => {
      /*if (!toggleDrawerBtn.value) {
        return
      }

      const el = toggleDrawerBtn.value

      const gesture = createGesture({
        el,
        gestureName: 'my-swipe',
        direction: 'y',

        onMove: event => {
          if (mdAndUp.value) {
            return
          }

          // If > 20, must close, otherwise must open
          const newValue = event.deltaY < 20

          // closing with a downward swipe
          if (opened.value === newValue) {
            return
          }

          opened.value = newValue
        }
      })

      // enable the gesture for the item
      gesture.enable(true)*/
    })

    return {
      toggleDrawer, onNewMessage, onMessageRead,
      toggleDrawerBtn,
      opened,
      communication,
      toggleDrawerContent
    }
  }
})
</script>

<style lang="scss" scoped>
@import "/src/theme/scss/variables";
@import "/src/theme/scss/functions";

// ios doesn't supports contain
// so the bottom size must be set differently
@supports not (contain: layout) {
  @include mediaQueryDown(md) {
    .bottom-drawer {
      //max-height: calc(100vh - var(--toolbar-height) - var(--ion-safe-area-bottom)) !important;
      //top: var(--toolbar-height);
      //bottom: calc(var(--toolbar-height) + var(--ion-safe-area-bottom)) !important;
    }
  }

  @include mediaQueryUp(md) {

    // on md and up, must consider the width of the sidebar
    .bottom-drawer {
      //width: calc(100% - var(--sidebar-width) - (var(--spacer) * 2)) !important;
      //transform: translateX(var(--sidebar-width));
      //right: var(--sidebar-width) !important;
    }
  }
}

.bottom-drawer {
  width: 100%;
  transform: translateY(calc(100% - 64px));
  transition: transform .4s;
  z-index: 2;
  bottom: 0;
  max-height: 100%;

  @include mediaQueryUp(md) {
    width: calc(100% - (var(--spacer) * 2));
    left: var(--spacer);
  }

  > ion-grid {
    background-color: var(--ion-color-secondary);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    box-shadow: 0 -5px 20px rgba(0, 0, 0, .5);
    max-height: calc(100vh - var(--toolbar-height));

    @include mediaQueryDown(md) {
      max-height: calc(100vh - var(--toolbar-height) - var(--navbar-height) - var(--ion-safe-area-bottom) - var(--ion-safe-area-top));
    }

    display: flex;
    flex-direction: column;
  }

  &.opened {
    transform: translateY(0);

    .toggle-drawer-btn {
      padding: var(--spacer) 0 !important;
    }
  }

  .toggle-drawer-btn {
    width: 100%;
    padding: var(--spacer) 0;
    cursor: pointer;
    flex: 0;
    border-bottom: solid 1px var(--ion-color-secondary-border);
    transition: padding .3s;
    background-image: linear-gradient(0deg, #AB8E54 0%, #6F592F 99.99%, #AD9C7B 100%);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;

    ion-icon {
      width: 50px;
      vertical-align: middle;
    }
  }

  .toggle-drawer-content {
    overflow: auto;
    flex: 1;
    padding-top: var(--spacer);

  }
}
</style>
