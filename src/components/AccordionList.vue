<template>
  <div class="accordion-list">
    <div class="accordion-item"
         :class="{expanded: section.open}"
         v-for="section of sections" :key="section.id">
      <ion-button color="secondary" size="default" expand="full" class="accordion-header"
                  @click="onToggleOpenClick(section)">
        <div class="accordion-header-text">{{ section.text }}</div>
        <Icon class="accordion-header-icon" name="chevron-down"></Icon>
      </ion-button>

      <div class="accordion-collapse-container">
        <div class="accordion-collapse-content">
          <!-- Creates dynamic slots -->
          <slot :name="'content_' + section.id">
            Content of slot <strong>"content_{{ section.id }}"</strong>
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import Icon from '@/components/Icon.vue';

  export interface AccordionSection {
    id: string;
    text: string;
    open: boolean;
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
    setup () {

      function onToggleOpenClick (section: AccordionSection) {
        section.open = !section.open
      }

      return { onToggleOpenClick }
    }
  });
</script>
