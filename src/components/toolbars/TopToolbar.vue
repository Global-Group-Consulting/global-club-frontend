<template>
  <ion-header>
    <ion-toolbar color="transparent" class="top-toolbar">
      <ion-buttons slot="start">
        <!--        <ion-menu-button menu="main-menu"></ion-menu-button>-->
        <btn type="icon-only" icon-name="chevron-left" v-if="includeBack"
             @click="$router.back()" color="primary"></btn>
      </ion-buttons>

      <ion-title>
        <slot></slot>
      </ion-title>
    </ion-toolbar>
  </ion-header>

</template>

<script lang="ts">

  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      includeBack: Boolean
    },
    setup () {

      return {}
    }
  })
</script>
