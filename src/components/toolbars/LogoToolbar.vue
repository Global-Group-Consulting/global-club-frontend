<template>
  <ion-header class="logo-toolbar">
    <ion-grid fixed>
      <ion-toolbar color="transparent">
        <ion-img :src="require('/public/assets/logo_full_bicolor.svg')"></ion-img>
      </ion-toolbar>
    </ion-grid>
  </ion-header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: "LogoToolbar"
  });
</script>

<style scoped lang="scss">
  .logo-toolbar {

    ion-grid {
      padding-top: calc(var(--spacer) * 4);
    }

    ion-img {
      margin-left: auto;
      margin-right: auto;
      max-width: 450px;
    }

  }
</style>
