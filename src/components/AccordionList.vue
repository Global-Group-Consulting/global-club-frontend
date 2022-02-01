<template>
  <div class="accordion-list">
    <div class="accordion-item"
         v-for="(section) of sectionsList" :key="section._key"
         :class="{expanded: section.el.open}"
    >
      <ion-button color="secondary" size="default" expand="full" class="accordion-header"
                  @click="onToggleOpenClick(section.el, section._key)">
        <div class="accordion-header-text" v-html="section.el.text"></div>
        <Icon class="accordion-header-icon" name="chevron-down"></Icon>
      </ion-button>

      <div class="accordion-collapse-container">
        <div class="accordion-collapse-content">
          <!-- Creates dynamic slots -->
          <slot :name="'content_' + section.el.id" :item="section.el" v-if="loadedTabs[section._key]">
            Content of slot <strong>"content_{{ section.el.id }}"</strong>
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType, ref, watch } from 'vue';
  import Icon from '@/components/Icon.vue';

  export interface AccordionSection {
    id: string;
    text: string;
    open: boolean;
    data?: any;
  }

  export default defineComponent({
    name: "AccordionList",
    components: { Icon },
    props: {
      sections: {
        type: Object as PropType<AccordionSection[]>,
        required: true
      }
    },
    setup (props) {
      const loadedTabs = ref({})

      const sectionsList: ComputedRef<{ _key: string; el: AccordionSection }[]> = computed(() => {
        return props.sections.map((el, i) => {
          return {
            el,
            _key: el.id + '_' + i
          }
        })
      })

      function onToggleOpenClick (section: AccordionSection, tabId: string) {
        section.open = !section.open

        if (!loadedTabs.value[tabId] && section.open) {
          loadedTabs.value[tabId] = true
        }
      }

      watch(props.sections, () => {
        sectionsList.value.forEach((section) => {
          if (section.el.open) {
            loadedTabs.value[section._key] = true
          }
        })
      }, {
        immediate: true
      })

      return {
        onToggleOpenClick,
        loadedTabs,
        sectionsList
      }
    }
  });
</script>

