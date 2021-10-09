<template>
  <ion-menu side="start" content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content >
      <ion-list>
        <ion-item>
          <ion-button @click="$auth.logout()">Logout</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>


<script lang="ts" setup>

</script>

<style scoped>

</style>
