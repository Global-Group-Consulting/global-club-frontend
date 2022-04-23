<template>
  <ion-tab-bar slot="bottom" class="bottom-toolbar">
    <template v-for="(entry, i) in mobileEntries" :key="'btn_tab_' + i">

      <ion-button v-if="!entry.isMainBtn" href="#"
                  class="bottom-toolbar-button"
                  fill="clear"
                  :class="{selected: $route.name === entry.route }"
                  @click.prevent.stop="onItemClick(entry, $event)">
        <div class="button-inner">
          <Icon :name="entry.icon" size="large"></Icon>

          <ion-badge v-show="entry.badge?.value"
                     mode="ios" color="warning">{{ entry.badge }}
          </ion-badge>

          <ion-label>
            <small>{{ entry.label }}</small>
          </ion-label>
        </div>
      </ion-button>

      <ion-button fill="clear" v-else class="bottom-toolbar-center-g"
                  @click="$router.push({name:'private.products'})">
        <Icon name="g-gold"></Icon>
      </ion-button>
    </template>
  </ion-tab-bar>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted } from 'vue'
import menuEntries, { MenuEntry } from '@/composables/menuEntries'
import Icon from '@/components/Icon.vue'
import { storeKey } from '@/store'
import { useStore } from 'vuex'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export default defineComponent({
  name: 'TheMobileToolbar',
  components: { Icon },
  setup () {
    const menuEntries1 = menuEntries()
    const http = inject('http') as HttpPlugin
    const store = useStore(storeKey)

    /*function fetchNotificationCounters (interval?: number) {
      setTimeout(() => {
        store.dispatch('notifications/fetchCounters', http)

        fetchNotificationCounters()
      }, interval ?? 10000)
    }

    onMounted(() => {
      fetchNotificationCounters(0)
    })*/

    return {
      onItemClick: menuEntries1.onItemClick,
      mobileEntries: menuEntries1.mobileEntries
    }
  }
})
</script>

<style scoped>

</style>
