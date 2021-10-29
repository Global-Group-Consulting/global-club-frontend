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
          <ion-segment-button :value="group.enum"
                              v-for="group in groupsList" :key="group.enum">
            <ion-label>{{ group.text }}</ion-label>
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
      </ion-grid>
    </ion-content>
  </IonPage>

</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, Ref, ref } from 'vue';
  import { onIonViewWillEnter } from '@ionic/vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { User } from '@/@types/User';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { UserRoleEnum } from '@/@enums/user.role.enum';
  import { UserGroup } from '@/plugins/httpCalls/UserApis';
  import { useI18n } from 'vue-i18n';
  import { Computed } from 'vuex';

  export default defineComponent({
    name: "UsersPage",
    components: { TopToolbar },
    setup () {
      const http = inject<HttpPlugin>("http") as HttpPlugin
      const { t } = useI18n()

      const usersList: Ref<User[]> = ref([]);
      const usersData: Ref<UserGroup[]> = ref([]);
      const activeTab: Ref<UserRoleEnum> = ref(UserRoleEnum.CLIENTE)

      const groupsList: ComputedRef<{ enum: number; code: string; text: string }[]> = computed(() => {
        return usersData.value.map(el => {
          return {
            enum: el.id,
            code: UserRoleEnum[+el.id],
            text: t("enums.UserRoleEnum." + UserRoleEnum[+el.id])
          }
        })
      })

      /*

      Occorre cambiare approccio e creare degli api specifici che ritornano:
      - solo la lista dei gruppi
      - solo un gruppo di utentei e solo i primi 30, paginati.
        - La paginazione deve essere fatta lato server.
      - al cambio tab, scarica gli utentei di quella tab.
       */

      onIonViewWillEnter(async () => {
        usersData.value = await http.api.user.readAll() ?? []
      });

      return {
        usersList, groupsList, activeTab
      }
    }
  });
</script>

<style scoped>

</style>
