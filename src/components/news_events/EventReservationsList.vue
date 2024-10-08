<template>
  <PaginatedList :paginated-data="reservations" :visible="true"
                 v-slot:default="{data}"
                 @pageChanged="onPageChanged">
    <ion-list>
      <AdminListItem v-for="reservation of data" :key="reservation._id"
                       :title="reservation.user?.firstName + ' ' + reservation.user?.lastName"
                       :description="getDescription(reservation)"
                       :open-link="{}"
                       @click="openReservation(reservation)"
        >
          <template v-slot:image>
            <Icon name="user"></Icon>
          </template>

        <template v-slot:buttons-start>
          <ion-chip :color="getStatusBadgeColor(reservation)" disabled>
            {{ $t('enums.EventReservationStatus.' + reservation?.status) }}
          </ion-chip>
        </template>

        </AdminListItem>
      </ion-list>
  </PaginatedList>

</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref, ref, unref, watch } from 'vue'
import AdminListItem from '@/components/lists/AdminListItem.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { GlobalEventReservation, UpsertEventReservationDto } from '@/@types/GlobalEvent'
import { PaginatedResult } from '@/@types/Pagination'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { modalController } from '@ionic/vue'
import EventReservationModal from '@/components/modals/EventReservationModal.vue'
import { EventReservationStatus } from '@/@enums/event.reservation.status'

export default defineComponent({
  name: 'EventReservationsList',
  components: { PaginatedList, AdminListItem },
  props: {
    eventId: {
      type: String
    },
    status: {
      type: String
    },
    userId: {
      type: String
    },
    referenceAgent: {
      type: String
    },
    reloadAsap: Boolean,
    isActive: Boolean,
    isPast: Boolean
  },
  setup (props, { emit }) {
    const http = inject('http') as HttpPlugin
    const reservations: Ref<PaginatedResult<GlobalEventReservation[]> | undefined> = ref()
    const pendingReload = ref(false)

    function getStatusBadgeColor (reservation: any) {
      switch (reservation?.status) {
        case EventReservationStatus.ACCEPTED:
          return 'success'
        case EventReservationStatus.PENDING:
          return 'warning'
        case EventReservationStatus.REJECTED:
          return 'danger'
        default:
          return ''
      }
    }

    async function fetchData (newPage?: number) {
      if (!props.eventId) {
        return
      }

      reservations.value = await http.api.events.reservations.readAll({
        eventId: props.eventId,
        page: newPage,
        status: props.status,
        userId: props.userId,
        referenceAgent: props.referenceAgent
      })

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
            cssClass: 'modal-large',
            componentProps: {
              title: 'Modifica prenotazione',
              eventId: props.eventId,
              reservation: Object.assign({}, { ...unref(reservation) }),
              isPast: props.isPast
            }
          })

      await modal.present()

      const result = await modal.onWillDismiss<UpsertEventReservationDto>()

      if (result.role === 'ok') {
        await fetchData()
      }
    }

    function onPageChanged (newPage: number) {
      fetchData(newPage)
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
      getStatusBadgeColor,
      getDescription,
      openReservation,
      onPageChanged
    }
  }
})
</script>

<style scoped lang="scss">

</style>
