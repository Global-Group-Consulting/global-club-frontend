<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.userProfile.title', { fullName: formatUserName(user) }) }}</TopToolbar>

    <IonContent>
      <IonGrid fixed>
        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton :text="$t('pages.userProfile.btn_delete')"/>
          </template>
        </SimpleToolbar>

      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref } from 'vue';
  import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue';
  import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { formatUserName } from '@/@utilities/fields';
  import { useI18n } from 'vue-i18n';
  import { useRoute, useRouter } from 'vue-router';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import { ProductCategory } from '@/@types/ProductCategory';
  import { Product } from '@/@types/Product';
  import { UserBasic } from '@/@types/User';

  export default defineComponent({
    name: "Profile",
    components: { TopToolbar, SimpleToolbarButton, SimpleToolbar },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const router = useRouter();
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
      const user: Ref<UserBasic | null> = ref(null)

      onIonViewWillEnter(async () => {
        const apiCalls: any[] = [
          http.api.users.readProfile(route.params.id as string)
        ]

        const results = await Promise.all<UserBasic>(apiCalls as any);
        user.value = results[0]
      });

      onIonViewDidLeave(async () => {
        user.value = null
      });

      return {
        user,
        formatUserName
      }
    }
  });
</script>

<style scoped>

</style>
