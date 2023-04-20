<template>
  <no-data v-if="!reservations || reservations?.data?.length === 0"
           text="Ancora nessuna prenotazione"></no-data>

  <template v-else>
    <ion-list v-if="reservations">
      <AdminListItem v-for="reservation of reservations.data" :key="reservation._id"
                     :title="reservation.user.firstName + ' ' + reservation.user.lastName"
                     :description="'descrizione'"
                     image="ad"
                     :open-link="{to: 'admin.reservations.show'}"
      >

      </AdminListItem>
    </ion-list>

  </template>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from 'vue'
import NoData from '@/components/NoData.vue'
import AdminListItem from '@/components/lists/AdminListItem.vue'
// import Image from '@/components/Image.vue'
import useDataFetcher from '@/composables/dataFetcher'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { GlobalEventReservation } from '@/@types/GlobalEvent'
import { PaginatedResult } from '@/@types/Pagination'

export default defineComponent({
  name: 'EventReservationsList',
  components: { AdminListItem,  /*AdminListItem,*/ NoData },
  props: {
    eventId: {
      type: String
    }
  },
  setup (props) {
    const http = inject('http') as HttpPlugin
    const reservations: Ref<PaginatedResult<GlobalEventReservation[]> | undefined> = ref()

    async function fetchData () {
      if (!props.eventId) {
        return
      }

      reservations.value = await http.api.events.reservations.readAll(props.eventId)
    }

    watch(() => props.eventId, fetchData)

    return {
      reservations
    }
  }
})
</script>

<style scoped lang="scss">

</style>
