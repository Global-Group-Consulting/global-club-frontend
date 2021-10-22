<template>
  <div class="simple-toolbar">
    <div class="toolbar-left">
      <slot name="left">
      </slot>
    </div>

    <div class="toolbar-center">
      <slot name="center">

      </slot>
    </div>

    <div class="toolbar-right">
      <slot name="right">

      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SimpleToolbar",
    props: {

    }
  };
</script>

<style scoped>

</style>
