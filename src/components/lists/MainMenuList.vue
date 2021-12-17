<template>
  <template v-if="title">
    <ion-item style="--inner-border-width: 0">
      <ion-label>{{ title }}</ion-label>
    </ion-item>
    <ion-item-divider color="secondary">
      <hr>
    </ion-item-divider>
  </template>

  <template v-for="(entry, i) of entriesList" :key="'menu_' + i">

    <ion-item-divider color="secondary" v-if="entry.divider">
      <hr>
    </ion-item-divider>

    <ion-item v-else button
              class="main-menu-list-item"
              style="--inner-border-width: 0"
              :color="$route.name === entry.route ? 'primary' : ''"
              @click="$emit('click', entry, $event)">

      <Icon :name="entry.icon" class="me-2"></Icon>

      <ion-label>
        {{ entry.label }}
      </ion-label>

      <ion-badge v-if="entry.badge"
                 mode="ios" color="warning">{{ entry.badge }}
      </ion-badge>

    </ion-item>
  </template>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { MenuEntry } from '@/composables/menuEntries';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "MainMenuList",
    components: { Icon },
    props: {
      entriesList: Array as PropType<MenuEntry[]>,
      title: {
        type: String,
      }
    },
    emits: ['click']
  });
</script>

<style scoped>

</style>
