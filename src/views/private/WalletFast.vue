<template>
  <IonPage>
    <TopToolbar :include-back="!userIsAdmin">
      <template v-if="userIsAdmin">
        Wallet Fast utente {{ formatUserName(user) }}
      </template>
      <template v-else>Il mio Wallet FAST</template>
    </TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <UserStatistics :user-id="userId"
                        club-pack="fast"
                        only-fast
                        ref="userStatistics"
                        @update:activeTab="onActiveTabChange"
                        @update:data="onStatisticsUpdate"></UserStatistics>

        <div class="py-3"></div>

        <MovementsList :user-id="userId"
                       show-semester
                       only-fast
                       ref="movementsList"
                       :semester-id="activeTab"
                       @data:fetched="onMovementsFetched"></MovementsList>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { useRoute } from 'vue-router'
import UserStatistics from '@/components/UserStatistics.vue'
import MovementsList from '@/components/lists/MovementsList.vue'
import { formatUserName } from '@/@utilities/fields'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

export default defineComponent({
  name: 'WalletPremium',
  components: { MovementsList, UserStatistics, TopToolbar },
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
      movementsList.value.refreshData()
    }

    onMounted(async () => {
      user.value = await http.api.users.readProfile(userId)
      // const resp = await http.api.movements.getFastStatistics(userId)
    })

    return {
      userId,
      user,
      activeTab,
      userStatistics,
      movementsList,
      userIsAdmin,
      onActiveTabChange,
      onMovementsFetched,
      onStatisticsUpdate,
      formatUserName
    }
  }
})
</script>
