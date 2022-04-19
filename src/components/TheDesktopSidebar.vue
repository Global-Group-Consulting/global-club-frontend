<template>
  <div class="main-menu" slot="top">
    <ion-header>
      <ion-toolbar>
        <ion-img :src="require('/public/assets/logo_full_bicolor.svg')"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <MainMenuList :entries-list="desktopEntries" @click="onItemClick"/>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-list>
        <MainMenuList :entries-list="desktopFooterEntries"
                      @click="onItemClick"/>
      </ion-list>
    </ion-footer>
  </div>
</template>


<script lang="ts">
import { useStore } from 'vuex'
import { computed, ComputedRef, defineComponent, inject, onMounted } from 'vue'
import { storeKey } from '@/store'
import { User } from '@/@types/User'
import menuEntries from '@/composables/menuEntries'
import MainMenuList from '@/components/lists/MainMenuList.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export default defineComponent({
  name: 'TheDesktopSidebar',
  components: { MainMenuList },
  setup () {
    const store = useStore(storeKey)
    const http = inject('http') as HttpPlugin
    const { onItemClick, desktopEntries, desktopFooterEntries } = menuEntries()
    const isLoggedIn = computed(() => store.getters['auth/isLoggedIn'])
    const authUser: ComputedRef<User> = computed(() => store.getters['auth/user'])

    function fetchNotificationCounters (interval?: number) {
      setTimeout(() => {
        store.dispatch('notifications/fetchCounters', http)

        fetchNotificationCounters()
      }, interval ?? 10000)
    }

    onMounted(() => {
      fetchNotificationCounters(0)
    })

    return {
      isLoggedIn, authUser,
      onItemClick, desktopEntries, desktopFooterEntries
    }
  }
})


</script>
