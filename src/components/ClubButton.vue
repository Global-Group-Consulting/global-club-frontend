<template>
  <ion-button :fill="fill" shape="round" :size="size" :expand="expand"
              :color="color" :type="type" v-bind="$attrs">
    <icon :slot="iconSlot" :name="iconName" v-if="icon" :size="iconSize"></icon>

    <slot v-if="!onlyIcon"></slot>
  </ion-button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ClubButton',
  props: {
    version: {
      type: String as PropType<'solid' | 'outline' | 'link'>
    },
    color: {
      type: String as PropType<'primary' | 'secondary' | 'light'>,
      default: 'primary'
    },
    size: {
      type: String as PropType<'small' | 'default' | 'large'>,
      default: 'default'
    },
    expanded: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String as PropType<'start' | 'end'>,
      default: 'start'
    },
    iconSize: {
      type: String as PropType<'small' | 'large'>,
      default: ''
    },
    iconName: {
      type: String,
      default: 'image'
    },
    icon: Boolean,
    onlyIcon: Boolean,

    type: {
      type: String as PropType<'button' | 'submit'>,
      default: 'button'
    }
  },
  setup (props) {
    const fill = computed(() => {
      let toReturn

      switch (props.version) {
        case 'solid':
        case 'outline':
          toReturn = props.version
          break
        case 'link':
          toReturn = 'clear'
          break
        default:
          toReturn = 'solid'
      }

      return toReturn
    })
    const iconSlot = computed(() => {
      if (props.onlyIcon) {
        return 'icon-only'
      }
      return props.iconPosition
    })
    const expand = computed(() => {
      return props.expanded ? 'block' : ''
    })

    return {
      fill, iconSlot, expand
    }
  }
})
</script>

<style scoped>

</style>
