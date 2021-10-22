<template>
  <ion-icon :slot="slot" :src="fileUrl" :style="iconStyle" :data-icon="name"></ion-icon>
</template>

<script>
  export default {
    name: "Icon",
    props: {
      slot: String,
      name: String,
      color: String
    },
    computed: {
      fileUrl () {
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
  };
</script>

<style scoped>

</style>
