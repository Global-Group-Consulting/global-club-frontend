<template>
  <div class="popper-vue"
       @mouseenter="setOpen(true, $event)"
       @mouseleave="setOpen(false, $event)">
    <slot/>
  </div>

  <ion-popover
      :is-open="isOpenRef"
      css-class="my-popover"
      :show-backdrop="false"
      :event="event"
      :translucent="true"
      :backdropDismiss="false"
      @didDismiss="setOpen(false)"
  >
    <small class="p-2" v-html="tooltip"></small>
  </ion-popover>
</template>

<script lang="ts">
import { Component, defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { createPopper, Instance } from '@popperjs/core'
import { popoverController } from '@ionic/vue'
import { debounce } from 'lodash'

export default defineComponent({
  name: 'Tooltip',
  props: {
    delay: {
      type: Number,
      default: 300
    },
    tooltip: String
  },
  setup (props, { emit }) {
    const isOpenRef = ref(false)
    const event = ref()

    let timer: any = null

    const setOpen = (state: boolean, ev?: Event) => {
      if (!ev) {
        return
      }

      clearTimeout(timer)

      timer = setTimeout(() => {
        isOpenRef.value = state
        event.value = ev
      }, props.delay)
    }

    return {
      isOpenRef, setOpen, event
    }
  }
})

</script>

<style scoped lang="scss">
.popper-vue {
  position: relative;
}
</style>

<style lang="scss">

.my-popover {
  --background: var(--ion-color-secondary);
  --min-width: 50px;
  --box-shadow: 0 3px 10px rgba(var(--ion-color-primary-rgb), .2);
  pointer-events: none;
  margin-top: 6px;

  ion-backdrop {
    display: none;
  }

}
</style>
