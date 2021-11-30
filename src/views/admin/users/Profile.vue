<template>
  <IonPage>
    <TopToolbar include-back>{{ $t('pages.userProfile.title', { fullName: formatUserName(user) }) }}</TopToolbar>

    <IonContent>
      <IonGrid fixed>
        <!--        <SimpleToolbar>
                  <template v-slot:center>
                    <SimpleToolbarButton :text="$t('pages.userProfile.btn_delete')"/>
                  </template>
                </SimpleToolbar>-->

        <ion-row>
          <ion-col size="12" sizeLg="6" class="pb-0 py-lg-5">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                Utente: <strong>{{ formatUserName(user) }}</strong>
              </li>
              <li>
                Email: <strong>{{ user?.email }}</strong>
              </li>
              <li>
                Pacchetto: <strong>{{ user?.clubPack }}</strong>
              </li>
            </ul>
          </ion-col>
          <ion-col size="12" sizeLg="6" class="pt-0 py-lg-5 mb-5 mb-lg-0">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                Ruolo: <strong>{{ UserRoleEnum[user?.role] }}</strong>
              </li>
              <li>
                Agente di riferimento: <strong>{{ user?.referenceAgent }}</strong>
              </li>
            </ul>
          </ion-col>
        </ion-row>

        <AccordionList :sections="profileSections">
          <template v-slot:content_movements>
            <MovementsList :user-id="user?._id"></MovementsList>
          </template>

          <template v-slot:content_orders>
            <OrdersList :user-id="user?._id"></OrdersList>
          </template>
        </AccordionList>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref } from 'vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { formatUserName } from '@/@utilities/fields';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import { UserBasic } from '@/@types/User';
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { UserRoleEnum } from "@/@enums/user.role.enum"
  import MovementsList from '@/components/lists/MovementsList.vue';
  import OrdersList from '@/components/lists/OrdersList.vue';

  export default defineComponent({
    name: "Profile",
    components: { OrdersList, MovementsList, AccordionList, TopToolbar },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
      const user: Ref<UserBasic | null> = ref(null)
      const profileSections: Ref<AccordionSection[]> = ref([
        {
          id: "contract",
          text: "Contratto",
          open: false,
        },
        {
          id: "anagraphic",
          text: "Anagrafica",
          open: false,
        },
        {
          id: "movements",
          text: "Movimenti",
          open: false,
        },
        {
          id: "orders",
          text: "Ordini",
          open: false,
        }
      ])

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
        formatUserName,
        profileSections,
        UserRoleEnum
      }
    }
  });
</script>

<style scoped>

</style>
