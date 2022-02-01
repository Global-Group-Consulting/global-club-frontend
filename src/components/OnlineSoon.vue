<template>
  <p>
    Presto disponibile!
  </p>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "OnlineSoon",
    props: {
      text: String
    }
  });
</script>

<style scoped>

</style>
