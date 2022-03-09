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
        <UserStatistics :user-id="userId" :club-pack="user?.clubPack"
                        @update:activeTab="onActiveTabChange"></UserStatistics>

        <ion-row>
          <ion-col size="12" sizeLg="6" class="pb-0 py-lg-5">
            <ul class="ion-text-left my-0 list-simple">
              <li>
                {{ $t("pages.userProfile.lbl_user") }}:
                <strong>{{ formatUserName(user) }}</strong>
                <span class="ms-2" v-if="user?.clubCardNumber">({{ user?.clubCardNumber }})</span>
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
            <MovementsList :user-id="user?._id" show-semester
                           :semester-id="activeTab"></MovementsList>
          </template>

          <template v-slot:content_orders>
            <AdminOrdersList :user-id="user?._id" :limit="6" class="mb-3"
                             :title="$t('sections.orders.last_x_orders', { number: 5 })"></AdminOrdersList>

            <div class="ion-text-center">
              <PageLink :to="{name: 'admin.orders'}" :btn-props="{target: '_blank'}"
                        color="primary" version="outline" icon
                        icon-name="link" icon-position="end">
                {{ $t("sections.orders.show_all_orders") }}
              </PageLink>
            </div>
          </template>
        </AccordionList>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, ref, Ref } from 'vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { formatUserName } from '@/@utilities/fields';
  import { useI18n } from 'vue-i18n';
  import { useRoute } from 'vue-router';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { onIonViewDidLeave, onIonViewWillEnter } from '@ionic/vue';
  import { User, UserBasic } from '@/@types/User';
  import AccordionList, { AccordionSection } from '@/components/AccordionList.vue';
  import { UserRoleEnum } from "@/@enums/user.role.enum"
  import MovementsList from '@/components/lists/MovementsList.vue';
  import UserContractForm from '@/components/forms/sections/UserContractForm.vue';
  import { formatClubPack, formatUserRole } from '@/@utilities/statuses';
  import UserAnagraphicForm from '@/components/forms/sections/UserAnagraphicForm.vue';
  import AdminOrdersList from '@/components/lists/orders/AdminOrdersList.vue';
  import PageLink from '@/components/PageLink.vue';
  import UserStatistics from '@/components/UserStatistics.vue';

  export default defineComponent({
    name: "Profile",
    components: {
      UserStatistics,
      PageLink,
      AdminOrdersList,
      UserAnagraphicForm,
      UserContractForm,
      MovementsList,
      AccordionList,
      TopToolbar
    },
    setup () {
      const { t } = useI18n();
      const route = useRoute();
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const userId = computed(() => route.params.id)
      const activeTab: Ref<string> = ref("");
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

      function onActiveTabChange(newTab: string) {
        activeTab.value = newTab
      }

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
        userId, activeTab,
        onActiveTabChange
      }
    }
  });
</script>

<style scoped>

</style>
