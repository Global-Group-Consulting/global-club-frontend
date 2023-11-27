<template>
  <IonPage>
    <TopToolbar>News & Eventi</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <Tabs :data="tabs" ref="tabsEl">
          <template v-slot:tabSlide_events>
            <EventsList @data-fetch="tabsEl?.updateSlider()" ></EventsList>
          </template>
          <template v-slot:tabSlide_news>
            <NewsList></NewsList>
          </template>
        </Tabs>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, Ref, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import NoData from '@/components/NoData.vue'
import NewsEventCard from '@/components/news_events/NewsEventCard.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { onIonViewWillEnter } from '@ionic/vue'
import NewsList from '@/components/news_events/NewsList.vue'
import EventsList from '@/components/news_events/EventsList.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import { TabEntry } from '@/@types/TabEntry'

export default defineComponent({
  name: 'News',
  components: {
    Tabs, EventsList, NewsList,
    TopToolbar
  },
  setup () {
    const tabsEl = ref()
    // const http = inject('http') as HttpPlugin
    const newsList = ref([])
    // let mounted = false

    const tabs: Ref<TabEntry[]> = ref([
      {
        id: 'news',
        text: 'News',
        count: 0
      },
      {
        id: 'events',
        text: 'Eventi',
        count: 0
      }
    ])

    // onIonViewWillEnter(async () => {
    //   if (!mounted) return
    //
    //   newsList.value = await http.api.news.read()
    // })
    //
    // onMounted(async () => {
    //   newsList.value = await http.api.news.read()
    //   mounted = true
    // })

    return {
      tabs, tabsEl,
      newsList
    }
  }

});
</script>

<style>

</style>
