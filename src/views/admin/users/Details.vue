<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.userDetails.title') }}</TopToolbar>

    <IonContent>
      <IonGrid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton :text="$t('pages.productDetails.btn_delete')"
                                 @click="onDeleteClick"/>
          </template>
        </SimpleToolbar>

      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';

  export default defineComponent({
    name: "Details",
    components: { TopToolbar, SimpleToolbarButton, SimpleToolbar }
  });
</script>

<style scoped>

</style>
