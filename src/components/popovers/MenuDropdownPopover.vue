<template>
  <ion-content>
    <ion-list>
      <MainMenuList :entries-list="data" @click="onItemClick"
                    :title="title"></MainMenuList>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import menuEntries from '@/composables/menuEntries';
  import MainMenuList from '@/components/lists/MainMenuList.vue';

  export default defineComponent({
    name: "MenuDropdownPopover",
    components: { MainMenuList },
    props: {
      data: Array,
      title: {
        type: String,
      }
    },
    setup () {
      const { onItemClick } = menuEntries();

      return {
        onItemClick,
      }
    }
  });
</script>

