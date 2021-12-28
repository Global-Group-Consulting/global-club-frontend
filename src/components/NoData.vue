<template>
  <p>
    <template v-if="text">{{text}}</template>
    <template v-else>Nessun dato disponibile</template>
  </p>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "NoData",
    props: {
      text: String
    }
  });
</script>

<style scoped>

</style>
