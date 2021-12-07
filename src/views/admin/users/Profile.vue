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
                {{ $t("pages.userProfile.lbl_user") }}:
                  <strong>{{ formatUserName(user) }}
                  ({{ user?.clubCardNumber }})</strong>
              </li>
              <li>
                {{ $t("pages.userProfile.lbl_email") }}: <strong>{{ user?.email }}</strong>
              </li>
              <li>
                {{ $t("pages.userProfile.lbl_club_pack") }}: <strong>{{ formatClubPack(user?.clubPack) }}</strong>
              </li>
            </ul>
          </ion-col>
          <ion-col size="12" sizeLg="6" class="pt-0 py-lg-5 mb-5 mb-lg-0">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                {{ $t("pages.userProfile.lbl_role") }}: <strong>{{ formatUserRole(user?.role) }}</strong>
              </li>
              <li>
                {{ $t("pages.userProfile.lbl_ref_agent") }}: <strong>{{ user?.referenceAgent }}</strong>
              </li>
            </ul>
          </ion-col>
        </ion-row>

        <AccordionList :sections="profileSections">
          <template v-slot:content_contract>
            <UserContractForm v-model="user"></UserContractForm>
          </template>

          <template v-slot:content_anagraphic>
            <UserAnagraphicForm v-model="user"></UserAnagraphicForm>
          </template>

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
  // import { AlertsPlugin } from '@/plugins/Alerts';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import { User, UserBasic } from '@/@types/User';
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { UserRoleEnum } from "@/@enums/user.role.enum"
  import MovementsList from '@/components/lists/MovementsList.vue';
  import OrdersList from '@/components/lists/OrdersList.vue';
  import UserContractForm from '@/components/forms/sections/UserContractForm.vue';
  import { formatClubPack, formatUserRole } from '@/@utilities/statuses';
  import UserAnagraphicForm from '@/components/forms/sections/UserAnagraphicForm.vue';
  export default defineComponent({
    name: "Profile",
    components: { UserAnagraphicForm, UserContractForm, OrdersList, MovementsList, AccordionList, TopToolbar },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      // const alerts = inject<AlertsPlugin>('alerts') as AlertsPlugin;
      const user: Ref<User | null> = ref(null)
      const profileSections: Ref<AccordionSection[]> = ref([
        {
          id: "contract",
          text: t("pages.userProfile.tab_contract"),
          open: false,
        },
        {
          id: "anagraphic",
          text: t("pages.userProfile.tab_anagraphic"),
          open: false,
        },
        {
          id: "movements",
          text: t("pages.userProfile.tab_movements"),
          open: false,
        },
        {
          id: "orders",
          text: t("pages.userProfile.tab_orders"),
          open: false,
        }
      ])

      onIonViewWillEnter(async () => {
        const apiCalls: any[] = [
          http.api.users.readProfile(route.params.id as string, true)
        ]

        const results = await Promise.all<UserBasic>(apiCalls as any);
        user.value = results[0] as any
      });

      onIonViewDidLeave(async () => {
        user.value = null
      });

      return {
        user,
        formatUserName, formatClubPack, formatUserRole,
        profileSections,
        UserRoleEnum,
      }
    }
  });
</script>

<style scoped>

</style>
