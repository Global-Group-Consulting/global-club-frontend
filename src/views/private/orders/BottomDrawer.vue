<template>
  <div class="bottom-drawer" :class="{'opened': opened}">
    <ion-grid fixed class="ion-no-padding">
      <div @click="toggleDrawer" class="toggle-drawer-btn pt-2 pb-4 py-md-3 " ref="toggleDrawerBtn">
        <Icon name="dash" size="large"></Icon>
      </div>

      <div class="toggle-drawer-content pe-4 ps-5 pb-4">
        <Chat :communication="communication" @newMessage="onNewMessage"></Chat>
      </div>
    </ion-grid>
  </div>
</template>

<script lang="ts">
  import { createGesture } from "@ionic/core";
  import Icon from '@/components/Icon.vue';
  import { computed, defineComponent, onMounted, PropType, Ref, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import Chat from '@/components/chats/Chat.vue';
  import { Order } from '@/@types/Order';
  import { Communication } from '@/@types/Communication';

  export default defineComponent({
    name: "BottomDrawer",
    components: { Chat, Icon },
    props: {
      order: {
        type: Object as PropType<Order>,
        required: true
      }
    },
    setup (props) {
      const store = useStore(storeKey);
      const opened = ref(false);
      const toggleDrawerBtn: Ref<HTMLElement | undefined> = ref();
      const mdAndUp = computed(() => store.getters["mdAndUp"]);
      const communication: Ref<Communication | undefined> = ref()

      function toggleDrawer () {
        if (mdAndUp.value) {
          opened.value = !opened.value;
        }
      }

      function onNewMessage (data: Communication) {
        if (communication.value?.messages) {
          communication.value.messages = data.messages;
        }
      }

      watch(() => props.order, (value: Order) => {
        communication.value = value?.communication
      }, { immediate: true })

      onMounted(() => {
        if (!toggleDrawerBtn.value) {
          return
        }

        const el = toggleDrawerBtn.value

        const gesture = createGesture({
          el,
          gestureName: "my-swipe",
          direction: "y",
          onMove: event => {
            if (mdAndUp.value) {
              return
            }

            // If > 20, must close, otherwise must open
            const newValue = event.deltaY < 20;

            // closing with a downward swipe
            if (opened.value === newValue) {
              return;
            }

            opened.value = newValue;
          }
        });

        // enable the gesture for the item
        gesture.enable(true);
      })

      return {
        toggleDrawer, onNewMessage,
        toggleDrawerBtn,
        opened,
        communication
      }
    }
  });
</script>

<style lang="scss" scoped>
  @import "/src/theme/scss/variables";
  @import "/src/theme/scss/functions";

  // ios doesn't supports contain
  // so the bottom size must be set differently
  @supports not (contain: layout) {
    @include mediaQueryDown(md) {
      .bottom-drawer {
        bottom: calc(var(--toolbar-height) + var(--ion-safe-area-bottom)) !important;
      }
    }

    @include mediaQueryUp(md) {
      // on md and up, must consider the width of the sidebar
      .bottom-drawer {
        right: var(--sidebar-width) !important;
      }
    }
  }

  .bottom-drawer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(calc(100% - 64px));
    transition: transform .4s;

    @include mediaQueryUp(md){
      left: var(--spacer);
      right: var(--spacer);
    }

    > ion-grid {
      background-color: var(--ion-color-secondary);
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      box-shadow: 0 -5px 20px rgba(0, 0, 0, .5);
      max-height: calc(100vh - var(--toolbar-height));

      @include mediaQueryDown(md) {
        max-height: calc(100vh - var(--toolbar-height) - var(--navbar-height));
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
