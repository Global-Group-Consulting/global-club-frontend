<template>
  <IonPage>
    <TopToolbar>Notifiche</TopToolbar>

    <IonContent>
      <ion-grid fixed>

        <Tabs :data="tabs">
          <template v-slot:tabSlide_unread="{isActive, onDataFetched}">
            <NotificationsList :read="false" :visible="isActive"
                               ref="unreadNotificationsList"
                               :refresh-asap="refreshAsap || mustRefresh.read"
                               show-read-all-btn
                               @dataFetched="onTabDataFetched('read', onDataFetched)"
                               @notificationUpdated="onNotificationUpdated('unread')"></NotificationsList>
          </template>
          <template v-slot:tabSlide_read="{isActive, onDataFetched}">
            <NotificationsList :read="true" :visible="isActive"
                               :refresh-asap="refreshAsap || mustRefresh.unread"
                               @dataFetched="onTabDataFetched('unread', onDataFetched)"
                               @notificationUpdated="onNotificationUpdated('read')"></NotificationsList>
          </template>
        </Tabs>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import NotificationsList from '@/components/lists/NotificationsList.vue'
import Tabs from '@/components/tabs/Tabs.vue'
import { onIonViewWillEnter } from '@ionic/vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

export default defineComponent({
  name: 'Notifications',
  components: { Tabs, NotificationsList, TopToolbar },
  setup () {
    const http = inject('http') as HttpPlugin
    const unreadNotificationsList = ref<typeof NotificationsList>()
    const store = useStore(storeKey)
    const refreshAsap = ref(false)
    const mustRefresh = ref({
      unread: false,
      read: false
    })

    const tabs = computed(() => {
      return [
        {
          id: 'unread',
          text: 'Da leggere',
          icon: 'eye-off'
        },
        {
          id: 'read',
          text: 'Lette',
          icon: 'eye'
        }
      ]
    })

    function onTabDataFetched (refreshed: string, callback: () => void) {
      mustRefresh.value[refreshed] = false
      callback()
    }

    function onNotificationUpdated (status: string) {
      mustRefresh.value[status] = true

      store.dispatch('notifications/fetchCounters')
    }

    onIonViewWillEnter(async () => {
      if(!unreadNotificationsList.value?.refreshAsap){
        unreadNotificationsList.value?.fetchData()
      }
    })

    return {
      tabs,
      refreshAsap,
      onTabDataFetched,
      onNotificationUpdated,
      mustRefresh,
      unreadNotificationsList
    }
  }
})
</script>

<style scoped>

</style>
