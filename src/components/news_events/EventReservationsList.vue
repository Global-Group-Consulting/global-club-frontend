<template>
  <paginated-list :paginated-data="reservations">
    <template v-slot="item">
      <ion-list v-if="reservations">
        <AdminListItem v-for="reservation of item.data" :key="reservation._id"
                       :title="reservation.user.firstName + ' ' + reservation.user.lastName"
                       :description="getDescription(reservation)"
                       :open-link="{}"
                       @click="openReservation(reservation)"
        >
          <template v-slot:image>
            <Icon name="user"></Icon>
          </template>

        </AdminListItem>
      </ion-list>

    </template>
  </paginated-list>

</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, unref, watch } from 'vue'
import NoData from '@/components/NoData.vue'
import AdminListItem from '@/components/lists/AdminListItem.vue'
import useDataFetcher from '@/composables/dataFetcher'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { GlobalEventReservation, UpsertEventReservationDto } from '@/@types/GlobalEvent'
import { PaginatedResult } from '@/@types/Pagination'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { modalController } from '@ionic/vue'
import EventReservationModal from '@/components/modals/EventReservationModal.vue'
import PageLink from '@/components/PageLink.vue'

export default defineComponent({
  name: 'EventReservationsList',
  components: { PaginatedList, AdminListItem },
  props: {
    eventId: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    reloadAsap: Boolean,
    isActive: Boolean
  },
  setup (props, { emit }) {
    const http = inject('http') as HttpPlugin
    const reservations: Ref<PaginatedResult<GlobalEventReservation[]> | undefined> = ref()
    const pendingReload = ref(false)

    async function fetchData () {
      if (!props.eventId) {
        return
      }

      reservations.value = await http.api.events.reservations.readAll(props.eventId, props.status)

      emit('update:data', reservations.value)
    }

    function getDescription (reservation: GlobalEventReservation) {
      const toReturn: string[] = []

      if (reservation.companions.length) {
        const postfix = reservation.companions.length > 1 ? 'i' : 'e'

        toReturn.push(reservation.companions.length + ' accompagnator' + postfix)
      }

      return toReturn.join(' | ')
    }

    async function openReservation (reservation: GlobalEventReservation) {
      const modal = await modalController
          .create({
            component: EventReservationModal,
            componentProps: {
              title: 'Modifica prenotazione',
              eventId: props.eventId,
              reservation: Object.assign({}, { ...unref(reservation) })
            }
          })

      await modal.present()

      const result = await modal.onWillDismiss<UpsertEventReservationDto>()

      if (result.role === 'ok') {
        await fetchData()
      }
    }

    watch(() => props.isActive, (value) => {
      if (value) {
        pendingReload.value = true
      }
    })

    watch(() => props.reloadAsap, async (value) => {
      if (!value) {
        return
      }

      pendingReload.value = true
      emit('update:reloadAsap', false)
    }, { immediate: true })

    watch(() => pendingReload.value, async (value) => {
      if (!value) {
        return
      }

      await fetchData()
      pendingReload.value = false
    }, { immediate: true })

    return {
      reservations,
      pendingReload,
      getDescription,
      openReservation
    }
  }
})
</script>

<style scoped lang="scss">

</style>
