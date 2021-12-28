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


        <TabsItems :tabs-list="groupsList" v-model.number="activeTab"></TabsItems>

        <ion-list>
          <AdminListItem v-for="user of usersList" :key="user._id"
                         :title="formatUserName(user)"
                         :description="user.email"
                         :open-link="{ name:'admin.users.profile', params: { id: user._id } }"
                         :open-link-label="$t('pages.users.btn_open')"
          >
            <template v-slot:image>
              <Icon :name="activeTab === UserRoleEnum.CLIENTE ? 'user' : 'user-2'"></Icon>
            </template>
          </AdminListItem>
        </ion-list>

        <pagination-bar :paginationData="paginationData" @pageChanged="onPageChanged"></pagination-bar>
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

  export default defineComponent({
    name: "UsersPage",
    components: { Icon, AdminListItem, TabsItems, PaginationBar, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>("http") as HttpPlugin
      const { t } = useI18n()

      const paginatedUsersData: Ref<PaginatedResult<UserBasic[]>> = ref({} as any);
      const activeTab: Ref<UserRoleEnum> = ref(UserRoleEnum.CLIENTE)
      const groupsList: Ref<TabEntry[]> = ref([
        {
          id: UserRoleEnum.CLIENTE,
          text: t("enums.UserRoleEnum." + UserRoleEnum[UserRoleEnum.CLIENTE]),
          count: 0
        }, {
          id: UserRoleEnum.AGENTE,
          text: t("enums.UserRoleEnum." + UserRoleEnum[UserRoleEnum.AGENTE]),
          count: 0
        }
      ])

      const usersList: ComputedRef<UserBasic[]> = computed(() => {
        return paginatedUsersData.value.data
      })

      const paginationData: ComputedRef<any> = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, ...rest } = paginatedUsersData.value

        return {
          ...rest
        }
      })

      async function fetchUsers (page = 1) {
        paginatedUsersData.value = await http.api.users.readAll(activeTab.value, page) ?? {} as any
      }

      async function onPageChanged (newPage: number) {
        await fetchUsers(newPage)
      }

      watch(activeTab, async () => fetchUsers())

      onIonViewWillEnter(async () => {
        const result = await Promise.all([
          http.api.users.readGroups(),
          fetchUsers()
        ])

        groupsList.value.forEach(entry => {
          const fetchedGroups = result[0];
          const group = fetchedGroups?.find(el => el._id === entry.id);

          if (group) {
            entry.count = group.count
          }
        })
      });

      return {
        usersList, groupsList, activeTab, paginationData,
        UserRoleEnum,
        fetchUsers, onPageChanged,
        formatUserName
      }
    }
  });
</script>

<style scoped>

</style>
