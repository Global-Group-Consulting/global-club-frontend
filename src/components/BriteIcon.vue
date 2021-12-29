<link rel="stylesheet" href="../../../../Downloads/glyphter-font/css/Global-Club.css">
<template>
  <Icon name="brite-logo"></Icon>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "BriteIcon",
    components: { Icon },
    props: {
      size: String as PropType<"small" | "large">
    }
  });
</script>

<style scoped>

</style>
