<template>
  <IonPage>
    <TopToolbar include-back>Il mio portfolio</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <UserStatistics :user-id="$store.getters['auth/user'].id"
                        @update:data="onTabsReady"
                        @update:activeTab="onActiveTabChange"></UserStatistics>

        <TabsSlides :tabs-list="tabs" :active-tab="activeTabs">
          <template v-slot:tabSlide_resoconto>
            <PrivateMovementsList :user-id="$store.getters['auth/user'].id"
                                  :semester="activeTabs"></PrivateMovementsList>
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
  import MovementListItem from '@/components/lists/movements/MovementListItem.vue';
  import TabsSlides from '@/components/tabs/TabsSlides.vue';
  import { TabEntry } from '@/@types/TabEntry';
  import { Statistics } from '@/@types/Statistics';
  import { formatSemesterId } from '@/@utilities/statuses';
  import MovementsList from '@/components/lists/MovementsList.vue';
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
      const activeTabs: Ref<string> = ref("");
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
        activeTabs.value = newTab
      }

      return {
        activeTabs, tabs,
        onTabsReady, onActiveTabChange
      }
    },

  });
</script>

<style>

</style>
