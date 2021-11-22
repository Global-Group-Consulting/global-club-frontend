<template>
  <ion-button :fill="(fill ? fill : (iconOnly ? 'outline' : (toolbar ? 'clear' : '')))"
              :shape="iconOnly ? 'round' : ''"
              :size="size"
              :expand="expand"
              :color="color"
              :class="{'btn-icon-only': iconOnly, 'btn-toolbar': toolbar}"
              :title="tooltip">
    <!-- Mostriamo l'icona solo se è stata specificata una -->
    <icon :slot="iconSlot" :name="iconName" v-if="iconName"></icon>

    <slot v-if="!iconOnly && !toolbar"></slot>

  </ion-button>
</template>

<script lang="ts">
  import { computed, PropType } from 'vue';

  export default {
    name: "Btn",
    props: {
      // "normal", "icon-only", "toolbar"
      type: {
        default: "normal",
        type: String as PropType<"normal" | "icon-only" | "toolbar">
      },
      size: String,
      // 'clear' | 'outline' | 'solid' | 'default'
      fill: String as PropType<'clear' | 'outline' | 'solid' | 'default'>,
      color: String,
      // "end", "start"
      iconPosition: {
        default: "start",
        type: String
      },
      iconName: String,
      // block, full
      expand: String as PropType<"block" | "full">,
      tooltip: String
    },
    setup (props) {
      const iconOnly = computed(() => {
        return props.type === "icon-only";
      });

      const toolbar = computed(() => {
        return props.type === "toolbar";
      });

      const iconSlot = computed(() => {
        if (props.type === "icon-only") {
          return "icon-only";
        } else if (props.type === "toolbar") {
          return "icon-only";
        }

        return props.iconPosition;
      });

      return {
        iconOnly,
        toolbar,
        iconSlot
      }
    },
  };
</script>

<style scoped>

</style>
