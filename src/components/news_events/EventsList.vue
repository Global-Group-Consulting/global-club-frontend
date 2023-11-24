<template>
  <no-data v-if="events.length === 0"></no-data>

  <template v-else>

    <ion-list>
      <AdminListItem v-for="event of events" :key="event._id"
                     :title="event.title"
                     :description="event.content"
                     image="ad"
                     :open-link="{name: 'admin.events.show', params: {id: event._id}}"
      >
        <template v-slot:image>
          <Image :source="event.coverImgUrl"></Image>
        </template>

        <template v-slot:description="{description}">
          <span>{{ formatters.truncate(description, 120)}}</span>
          <div>{{ formatters.formatLocaleDate(new Date(event.startAt)) }}</div>
        </template>

        <template v-slot:buttons-start>
          <ion-chip color="danger" v-if="event.isPast" disabled>
            <ion-label>Evento Passato</ion-label>
          </ion-chip>
        </template>
      </AdminListItem>
    </ion-list>

  </template>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue'
import useDataFetcher from '@/composables/dataFetcher'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import NoData from '@/components/NoData.vue'
import AdminListItem from '@/components/lists/AdminListItem.vue'
import Image from '@/components/Image.vue'
import { GlobalEvent } from '@/@types/GlobalEvent'
import { useFormatters } from '@/composables/formatters'


export default defineComponent({
  name: 'EventsList',
  components: { Image, AdminListItem, NoData },
  setup (props, { emit }) {
    useDataFetcher(fetchData)
    const formatters = useFormatters()

    const http = inject('http') as HttpPlugin
    const events: Ref<GlobalEvent[]> = ref([])

    async function fetchData () {
      events.value = await http.api.events.readAll()

      emit('data-fetch', events.value)
    }

    return {
      events,
      formatters
    }
  }
})
</script>

<style scoped>

</style>
