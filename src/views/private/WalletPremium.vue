<template>
  <IonPage>
    <TopToolbar :include-back="!userIsAdmin">
      <template v-if="userIsAdmin">
        Wallet Premium utente {{ formatUserName(user) }}
      </template>
      <template v-else>Il mio Wallet Premium</template>
    </TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <WalletPremiumStatistics :user-id="userId"
                                 @update:activeTab="onActiveTabChange"
                                 @update:data="onStatisticsUpdate"></WalletPremiumStatistics>

        <div class="py-3"></div>

        <WalletPremiumMovementsList :user-id="userId"
                                    :semester-id="activeTab"
                                    ref="movementsList"
                                    wait-before-fetch
                                    @data:fetched="onMovementsFetched"></WalletPremiumMovementsList>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import NoData from '@/components/NoData.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { formatUserName } from '@/@utilities/fields'
import WalletPremiumStatistics from '@/components/WalletPremiumStatistics.vue'
import WalletPremiumMovementsList from '@/components/lists/WalletPremiumMovementsList.vue'

export default defineComponent({
  name: 'WalletPremium',
  components: { WalletPremiumMovementsList, WalletPremiumStatistics, TopToolbar },
  setup () {
    const $route = useRoute()
    const store = useStore(storeKey)
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const userId = ($route.params.id ?? store.getters['auth/user'].id) as string
    const user = ref()
    const movementsList = ref()
    const userStatistics = ref()
    const activeTab = ref('')
    const userIsAdmin = computed(() => store.getters['auth/isAdmin'])

    function onActiveTabChange (newTab) {
      activeTab.value = newTab
    }

    function onMovementsFetched () {
      userStatistics.value.fetchData()
    }

    function onStatisticsUpdate () {
      // movementsList.value.refreshData()
    }

    onMounted(async () => {
      user.value = await http.api.users.readProfile(userId)
    })

    return {
      userId,
      user,
      activeTab,
      userStatistics,
      movementsList,
      userIsAdmin,
      formatUserName,
      onActiveTabChange,
      onMovementsFetched,
      onStatisticsUpdate
    }
  }
})
</script>
