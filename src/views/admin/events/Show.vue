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
            <ul class="ion-text-left my-0 list-simple">
              <li>
                <h1 class="">{{ event?.title }}</h1>
              </li>
              <li v-if="event?.content">
                {{ event?.content }}
              </li>
              <li>Data evento: <strong>{{ startDate }}</strong></li>
              <li>Posti disponibili: <strong>{{ event?.seats }}</strong></li>
            </ul>
          </ion-col>
        </ion-row>

        <h2>Prenotazioni</h2>

        <EventReservationsList :eventId="event?._id"></EventReservationsList>

      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { useRoute } from 'vue-router'
import { GlobalEvent } from '@/@types/GlobalEvent'
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

export default defineComponent({
  name: 'Show',
  components: { SimpleToolbarButton, SimpleToolbar, EventReservationsList, Image, TopToolbar },
  setup () {
    useDataFetcher(fetchEvent)

    const http = inject('http') as HttpPlugin
    const router = useRoute()
    const fileHandler = useFileHandler()
    const formatters = useFormatters()
    const eventId = router.params.id as string
    const event: Ref<GlobalEvent | undefined> = ref()

    const startDate = computed(() => event.value ? formatters.formatLocaleDate(new Date(event.value.startAt)) : null)

    const actions = computed(() => {
      return [{
        icon: '',
        text: 'Aggiungi prenotazione',
        if: true,
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
          // const result = await modal.onWillDismiss<UpdateOrderProductDto>()
        }
      }].filter(el => el.if ?? true)
    })

    async function fetchEvent () {
      if (!eventId) {
        return
      }

      event.value = await http.api.events.read(eventId)
    }

    return {
      eventId,
      event,
      startDate,
      fileHandler,
      formatters,
      actions,
      formatLocaleDate
    }
  }
})
</script>

<style scoped lang="scss">

</style>
