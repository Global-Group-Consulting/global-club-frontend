<template>
  <ion-item class="ion-margin-bottom">
    <ion-label position="floating">{{ label }}</ion-label>
    <component :is="component"
               :type="componentType"></component>
  </ion-item>
</template>

<script setup lang="ts">
  import { computed, defineProps } from 'vue';

  const props = defineProps<{
    label: string;
    type: 'text' | 'number' | 'textarea' | "file";
  }>();

  const component = computed(() => {
    if (props.type === 'textarea') {
      return 'ion-textarea';
    } else {
      return 'ion-input';
    }
  });

  const componentType = computed(() => {
    if (props.type === 'textarea') {
      return '';
    } else {
      return props.type;
    }
  });

</script>

<style scoped>

</style>
