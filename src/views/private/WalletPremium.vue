<template>
  <IonPage>
    <TopToolbar :include-back="!userIsAdmin">
      <template v-if="userIsAdmin">
        Wallet N° {{ user?.clubCardNumber }} ({{ formatUserName(user) }})
      </template>
      <template v-else>Wallet N° {{ user?.clubCardNumber }}</template>
    </TopToolbar>

    <IonContent>
      <ion-grid fixed class="overflow-auto">
        <WalletPremiumChipsTable :user-id="userId"></WalletPremiumChipsTable>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { formatUserName } from '@/@utilities/fields'
import WalletPremiumMovementsList from '@/components/lists/WalletPremiumMovementsList.vue'
import WalletPremiumChipsTable from '@/components/lists/WalletPremiumChipsTable.vue'
import { UserBasic } from '@/@types/User'

export default defineComponent({
  name: 'WalletPremium',
  components: { WalletPremiumChipsTable, TopToolbar },
  setup () {
    const $route = useRoute()
    const store = useStore(storeKey)
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const userId = ($route.params.id ?? store.getters['auth/user'].id) as string
    const user: Ref<UserBasic | undefined> = ref()
    const movementsList: Ref<typeof WalletPremiumMovementsList | undefined> = ref()
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
