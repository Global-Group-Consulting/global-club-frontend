<template>
  <IonPage>
    <TopToolbar include-back>Il mio Wallet Brite</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <div class="mb-4">
          <UserStatistics :user-id="$store.getters['auth/user'].id"
                          @update:data="onTabsReady"
                          @update:activeTab="onActiveTabChange"></UserStatistics>
        </div>

        <TabsSlides :tabs-list="tabs" :active-tab="activeTab">
          <template v-for="tab in tabs" :key="tab.id"
                    v-slot:[`tabSlide_${tab.id}`]="{onDataFetched, isActive}">
            <PrivateMovementsList :user-id="$store.getters['auth/user'].id"
                                  :semester="tab.id"
                                  :visible="isActive"
                                  @dataFetched="onDataFetched"></PrivateMovementsList>
          </template>
        </TabsSlides>

      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, Ref, ref } from "vue";
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import UserStatistics from '@/components/UserStatistics.vue';
  import TabsSlides from '@/components/tabs/TabsSlides.vue';
  import { TabEntry } from '@/@types/TabEntry';
  import { Statistics } from '@/@types/Statistics';
  import { formatSemesterId } from '@/@utilities/statuses';
  import PrivateMovementsList from '@/components/lists/movements/PrivateMovementsList.vue';

  export default defineComponent({
    name: "PremiumWallet",
    components: {
      PrivateMovementsList,
      TabsSlides,
      UserStatistics,
      TopToolbar,
    },
    setup () {
      const activeTab: Ref<string> = ref("");
      const data: Ref<Statistics | null> = ref(null);

      const tabs: ComputedRef<TabEntry[]> = computed(() => {
        const toReturn = [{
          id: "resoconto",
          text: "Resoconto"
        }]

        data.value?.semesters.forEach(el => {
          toReturn.push({
            id: el.semesterId,
            text: formatSemesterId(el.semesterId)
          })
        })

        return toReturn;
      })

      function onTabsReady (newData: Statistics) {
        data.value = newData;
      }

      function onActiveTabChange (newTab: string) {
        activeTab.value = newTab
      }

      return {
        activeTab, tabs,
        onTabsReady, onActiveTabChange
      }
    },

  });
</script>

<style>

</style>
