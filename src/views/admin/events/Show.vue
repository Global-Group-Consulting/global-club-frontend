<template>
  <IonPage>
    <TopToolbar include-back></TopToolbar>

    <ion-content>
      <ion-grid fixed>

        <SimpleToolbar>
          <template v-slot:center>
            <SimpleToolbarButton v-for="(action, i) in actions" :key="i"
                                 :text="action.text"
                                 @click="action.click"
            />
          </template>
        </SimpleToolbar>

        <ion-row style="--ion-grid-column-padding: 1rem">
          <ion-col size="12" sizeLg="4" class="pb-0 py-lg-5">
            <div class="position-relative">
              <ion-skeleton-text animated style="min-height: 200px" v-if="!event"></ion-skeleton-text>

              <a :href="event?.coverImgUrl"
                 v-if="event?.coverImgUrl"
                 class="card-image-link"
                 @click="fileHandler.openInNewTab(event.coverImgUrl, $event)"
                 target="_blank">
                <Image :source="event?.coverImgUrl"></Image>
              </a>
            </div>
          </ion-col>
          <ion-col size="12" sizeLg="8" class="pt-0 py-lg-5 mb-5 mb-lg-0">
            <ul class="ion-text-left my-0 list-simple" v-if="!event">
              <li><ion-skeleton-text animated class="mb-3" style="width: 50%; min-height: 26px"></ion-skeleton-text></li>
              <li><ion-skeleton-text animated style="width: 100%; line-height: 1rem"></ion-skeleton-text></li>
              <li><ion-skeleton-text animated style="width: 40%; line-height: 1rem"></ion-skeleton-text></li>
              <li><ion-skeleton-text animated style="width: 40%; line-height: 1rem"></ion-skeleton-text></li>
            </ul>

            <ul class="ion-text-left my-0 list-simple" v-else>
              <li>
                <h1 class="">
                  {{ event?.title }}
                </h1>
              </li>
              <li v-if="event?.content" class="text-large mb-3">
                {{ formatters.truncate(event?.content, 120) }}
              </li>
              <li>Data: <strong>{{ startDate }}</strong></li>
              <li>Luogo: <strong>{{ event?.city }} - {{ event?.place }}</strong></li>
              <li>Posti disponibili: <strong>{{ event?.remainingSeats }}</strong>/<strong>{{
                  event?.seats
                }}</strong></li>
            </ul>
          </ion-col>
        </ion-row>

        <h2>Prenotazioni</h2>

        <Tabs :data="tabs" ref="tabsEl" @update:activeTab="activeTab = $event">
          <template v-slot:tabSlide_pending="{ onDataFetched, tab, isActive}">
            <EventReservationsList :eventId="eventId" status="pending"
                                   :isActive="isActive"
                                   :isPast="event?.isPast"
                                   v-model:reloadAsap="tab.reloadAsap"
                                   @update:data="onEventReservationsUpdate(onDataFetched)"></EventReservationsList>
          </template>
          <template v-slot:tabSlide_accepted="{tab, onDataFetched, isActive}">
            <EventReservationsList :eventId="eventId" status="accepted"
                                   :isActive="isActive"
                                   :isPast="event?.isPast"
                                   v-model:reloadAsap="tab.reloadAsap"
                                   @update:data="onEventReservationsUpdate(onDataFetched)"></EventReservationsList>
          </template>
          <template v-slot:tabSlide_rejected="{tab, onDataFetched, isActive}">
            <EventReservationsList :eventId="eventId" status="rejected"
                                   :isActive="isActive"
                                   :isPast="event?.isPast"
                                   v-model:reloadAsap="tab.reloadAsap"
                                   @update:data="onEventReservationsUpdate(onDataFetched)"></EventReservationsList>
          </template>
        </Tabs>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { useRoute } from 'vue-router'
import { GlobalEvent, UpsertEventReservationDto } from '@/@types/GlobalEvent'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import useDataFetcher from '@/composables/dataFetcher'
import Image from '@/components/Image.vue'
import { formatLocaleDate } from '@/@utilities/dates'
import { useFileHandler } from '@/composables/fileHandler'
import { useFormatters } from '@/composables/formatters'
import EventReservationsList from '@/components/news_events/EventReservationsList.vue'
import SimpleToolbar from '@/components/toolbars/SimpleToolbar.vue'
import SimpleToolbarButton from '@/components/toolbars/SimpleToolbarButton.vue'
import { modalController } from '@ionic/vue'
import EventReservationModal from '@/components/modals/EventReservationModal.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import { TabEntry } from '@/@types/TabEntry'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

export default defineComponent({
  name: 'Show',
  components: { Tabs, SimpleToolbarButton, SimpleToolbar, EventReservationsList, Image, TopToolbar },
  setup () {
    useDataFetcher(async () => {
      await fetchEvent()
      await fetchReservationsCounters()
    })
    const store = useStore(storeKey)

    const http = inject('http') as HttpPlugin
    const router = useRoute()
    const fileHandler = useFileHandler()
    const formatters = useFormatters()
    const eventId = router.params.id as string
    const event: Ref<GlobalEvent | undefined> = ref()
    const activeTab = ref('pending')

    const startDate = computed(() => event.value ? formatters.formatLocaleDate(new Date(event.value.startAt)) : null)
    const activeTabEntry = computed(() => tabs.value.find(tab => tab.id === activeTab.value))

    const tabs: Ref<TabEntry[]> = ref([
      {
        id: 'pending',
        text: 'In Attesa',
        count: 0,
        reloadAsap: true
      }, {
        id: 'accepted',
        text: 'Accettate',
        count: 0,
        reloadAsap: false
      }, {
        id: 'rejected',
        text: 'Rifiutate',
        count: 0,
        reloadAsap: false
      }
    ])

    const actions = computed(() => {
      return [{
        icon: '',
        text: 'Aggiungi prenotazione',
        if: event.value && !event.value?.isPast,
        async click () {
          const modal = await modalController
              .create({
                component: EventReservationModal,
                componentProps: {
                  title: 'Aggiunta manuale prenotazione',
                  eventId: event.value?._id
                }
              })

          await modal.present()

          const result = await modal.onWillDismiss<UpsertEventReservationDto>()

          if (result.role === 'ok' && activeTabEntry.value) {
            activeTabEntry.value.reloadAsap = true
          }
        }
      }, {
        icon: '',
        text: 'Scarica lista partecipazioni',
        if: store.getters['auth/isAdmin'] && event.value?.isPast,
        async click () {
          const fileContent = await http.api.events.getExportAccesses(eventId)

        }
      }].filter(el => el.if)
    })

    async function fetchEvent () {
      if (!eventId) {
        return
      }

      event.value = await http.api.events.read(eventId)
    }

    async function fetchReservationsCounters () {
      if (!eventId) {
        return
      }

      const counters = await http.api.events.reservations.counters(eventId)

      if (event.value) {
        event.value.remainingSeats = counters.remainingSeats
      }

      tabs.value.forEach(tab => {
        tab.count = counters[tab.id] ?? null
      })
    }

    function onEventReservationsUpdate (onDataFetched: () => void) {
      onDataFetched()
      fetchReservationsCounters()
    }

    return {
      eventId,
      event,
      startDate,
      fileHandler,
      formatters,
      actions,
      tabs,
      activeTab,
      formatLocaleDate,
      fetchReservationsCounters,
      onEventReservationsUpdate
    }
  }
})
</script>

<style scoped lang="scss">

</style>
