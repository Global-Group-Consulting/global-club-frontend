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
  import { defineComponent } from 'vue';
  import menuEntries from '@/composables/menuEntries';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "TheMobileToolbar",
    components: { Icon },
    setup () {
      const { onItemClick, mobileEntries } = menuEntries();
      // const authUser: ComputedRef<User> = computed(() => store.getters['auth/user']);

      return {
        mobileEntries,
        onItemClick
      }
    }
  });
</script>

<style scoped>

</style>
