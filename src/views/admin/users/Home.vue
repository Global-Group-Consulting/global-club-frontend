<template>
  <IonPage>
    <top-toolbar></top-toolbar>

    <ion-content>

      <ion-grid fixed>

        <!--        <SimpleToolbar>
                  <template v-slot:center>
                    <SimpleToolbarButton :text="$t('pages.products.btn_add')"
                                         @click="$router.push({name: 'admin.products.new'})"/>
                  </template>
                </SimpleToolbar>-->


        <ion-segment v-model="activeTab">
          <ion-segment-button :value="group._id"
                              v-for="group in groupsList" :key="group._id">
            <ion-label>
              {{ $t("enums.UserRoleEnum." + UserRoleEnum[group._id]) }}
              ({{ group.count }})
            </ion-label>
          </ion-segment-button>
        </ion-segment>


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
  import { ReadUserGroupsDto, User } from '@/@types/User';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { UserRoleEnum } from '@/@enums/user.role.enum';
  import { useI18n } from 'vue-i18n';
  import { PaginatedResult } from '@/@types/Pagination';
  import PaginationBar from '@/components/PaginationBar.vue';

  export default defineComponent({
    name: "UsersPage",
    components: { PaginationBar, TopToolbar },
    setup () {
      const http = inject<HttpPlugin>("http") as HttpPlugin
      const { t } = useI18n()

      const paginatedUsersData: Ref<PaginatedResult<User[]>> = ref({} as any);
      const activeTab: Ref<UserRoleEnum> = ref(UserRoleEnum.CLIENTE)
      const groupsList: Ref<ReadUserGroupsDto[]> = ref([])

      const usersList: ComputedRef<User[]> = computed(() => {
        return paginatedUsersData.value.data
      })

      const paginationData: ComputedRef<any> = computed(() => {
        const { data, ...rest } = paginatedUsersData.value

        return {
          ...rest
        }
      })

      async function fetchUsers (page = 1) {
        paginatedUsersData.value = await http.api.user.readAll(activeTab.value, page) ?? {} as any
      }

      async function onPageChanged (newPage: number) {
        await fetchUsers(newPage)
      }

      watch(activeTab, async () => fetchUsers())

      onIonViewWillEnter(async () => {
        groupsList.value = await http.api.user.readGroups() ?? []
        await fetchUsers()
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
