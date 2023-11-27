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
              <li>
                <ion-skeleton-text animated class="mb-3" style="width: 50%; min-height: 26px"></ion-skeleton-text>
              </li>
              <li>
                <ion-skeleton-text animated style="width: 100%; line-height: 1rem"></ion-skeleton-text>
              </li>
              <li>
                <ion-skeleton-text animated style="width: 40%; line-height: 1rem"></ion-skeleton-text>
              </li>
              <li>
                <ion-skeleton-text animated style="width: 40%; line-height: 1rem"></ion-skeleton-text>
              </li>
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

        <div class="mb-5">
          <h4 class="sticky-text">La mia prenotazione</h4>
          <EventReservationsList :eventId="eventId"
                                 :userId="$store.getters['auth/user']?._id"
                                 :reload-asap="mustReload.includes('user')"
                                 @update:data="onEventReservationsUpdate('user', $event)"
          ></EventReservationsList>
        </div>

        <div v-if="$store.getters['auth/isAgent']">
          <h4 class="sticky-text">Prenotazioni clienti</h4>
          <EventReservationsList :eventId="eventId"
                                 :userId="$store.getters['auth/user']?._id"
                                 :referenceAgent="$store.getters['auth/user']?._id"
                                 :reload-asap="mustReload.includes('clients')"
                                 @update:data="onEventReservationsUpdate('clients')"
          ></EventReservationsList>
        </div>
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
import { UpdateOrderProductDto } from '@/@types/Order'
import EventReservationModal from '@/components/modals/EventReservationModal.vue'
import EventsList from '@/components/news_events/EventsList.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import NewsList from '@/components/news_events/NewsList.vue'
import { TabEntry } from '@/@types/TabEntry'
import { EventReservationStatus } from '@/@enums/event.reservation.status'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

export default defineComponent({
  name: 'Show',
  components: { SimpleToolbarButton, SimpleToolbar, EventReservationsList, Image, TopToolbar },
  setup () {
    useDataFetcher(async () => {
      await fetchEvent()
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
    const userReservation = ref()

    const mustReload = ref<string[]>(['user', 'clients'])

    const actions = computed(() => {
      return [
        {
          icon: '',
          text: 'Prenota il tuo posto',
          if: event.value && !event.value?.isPast && !userReservation.value,
          async click () {
            const modal = await modalController
                .create({
                  component: EventReservationModal,
                  componentProps: {
                    title: 'Prenotazione evento',
                    eventId: event.value?._id,
                    user: store.getters['auth/user']
                  }
                })

            await modal.present()

            const result = await modal.onWillDismiss<UpsertEventReservationDto>()

            if (result.role === 'ok') {
              mustReload.value.push('user')
            }
          }
        }, {
          icon: '',
          text: 'Prenota per un cliente',
          if: event.value && !event.value?.isPast && store.getters['auth/isAgent'],
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

            if (result.role === 'ok') {
              mustReload.value.push('clients')
            }
          }
        }].filter(el => el.if)
    })

    async function fetchEvent () {
      if (!eventId) {
        return
      }

      try {
        event.value = await http.api.events.read(eventId)
      } catch (e) {
        console.log(e)
      }
    }

    function onEventReservationsUpdate (list: string, data?: any) {
      mustReload.value = mustReload.value.filter(el => el !== list)

      if (list === 'user') {
        userReservation.value = data.data.find((el: any) => el.userId === store.getters['auth/user']?._id)
      }
    }

    return {
      eventId,
      event,
      startDate,
      fileHandler,
      formatters,
      actions,
      mustReload,
      activeTab,
      userReservation,
      formatLocaleDate,
      onEventReservationsUpdate
    }
  }
})
</script>

<style scoped lang="scss">
.sticky-text {
  position:        sticky;
  top:             -.5rem;
  z-index:         3;
  background:      rgba(var(--ion-color-primary-rgb), .3);
  padding:         1rem .5rem;
  backdrop-filter: blur(10px);
  border-radius:   .5rem;
  margin-left:     -1rem;
  margin-right:    -1rem;
}
</style>
