<template>
  <IonApp>

    <IonTabs class="app-tabs">
      <!-- the side menu -->
      <TheDesktopSidebar v-if="$store.getters['mdAndUp'] && isLoggedIn"/>

      <!-- the bottom toolbar -->
      <TheMobileToolbar v-if="$store.getters['smAndDown'] && isLoggedIn"/>

      <!-- the main content -->
      <IonRouterOutlet id="main-content"></IonRouterOutlet>
    </IonTabs>

  </IonApp>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import TheDesktopSidebar from './components/TheDesktopSidebar.vue';
  import TheMobileToolbar from '@/components/TheMobileToolbar.vue';

  export default defineComponent({
    name: 'App',
    components: { TheMobileToolbar, TheDesktopSidebar },
    setup () {
      const store = useStore(storeKey);
      const route = useRoute();
      const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

      function updateStoreGridSize (e: Event) {
        const target = e.target as Window;

        store.dispatch('updateGridSize', target.innerWidth);
      }

      window.addEventListener('resize', updateStoreGridSize);
      window.addEventListener('orientationchange', updateStoreGridSize);

      onMounted(() => {
        window.dispatchEvent(new CustomEvent('resize'));
      });

      return {
        isLoggedIn,
        isSelected: (url: string) => (url === route.path ? 'selected' : ''),
      };
    }
});
</script>

