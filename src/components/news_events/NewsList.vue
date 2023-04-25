<template>
  <no-data v-if="newsList.length === 0"></no-data>

  <template v-else>
    <ion-row>
      <ion-col v-for="news of newsList" :key="news._id" size="12" size-lg="6" size-xl="4">
        <NewsEventCard :entry="news"></NewsEventCard>
      </ion-col>
    </ion-row>
  </template>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import NewsEventCard from '@/components/news_events/NewsEventCard.vue'
import NoData from '@/components/NoData.vue'
import useDataFetcher from '@/composables/dataFetcher'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export default defineComponent({
  name: 'NewsList',
  components: { NoData, NewsEventCard },
  setup (props) {
    useDataFetcher(fetchData)
    const http = inject('http') as HttpPlugin
    const newsList = ref([])

    async function fetchData () {
      newsList.value = await http.api.news.read()
    }

    return {
      newsList
    }
  }
})
</script>

<style scoped>

</style>
