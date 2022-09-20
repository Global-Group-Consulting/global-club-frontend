<template>
  <IonPage>
    <TopToolbar include-back>Il mio profilo</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <ion-item class="list-item-transparent mb-4" lines="none">
          <ion-avatar slot="start">
            <ion-img src="/assets/user_placeholder.png"/>
          </ion-avatar>

          <ion-label>
            <h2 class="font-bold">{{ userName }}</h2>
            <h5>Pacchetto {{ userActivePack }}</h5>
          </ion-label>
        </ion-item>

        <ion-list v-for="(group, g) in listGroups" :key="g" class="mb-4 py-3" mode="ios" lines="full">
          <ion-list-header class="mb-3">{{ group.title }}</ion-list-header>

          <ion-item v-for="(item, i) in group.childs" :key="`${g}_${i}`"
                    :button="item.route || item.click"
                    @click.stop.prevent="onItemClick(item)"
                    :disabled="item.disabled"
                    v-show="item.hasOwnProperty('if') ? item.if : true">
            <Icon :name="item.icon" slot="start"></Icon>

            {{ item.label }}

            <template v-if="item.slot === 'notification-popup' ">
              <ion-toggle slot="end" @ionChange="onToggleChange(item, $event)"
                          :checked="item.value"></ion-toggle>
            </template>
          </ion-item>
        </ion-list>

      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, ref } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { formatClubPack } from '@/@utilities/statuses'
import menuEntries, { MenuEntry } from '@/composables/menuEntries'
import Icon from '@/components/Icon.vue'
import { useI18n } from 'vue-i18n'
import pjson from '@/../package.json'

import { AppVersion } from '@awesome-cordova-plugins/app-version'
import { NotificationTypeEnum } from '@/@enums/notification.type.enum'

interface MenuGroup {
  title: string;
  childs: MenuEntry[];
}

export default defineComponent({
  name: 'Profile',
  components: {
    Icon,
    TopToolbar
  },
  setup () {
    const store = useStore(storeKey)
    // const auth = inject("auth") as AuthPlugin;
    const { t } = useI18n()

    const userName = computed(() => store.getters['auth/fullName'])
    const userActivePack = computed(() => formatClubPack(store.getters['auth/user'].clubPack))
    const userIsAdmin = computed(() => store.getters['auth/isAdmin'])
    const { onItemClick, logout } = menuEntries()
    const appVersion = ref()

    const availableNotifications: MenuEntry[] = Object.values(NotificationTypeEnum).map(el => {
      return {
        id: 'notification_' + el,
        label: t(`enums.NotificationTypeEnum.${el}`),
        slot: 'notification-popup',
        disabled: true,
        value: true
      }
    })

    const listGroups: ComputedRef<MenuGroup[]> = computed(() => [
      {
        title: 'Account',
        childs: [
          {
            icon: 'user',
            label: 'Dati personali',
            route: 'private.user'
          },
          {
            icon: 'chart',
            label: 'I miei ordini',
            route: 'private.orders.home',
            if: !userIsAdmin.value
          },
          {
            icon: 'wallet',
            label: t('mainMenu.userPortfolio'),
            route: 'private.wallet',
            if: !userIsAdmin.value
          }, {
            icon: 'wallet',
            label: t('mainMenu.userPortfolioPremium'),
            route: 'private.walletPremium',
            if: false && !userIsAdmin.value
          }, {
            icon: 'wallet',
            label: t('mainMenu.userPortfolioFast'),
            route: 'private.walletFast',
            if: !userIsAdmin.value
          },
          {
            icon: 'wallet',
            label: t('mainMenu.userPortfolioPremium'),
            route: 'private.walletPremium',
            if: !userIsAdmin.value
          }
        ]
      },
      {
        title: 'News e Notifiche',
        childs: [
          {
            icon: 'calendar',
            label: 'News ed Eventi',
            route: 'news.index'
          },
          {
            icon: 'notification',
            label: 'Le mie notifiche',
            route: 'notifications.index'
          },
          ...availableNotifications
          // {
          //   icon: "notification",
          //   label: "Notifiche pop-up",
          //   disabled: true,
          //   slot: "notification-popup"
          // },
        ]
      },
      {
        title: 'Altro',
        childs: [
          {
            icon: 'message',
            label: 'Contattaci',
            disabled: true
          },
          {
            icon: 'privacy',
            label: 'Note Legali',
            disabled: true
          },
          {
            icon: 'download',
            label: 'Versione: ' + appVersion.value,
            disabled: true
          },
          {
            icon: 'logout',
            label: 'Logout',
            click: () => logout()
          }
        ]
      }
    ])

    function onToggleChange (item: MenuEntry, event: CustomEvent) {
      const value = event.detail.checked

      console.log(item.id, value)
    }

    onMounted(async () => {
      try {

        appVersion.value = (await AppVersion.getVersionNumber())
      } catch (e) {
        appVersion.value = pjson.version
      }

    })

    return {
      userName,
      userActivePack,
      listGroups,
      onToggleChange,
      onItemClick
    }
  }
})
</script>

<style>

</style>
