<template>
  <ion-tab-bar slot="bottom" class="bottom-toolbar">
    <template v-for="(entry, i) in menuEntries" :key="'btn_tab_' + i">

      <ion-button :tab="null" v-if="!entry.isMainBtn" href="#"
                  class="bottom-toolbar-button"
                  fill="clear"
                  :class="{selected: $route.name === entry.route }"
                  @click.prevent.stop="onItemClick(entry)">
        <div class="button-inner">
          <Icon :name="entry.icon" size="large"></Icon>

          <ion-label>
            <small>
              <template v-if="entry.label.startsWith('$')">{{ entry.label.replace("$", '') }}</template>

              <template v-else>{{ $t("mainMenu." + entry.label) }}</template>
            </small>
          </ion-label>
        </div>
      </ion-button>

      <ion-tab-button v-else class="bottom-toolbar-center-g">
        <Icon name="g-gold"></Icon>
      </ion-tab-button>
    </template>
  </ion-tab-bar>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent } from 'vue';
  import { MenuEntry } from '@/components/MainMenu.vue';
  import { getUserMenuEntries } from '@/config/menuEntries';
  import { User } from '@/@types/User';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import Icon from '@/components/Icon.vue';
  import { useRouter } from 'vue-router';

  type BottomMenuEntry = MenuEntry & { isMainBtn?: boolean };

  export default defineComponent({
    name: "BottomToolbar",
    components: { Icon },
    setup () {
      const store = useStore(storeKey);
      const router = useRouter();

      const authUser: ComputedRef<User> = computed(() => store.getters['auth/user']);
      const menuEntries: ComputedRef<BottomMenuEntry[]> = computed(() => {
        const toReturn = (getUserMenuEntries(authUser.value) as BottomMenuEntry[]).filter(el => !el.divider && el.showInMobile)
        toReturn.splice(2, 0, {
          label: "",
          isMainBtn: true
        });

        // Other btn. Only if an admin
        toReturn.push({
          label: "more",
          icon: "menu-h"
        })

        return toReturn
      })

      function onItemClick (entry: MenuEntry, event?: Event) {
        if (entry.click) {
          entry.click(event);
        } else {
          router.push({ name: entry.route });
        }
      }

      return {
        menuEntries,
        onItemClick,
      }
    }
  });
</script>

<style scoped>

</style>
