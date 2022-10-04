<template>
  <div class="tabs">
    <TabsItems :tabs-list="data" v-model="activeTab" v-if="showTabs"/>
    <TabsSlides :tabs-list="data" :active-tab="activeTab" ref="tabsSlides">
      <template v-for="tab of data" :key="tab.id"
                v-slot:[`tabSlide_`+tab.id]="item">
        <slot :name="'tabSlide_' + tab.id" v-bind="item"></slot>
      </template>
    </TabsSlides>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { TabEntry } from '@/@types/TabEntry'
import TabsItems from '@/components/tabs/TabsItems.vue'
import TabsSlides from '@/components/tabs/TabsSlides.vue'

export default defineComponent({
  name: 'Tabs',
  components: { TabsSlides, TabsItems },
  props: {
    data: {
      required: true,
      type: Array as PropType<TabEntry[]>
    },
    showTabs: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:activeTab'],
  setup (props, { emit }) {
    const activeTab = ref(props.data[0].id)
    const tabsSlides = ref()

    function updateSlider () {
      tabsSlides.value?.onDataFetched()
    }

    watch(() => activeTab.value, () => {
      emit('update:activeTab', activeTab.value)
    }, { immediate: true })

    return {
      activeTab, tabsSlides,
      updateSlider
    }
  }
})
</script>

<style scoped>

</style>
