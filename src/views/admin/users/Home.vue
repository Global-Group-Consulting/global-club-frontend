<template>
  <IonPage>
    <top-toolbar>{{$t("pages.users.title")}}</top-toolbar>

    <ion-content>

      <ion-grid fixed>

        <!--        <SimpleToolbar>
                  <template v-slot:center>
                    <SimpleToolbarButton :text="$t('pages.products.btn_add')"
                                         @click="$router.push({name: 'admin.products.new'})"/>
                  </template>
                </SimpleToolbar>-->


        <Tabs :data="tabs">
          <template v-slot:tabSlide_4="{isActive, onDataFetched, tab}">
            <AdminUsersList :role="tab.id" :visible="isActive"
                            @dataFetched="onDataFetched"></AdminUsersList>
          </template>
          <template v-slot:tabSlide_3="{isActive, onDataFetched, tab}">
            <AdminUsersList :role="tab.id" :visible="isActive"
                            @dataFetched="onDataFetched"></AdminUsersList>
          </template>
        </Tabs>

      </ion-grid>
    </ion-content>
  </IonPage>

</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, Ref, ref, watch } from 'vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { UserRoleEnum } from '@/@enums/user.role.enum';
  import { PaginatedResult } from '@/@types/Pagination';
  import PaginationBar from '@/components/PaginationBar.vue';
  import { TabEntry } from '@/@types/TabEntry';
  import { useI18n } from 'vue-i18n';
  import TabsItems from '@/components/tabs/TabsItems.vue';
  import { UserBasic } from '@/@types/User';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { formatUserName } from '@/@utilities/fields';
  import Icon from '@/components/Icon.vue';
  import Tabs from '@/components/tabs/Tabs.vue';
  import AdminUsersList from '@/components/lists/users/AdminUsersList.vue';

  export default defineComponent({
    name: "UsersPage",
    components: { AdminUsersList, Tabs, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>("http") as HttpPlugin
      const { t } = useI18n()

      const tabs: Ref<TabEntry[]> = ref([
        {
          id: UserRoleEnum.CLIENTE.toString(),
          text: t("enums.UserRoleEnum." + UserRoleEnum[UserRoleEnum.CLIENTE]),
          count: 0
        }, {
          id: UserRoleEnum.AGENTE.toString(),
          text: t("enums.UserRoleEnum." + UserRoleEnum[UserRoleEnum.AGENTE]),
          count: 0
        }
      ])

      /**
       * Fetches the counters and store the value in the tabs list
       */
      async function fetchCounters () {
        const result = await http.api.users.readGroups()

        result?.forEach(el => {
          const correspondingTab = tabs.value.find(tab => tab.id === el._id.toString())

          if (correspondingTab) {
            correspondingTab.count = el.count
          }
        })
      }

      onIonViewWillEnter(async () => {
        await Promise.all([
          fetchCounters(),
        ])
      });

      return {
        tabs,
        UserRoleEnum,
        formatUserName
      }
    }
  });
</script>

<style scoped>

</style>
