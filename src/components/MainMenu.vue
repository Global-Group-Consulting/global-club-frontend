<template>
  <ion-menu side="start" content-id="main-content" menu-id="main-menu" autoHide="false">
    <ion-header v-if="isLoggedIn">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="isLoggedIn">
      <ion-list>
        <ion-item>
          <ion-button @click="$auth.logout()">Logout</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>


<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
</script>

<style scoped>

</style>
