<template>
  <span class="d-inline-flex ion-align-items-center">
    <BriteIcon class="me-2" v-if="!symbolAfter"/>

    <span>
      {{ formatBrites(value) }}
    </span>

    <BriteIcon class="ms-2" v-if="symbolAfter"/>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BriteIcon from '@/components/BriteIcon.vue';
  import { formatBrites } from '@/@utilities/currency';

  export default defineComponent({
    name: "BriteValue",
    components: { BriteIcon },
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
