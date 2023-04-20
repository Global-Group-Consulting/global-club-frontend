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
          <span v-html="description"></span>
          <div>{{ formatLocaleDate(new Date(event.startAt)) }}</div>
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
import { formatLocaleDate } from '@/@utilities/dates'
import { GlobalEvent } from '@/@types/GlobalEvent'


export default defineComponent({
  name: 'EventsList',
  components: { Image, AdminListItem, NoData },
  setup (props, { emit }) {
    useDataFetcher(fetchData)

    const http = inject('http') as HttpPlugin
    const events: Ref<GlobalEvent[]> = ref([])

    async function fetchData () {
      events.value = await http.api.events.readAll()

      emit('data-fetch', events.value)
    }

    return {
      events,
      formatLocaleDate
    }
  }
})
</script>

<style scoped>

</style>
