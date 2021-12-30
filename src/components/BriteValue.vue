<template>
  <span class="d-inline-flex ion-align-items-center">
    <span v-html="formatBrites(value, symbolAfter ? 'end' : 'start')"></span>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BriteIcon from '@/components/BriteIcon.vue';
  import { formatBrites } from '@/@utilities/currency';

  export default defineComponent({
    name: "BriteValue",
    props: {
      value: Number,
      symbolAfter: Boolean
    },
    setup () {
      return {
        formatBrites
      }
    }
  });
</script>

<style scoped>

</style>
