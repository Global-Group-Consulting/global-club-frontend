<template>
  <ion-button fill="outline" shape="round">
    {{ text }}
  </ion-button>
</template>

<script>
  export default {
    name: "SimpleToolbarButton",
    props: {
      text: String,
      icon: String
    }
  };
</script>

<style scoped>

</style>
