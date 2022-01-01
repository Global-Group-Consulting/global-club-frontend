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
                    :disabled="item.disabled">
            <Icon :name="item.icon" slot="start"></Icon>

            {{ item.label }}

            <template v-if="item.slot === 'notification-popup' ">
              <ion-toggle slot="end"></ion-toggle>
            </template>
          </ion-item>
        </ion-list>

      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject } from "vue";
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { formatClubPack } from '@/@utilities/statuses';
  import menuEntries, { MenuEntry } from '@/composables/menuEntries';
  import Icon from '@/components/Icon.vue';
  import { AuthPlugin } from '@/plugins/AuthPlugin';

  interface MenuGroup {
    title: string;
    childs: MenuEntry[];
  }

  export default defineComponent({
    name: "Product",
    components: {
      Icon,
      TopToolbar,
    },
    setup () {
      const store = useStore(storeKey);
      const auth = inject("auth") as AuthPlugin

      const userName = computed(() => store.getters['auth/fullName']);
      const userActivePack = computed(() => formatClubPack(store.getters['auth/user'].clubPack));
      const { onItemClick, logout } = menuEntries()

      const listGroups: ComputedRef<MenuGroup[]> = computed(() => [
        {
          title: "Account",
          childs: [
            {
              icon: "user",
              label: "Dati personali",
              route: 'private.user',
            },
            {
              icon: "chart",
              label: "I miei ordini",
              route: 'private.orders.home',
            },
            {
              icon: "wallet",
              label: "Il mio portfolio",
              route: 'private.portfolio',
            }
          ]
        },
        {
          title: "Notifiche",
          childs: [
            {
              icon: "notification",
              label: "Notifiche pop-up",
              disabled: true,
              slot: "notification-popup"
            },
            {
              icon: "notification",
              label: "Le mie notifiche",
              disabled: true,
            }
          ]
        },
        {
          title: "Altro",
          childs: [
            {
              icon: "message",
              label: "Contattaci",
              disabled: true
            },
            {
              icon: "privacy",
              label: "Note Legali",
              disabled: true
            },
            {
              icon: "logout",
              label: "Logout",
              click: () => logout()
            }
          ]
        }
      ])

      return {
        userName,
        userActivePack,
        listGroups,
        onItemClick
      }
    }
  })
</script>

<style>

</style>
