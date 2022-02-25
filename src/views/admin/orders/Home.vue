<template>
  <ion-page>
    <TopToolbar>{{ $t("pages.orders.title") }}</TopToolbar>

    <ion-content>
      <ion-grid fixed>
        <AdminSearchBar class="mb-5" has-advanced-filters
                        main-field="id" placeholder="Indica il numero dell'ordine"
                        @update:filters="onUpdateFilters">
          <template v-slot:advancedFilters="{filters}">
            <ion-row>
              <ion-col size="12" sizeMd="6">
                <FormInputAutocomplete v-model="filters['user']"
                                       :async-options-url="$http.api.users.getUsersOptionsUrl()"
                                       :label="$t('forms.filters.user')"
                >
                </FormInputAutocomplete>
              </ion-col>
              <ion-col size="12" sizeMd="6">
                <FormInputV v-model="filters['status']"
                            component="ion-select"
                            clear-input
                            :label="$t('forms.filters.status')"
                            :options="orderStatusOptions"></FormInputV>
              </ion-col>
            </ion-row>
          </template>
        </AdminSearchBar>

        <AdminOrdersList v-if="hasFilters" :filters="filters" :eager="hasFilters">
        </AdminOrdersList>

        <Tabs :data="tabs" v-show="!hasFilters">
          <template v-slot:tabSlide_pending="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.PENDING]" :visible="isActive"
                             :refresh-asap="refreshAsap"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_inProgress="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.IN_PROGRESS]" :visible="isActive"
                             :refresh-asap="refreshAsap"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_completed="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.COMPLETED]" :visible="isActive"
                             :refresh-asap="refreshAsap"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
          <template v-slot:tabSlide_cancelled="{isActive, onDataFetched}">
            <AdminOrdersList :statuses="[OrderStatusEnum.CANCELLED]" :visible="isActive"
                             :refresh-asap="refreshAsap"
                             @dataFetched="onDataFetched"></AdminOrdersList>
          </template>
        </Tabs>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, inject, Ref, ref} from 'vue';
import {IonPage, onIonViewWillEnter} from '@ionic/vue';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import {Order} from '@/@types/Order';
import {PaginatedResult} from '@/@types/Pagination';
import {formatLocaleDate} from "@/@utilities/dates"
import {formatOrderStatus} from "@/@utilities/statuses"
import {OrderStatusEnum} from '@/@enums/order.status.enum';
import {useI18n} from 'vue-i18n';
import {TabEntry} from '@/@types/TabEntry';
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import Tabs from '@/components/tabs/Tabs.vue';
import AdminOrdersList from '@/components/lists/orders/AdminOrdersList.vue';
import AdminSearchBar from "@/components/AdminSearchBar.vue";
import FormInputV from "@/components/forms/FormInputV.vue";
import {SelectOption} from "@/@types/Form";
import FormInputAutocomplete from "@/components/forms/FormInputAutocomplete.vue";

export default defineComponent({
  name: "OrdersPage",
  components: {FormInputAutocomplete, FormInputV, AdminSearchBar, AdminOrdersList, Tabs, TopToolbar, IonPage},
  setup() {
    const http: HttpPlugin = inject<HttpPlugin>('http') as HttpPlugin;
    const {t} = useI18n();
    const ordersList: Ref<Order[]> = ref([])
    const paginationData: Ref<Partial<PaginatedResult>> = ref({})
    const activeTab = ref(OrderStatusEnum.PENDING);
    const filters = ref({});
    const refreshAsap = ref(false);
    const hasFilters = computed(() => Object.keys(filters.value).length > 0)
    const tabs: Ref<TabEntry[]> = ref(Object.values(OrderStatusEnum).map(key => {
      return {
        id: key,
        text: t("enums.OrderStatusEnum." + key),
        count: 0
      }
    }));

    const orderStatusOptions: ComputedRef<SelectOption[]> = computed(() => {
      return Object.keys(OrderStatusEnum).reduce((acc, curr) => {
        acc.push({
          text: t("enums.OrderStatusEnum." + OrderStatusEnum[curr]),
          value: OrderStatusEnum[curr]
        })

        return acc
      }, [] as SelectOption[])
    })

    /**
     * Fetches the counters and store the value in the tabs list
     */
    async function fetchCounters(filters?: any) {
      const result = await http.api.orders.readCounters(filters)

      result?.forEach(el => {
        const correspondingTab = tabs.value.find(tab => tab.id === el._id)

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
      refreshAsap.value = true;

      // Fetch counters and actual data for the current tab
      await Promise.all([
        fetchCounters(),
      ])

      refreshAsap.value = false;
    })

    return {
      ordersList,
      paginationData,
      tabs,
      activeTab,
      formatLocaleDate, formatOrderStatus,
      OrderStatusEnum, orderStatusOptions,
      onUpdateFilters,
      hasFilters, filters,
      refreshAsap
    }
  }
});
</script>

<style scoped>
</style>
