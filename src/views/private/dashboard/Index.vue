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
              <h4 class="my-0">{{ $store.getters['auth/fullName'] }}
                <small v-if="authUser.clubCardNumber">({{ authUser.clubCardNumber }})</small>
              </h4>
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
import { useRoute, useRouter } from 'vue-router'
import Filters from '@/composables/filters'
import { PackEnum } from '@/@enums/pack.enum'
import ClubButton from '@/components/ClubButton.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import PageLink from '@/components/PageLink.vue'
import BannerPremium from '@/components/BannerPremium.vue'
import { formatLocaleDate } from '@/@utilities/dates'
import { onIonViewDidEnter, onIonViewWillEnter } from '@ionic/vue'
import { useUpdateToPremium } from '@/composables/updateToPremium'

export default defineComponent({
  name: 'Dashboard',
  components: { BannerPremium, UserStatistics, LogoToolbar, PrivateOrdersList, SearchBar },
  setup () {
    const store = useStore(storeKey)
    const router = useRouter()
    const route = useRoute()
    const updatePack = useUpdateToPremium()
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

      if (lastChange.pack === PackEnum.PREMIUM && userIsPremium.value && lastChange.endsAt) {
        return formatLocaleDate(new Date(lastChange.endsAt), true)
      }

      return null
    })

    function onSearchUpdate (filters) {
      router.push({ name: 'private.products', query: filtersComposable.prepareFilters(filters) })
    }

    onIonViewWillEnter(() => {
      if (route.query.updateToPremium) {
        updatePack.changePack()
      }
    })

    return {
      authUser,
      firstName,
      pendingStatuses, userIsPremium,
      clubPackExpiration,
      onSearchUpdate,
    }
  }
})
</script>


<style>

</style>
