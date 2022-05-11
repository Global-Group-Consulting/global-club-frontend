<template>
  <IonPage>
    <IonContent>
      <LogoToolbar/>

      <BannerPremium></BannerPremium>

      <ion-grid fixed>

        <ion-row class="mb-4">
          <ion-col size="12" sizeMd="6">
            <ion-text color="medium" class="ion-text-left">
              <h6 class="my-0">Bentornat{{ authUser.gender === 'f' ? 'a' : 'o' }},</h6>
              <h4 class="my-0">{{ $store.getters['auth/fullName'] }}</h4>
            </ion-text>
          </ion-col>

          <ion-col size="12" sizeMd="6" class="ion-text-start ion-text-md-end">
            <ion-text color="primary">
              <h4 class="my-0" v-if="userIsPremium">
                Cliente Premium
              </h4>
              <h6 class="my-0" v-if="clubPackExpiration">Scadenza: {{ clubPackExpiration }}</h6>
            </ion-text>
          </ion-col>
        </ion-row>

        <div class="mb-5">
          <SearchBar @update:filters="onSearchUpdate"></SearchBar>
        </div>

        <div class="mb-5">
          <UserStatistics></UserStatistics>
        </div>

        <PrivateOrdersList :statuses="pendingStatuses"
                           title="Stato ordini in corso"
                           no-data-text="Ancora nessun ordine"
        ></PrivateOrdersList>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { User } from '@/@types/User'
import { OrderStatusEnum } from '@/@enums/order.status.enum'
import SearchBar from '@/components/SearchBar.vue'
import PrivateOrdersList from '@/components/lists/orders/PrivateOrdersList.vue'
import LogoToolbar from '@/components/toolbars/LogoToolbar.vue'
import UserStatistics from '@/components/UserStatistics.vue'
import { useRouter } from 'vue-router'
import Filters from '@/composables/filters'
import { PackEnum } from '@/@enums/pack.enum'
import ClubButton from '@/components/ClubButton.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import PageLink from '@/components/PageLink.vue'
import BannerPremium from '@/components/BannerPremium.vue'
import { formatLocaleDate } from '@/@utilities/dates'

export default defineComponent({
  name: 'Dashboard',
  components: { BannerPremium, UserStatistics, LogoToolbar, PrivateOrdersList, SearchBar },
  setup () {
    const store = useStore(storeKey)
    const router = useRouter()
    const alerts = inject('alerts') as AlertsPlugin
    const http = inject('http') as HttpPlugin
    const authUser: ComputedRef<User> = computed(
        () => store.getters['auth/user']
    )
    const firstName = ref<string>(authUser?.value?.firstName)
    const pendingStatuses = [OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS]
    const filtersComposable = Filters()

    const userIsPremium = computed(() => {
      return authUser.value.clubPack === PackEnum.PREMIUM
    })

    /**
     * Check if the user has some Premium pack change order and return the expiration date
     */
    const clubPackExpiration = computed(() => {
      const history = authUser.value.clubPackHistory ?? []
      const lastChange = history[history.length - 1] ?? null

      if (!lastChange) {
        return null
      }

      if (lastChange.pack === PackEnum.PREMIUM && userIsPremium.value) {
        return formatLocaleDate(new Date(lastChange.endsAt), true)
      }

      return null
    })

    function onSearchUpdate (filters) {
      router.push({ name: 'private.products', query: filtersComposable.prepareFilters(filters) })
    }

    async function changePack () {
      const answer = await alerts.ask({
        header: 'Passa a premium!',
        message: 'Gentile utente, state per richiedere il passaggio al Pack Premium. Se desiderate continuare, vi preghiamo di cliccare su \'OK\'.'
      })

      if (!answer.resp) {
        return
      }

      const result = await http.api.users.updatePack(store.getters['auth/user']._id)

      if (result) {
        await store.dispatch('auth/updateUser', {
          clubPackChangeOrder: result.clubPackChangeOrder
        })
      }
    }

    return {
      authUser,
      firstName,
      pendingStatuses, userIsPremium,
      clubPackExpiration,
      onSearchUpdate,
      changePack
    }
  }
})
</script>


<style>

</style>
