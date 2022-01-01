<template>
  <component :is="component" class="d-inline-flex ion-align-items-center ">
    <span class="ion-text-nowrap" v-html="formatBrites(value, symbolAfter ? 'end' : 'start')"></span>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BriteIcon from '@/components/BriteIcon.vue';
  import { formatBrites } from '@/@utilities/currency';

  export default defineComponent({
    name: "BriteValue",
    props: {
      value: Number,
      symbolAfter: Boolean,
      component: {
        type: String,
        default: "span"
      }
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
