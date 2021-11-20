<template>
  <ion-segment class="tabs" :value="modelValue"
               @ionChange="onSelectionChange" scrollable="scrollable">
    <ion-segment-button v-for="tab in tabsList" :key="tab.id"
                        :value="tab.id">
      <ion-label>
        {{ tab.text }} ({{ tab.count }})
      </ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { TabEntry } from '@/@types/TabEntry';

  export default defineComponent({
    name: 'Tabs',
    props: {
      tabsList: {
        required: true,
        type: Array as PropType<TabEntry[]>
      },
      modelValue: [String, Number]
    },
    setup (props, { emit }) {
      function onSelectionChange (ev) {
        const value = ev.target.value

        emit('update:modelValue', value)
      }

      return {
        onSelectionChange
      }
    }
  })

</script>
