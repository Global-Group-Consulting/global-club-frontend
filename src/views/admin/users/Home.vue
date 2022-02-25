<template>
  <IonPage>
    <top-toolbar>{{$t("pages.users.title")}}</top-toolbar>

    <ion-content>
      <ion-grid fixed>
        <AdminSearchBar class="mb-5" has-advanced-filters
                        main-field="user"
                        placeholder="Indica il nome dell'utente"
                        @update:filters="onUpdateFilters">
          <template v-slot:advancedFilters="{filters}">
            <ion-row>
              <ion-col size="12" sizeMd="6">
                <FormInputV v-model="filters['email']"
                            :label="$t('forms.filters.email')"
                >
                </FormInputV>
              </ion-col>
              <ion-col size="12" sizeMd="6">
                <FormInputV v-model="filters['clubPack']"
                            component="ion-select"
                            clear-input
                            :label="$t('forms.filters.clubPack')"
                            :options="clubPackOptions"></FormInputV>
              </ion-col>
            </ion-row>
          </template>
        </AdminSearchBar>

        <AdminUsersList v-if="hasFilters" :filters="filters" :eager="hasFilters">
        </AdminUsersList>

        <Tabs :data="tabs" v-show="!hasFilters">
          <template v-slot:tabSlide_4="{isActive, onDataFetched, tab}">
            <AdminUsersList :role="+tab.id" :visible="isActive"
                            @dataFetched="onDataFetched"></AdminUsersList>
          </template>
          <template v-slot:tabSlide_3="{isActive, onDataFetched, tab}">
            <AdminUsersList :role="+tab.id" :visible="isActive"
                            @dataFetched="onDataFetched"></AdminUsersList>
          </template>
        </Tabs>

      </ion-grid>
    </ion-content>
  </IonPage>

</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, inject, Ref, ref} from 'vue';
import {onIonViewWillEnter} from '@ionic/vue';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {UserRoleEnum} from '@/@enums/user.role.enum';
import {TabEntry} from '@/@types/TabEntry';
import {useI18n} from 'vue-i18n';
import {formatUserName} from '@/@utilities/fields';
import Tabs from '@/components/tabs/Tabs.vue';
import AdminUsersList from '@/components/lists/users/AdminUsersList.vue';
import AdminSearchBar from "@/components/AdminSearchBar.vue";
import FormInputV from "@/components/forms/FormInputV.vue";
import {SelectOption} from "@/@types/Form";
import {OrderStatusEnum} from "@/@enums/order.status.enum";
import ClubButton from "@/components/ClubButton.vue";
import {PackEnum} from "@/@enums/pack.enum";

export default defineComponent({
  name: "UsersPage",
  components: {FormInputV, AdminSearchBar, AdminUsersList, Tabs, TopToolbar},
  setup() {
    const http = inject<HttpPlugin>("http") as HttpPlugin
    const {t} = useI18n()
    const filters = ref({});
    const refreshAsap = ref(false);
    const hasFilters = computed(() => Object.keys(filters.value).length > 0)

    const clubPackOptions: ComputedRef<SelectOption[]> = computed(() => {
      return Object.keys(PackEnum).reduce((acc, curr) => {
        if (PackEnum[curr] === PackEnum.NONE) {
          return acc;
        }

        acc.push({
          text: t("enums.PackEnum." + PackEnum[curr]),
          value: PackEnum[curr]
        })

        return acc
      }, [] as SelectOption[])
    })

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
    async function fetchCounters() {
      const result = await http.api.users.readGroups()

      result?.forEach(el => {
        const correspondingTab = tabs.value.find(tab => tab.id === el._id.toString())

        if (correspondingTab) {
          correspondingTab.count = el.count
        }
      })
    }

    async function onUpdateFilters(newFilters: any) {
      if (JSON.stringify(filters.value) !== JSON.stringify(newFilters)) {
        filters.value = newFilters;
      }
    }

    onIonViewWillEnter(async () => {
      await Promise.all([
        fetchCounters(),
      ])
    });

    return {
      tabs,
      UserRoleEnum,
      formatUserName,
      onUpdateFilters, filters, refreshAsap, hasFilters, clubPackOptions
    }
  }
  });
</script>

<style scoped>

</style>
