<template>
  <div class="tabs">
    <TabsItems :tabs-list="data" v-model="activeTab"/>
    <TabsSlides :tabs-list="data" :active-tab="activeTab" ref="tabsSlides">
      <template v-for="tab of data" :key="tab.id"
                v-slot:[`tabSlide_`+tab.id]="item">
        <slot :name="'tabSlide_' + tab.id" v-bind="item"></slot>
      </template>
    </TabsSlides>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import { TabEntry } from '@/@types/TabEntry';
  import TabsItems from '@/components/tabs/TabsItems.vue';
  import TabsSlides from '@/components/tabs/TabsSlides.vue';

  export default defineComponent({
    name: "Tabs",
    components: { TabsSlides, TabsItems },
    props: {
      data: {
        required: true,
        type: Array as PropType<TabEntry[]>
      }
    },
    setup (props) {
      const activeTab = ref(props.data[0].id);
      const tabsSlides = ref();

      function updateSlider () {
        tabsSlides.value?.onDataFetched()
      }

      return {
        activeTab, tabsSlides,
        updateSlider
      }
    }
  });
</script>

<style scoped>

</style>
