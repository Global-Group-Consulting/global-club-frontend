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


        <Tabs :tabs-list="groupsList" v-model="activeTab"></Tabs>

        <ion-list>
          <ion-item v-for="user of usersList" :key="user._id">
            <!--            <ion-thumbnail slot="start">
                          <img :src="formatImgUrl(user.thumbnail.id)">
                        </ion-thumbnail>-->

            <ion-label>
              <h2>{{ user.firstName }} {{ user.lastName }}</h2>
              <h4>{{ user.email }}</h4>
            </ion-label>

            <!--            <page-link :to="{ name: 'admin.users.details', params: { id: user._id } }"
                                   :btn-props="{ fill: 'outline', shape: 'round' }">
                          {{ $t("pages.users.btn_open") }}
                        </page-link>-->
          </ion-item>
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
  import Tabs from '@/components/Tabs.vue';
  import { User } from '@/@types/User';

  export default defineComponent({
    name: "UsersPage",
    components: { Tabs, PaginationBar, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>("http") as HttpPlugin
      const { t } = useI18n()

      const paginatedUsersData: Ref<PaginatedResult<User[]>> = ref({} as any);
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

      const usersList: ComputedRef<User[]> = computed(() => {
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
        fetchUsers, onPageChanged
      }
    }
  });
</script>

<style scoped>

</style>
