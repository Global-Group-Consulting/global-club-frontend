<template>
  <TopToolbar></TopToolbar>

  <!-- must use fixed to prevent contianer from beeing too large -->
  <ion-grid fixed>
    <SimpleToolbar>
      <template v-slot:center>
        <ion-button @click="$router.push({name: 'admin.products.new'})">
          {{ t("pages.products.btn_add") }}
        </ion-button>
      </template>
    </SimpleToolbar>


    <ion-list>

      <ion-item>
        cell 1
      </ion-item>
    </ion-list>
  </ion-grid>
</template>

<script lang="ts" setup>
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import { useI18n } from 'vue-i18n';
  import { inject, onMounted } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';

  const { t } = useI18n();
  const http = inject<HttpPlugin>('http');

  onMounted(async () => {
    const result = await http?.api.products.readAll();

    console.log(result);
  });
</script>

<style scoped>

</style>
