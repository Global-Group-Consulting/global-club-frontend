<template>
  <ion-button :fill="(fill ? fill : (iconOnly ? 'outline' : (toolbar ? 'clear' : '')))"
              :shape="iconOnly ? 'round' : ''"
              :size="size"
              :expand="expand"
              :color="color"
              :class="{'btn-icon-only': iconOnly, 'btn-toolbar': toolbar}">
    <!-- Mostriamo l'icona solo se è stata specificata una -->
    <icon :slot="iconSlot" :name="iconName" v-if="iconName"></icon>

    <slot v-if="!iconOnly && !toolbar"></slot>

  </ion-button>
</template>

<script>
  export default {
    name: "Btn",
    props: {
      // "normal", "icon-only", "toolbar"
      type: {
        default: "normal",
        type: String
      },
      size: String,
      // 'clear' | 'outline' | 'solid' | 'default'
      fill: String,
      color: String,
      // "end", "start"
      iconPosition: {
        default: "start",
        type: String
      },
      iconName: String,
      // block, full
      expand: String
    },
    computed: {
      iconOnly () {
        return this.type === "icon-only";
      },
      toolbar () {
        return this.type === "toolbar";
      },
      iconSlot () {
        if (this.type === "icon-only") {
          return "icon-only";
        } else if (this.type === "toolbar") {
          return "icon-only";
        }

        return this.iconPosition;
      }
    }
  };
</script>

<style scoped>

</style>
