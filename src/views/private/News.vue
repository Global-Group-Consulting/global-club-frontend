<template>
  <IonPage>
    <TopToolbar>News & Eventi</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <no-data v-if="newsList.length === 0"></no-data>

        <template v-else>
          <ion-row>
            <ion-col v-for="news of newsList" :key="news._id" size="12" size-lg="6" size-xl="4">
              <NewsEventCard :entry="news"></NewsEventCard>
            </ion-col>
          </ion-row>
        </template>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import NoData from '@/components/NoData.vue'
import NewsEventCard from '@/components/news_events/NewsEventCard.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { onIonViewWillEnter } from '@ionic/vue'

export default defineComponent({
  name: 'News',
  components: {
    NewsEventCard,
    NoData,
    TopToolbar
  },
  setup () {
    const http = inject('http') as HttpPlugin
    const newsList = ref([])
    let mounted = false

    onIonViewWillEnter(async () => {
      if (!mounted) return

      newsList.value = await http.api.news.read()
    })

    onMounted(async () => {
      newsList.value = await http.api.news.read()
      mounted = true
    })

    return {
      newsList
    }
  }

});
</script>

<style>

</style>
