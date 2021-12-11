<template>
  <ion-menu side="start" content-id="main-content" menu-id="main-menu" autoHide="false" class="main-menu">
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
  </ion-menu>
</template>


<script lang="ts">
  import { useStore } from 'vuex';
  import { computed, ComputedRef, defineComponent } from 'vue';
  import { storeKey } from '@/store';
  import { User } from '@/@types/User';
  import menuEntries from '@/composables/menuEntries';
  import MainMenuList from '@/components/lists/MainMenuList.vue';

  export default defineComponent({
    name: "TheDesktopSidebar",
    components: { MainMenuList },
    setup () {
      const store = useStore(storeKey);
      const { onItemClick, desktopEntries, desktopFooterEntries } = menuEntries()

      const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
      const authUser: ComputedRef<User> = computed(() => store.getters['auth/user']);

      return {
        isLoggedIn, authUser,
        onItemClick, desktopEntries, desktopFooterEntries
      }
    }
  })


</script>
