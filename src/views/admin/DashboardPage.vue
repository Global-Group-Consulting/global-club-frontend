<template>
  <ion-page>
    <TopToolbar></TopToolbar>

    <ion-content>
      Dashboard ADMIN component

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/plugins/I18n';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import ClubButton from '@/components/ClubButton.vue';

const { t } = useI18n<{ message: MessageSchema }, 'it'>();

</script>

<style scoped>

</style>
