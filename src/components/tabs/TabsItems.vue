<template>
  <ion-segment class="tabs-items" :value="modelValue"
               mode="ios"
               color="primary"
               @ionChange="onSelectionChange"
               scrollable="scrollable">
    <ion-segment-button v-for="tab in tabsList" :key="tab.id"
                        :value="tab.id" class="tabs-item"
                        layout="icon-bottom">
      <ion-label>
        {{ tab.text }} <span v-if="tab.count">({{ tab.count }})</span>
        <ion-badge v-if="tab.unreadCount"
                   color="danger" class="unread" style="width: 10px; height: 10px">&nbsp;
        </ion-badge>
      </ion-label>
    </ion-segment-button>
  </ion-segment>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { TabEntry } from '@/@types/TabEntry';

  export default defineComponent({
    name: 'TabsItems',
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
