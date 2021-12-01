<template>
  <ion-icon :slot="slot" :src="fileUrl" :style="iconStyle" :data-icon="name" :size="size"></ion-icon>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: "Icon",
    props: {
      slot: String,
      name: String,
      color: String,
      size: String as PropType<"small" | "large">
    },
    computed: {
      fileUrl () {
        if (!this.name) {
          return "";
        }

        const url = `/assets/icons/${this.name}.svg`;

        return url;
      },
      iconStyle () {
        if (this.color) {
          return `color: ${this.color}`;
        }

        return "";
      }
    }
  });
</script>

<style scoped>

</style>
