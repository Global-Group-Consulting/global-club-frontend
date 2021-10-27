<template>
  <ion-item class="ion-margin-bottom">
    <ion-label position="floating">{{ label }}</ion-label>
    <component :is="component"
               ref="inputComponent"
               :type="componentType"
               :value="componentValue"
               :clearInput="clearInput"
               :disabled="disabled"
               :placeholder="placeholder"
               :multiple="multiple"
               :okText="selectBtnOk || $t('forms.generic.selects.okText')"
               :cancelText="selectBtnCancel || $t('forms.generic.selects.cancelText')"
               @ionInput="onInput($event)"
               @ionChange="onChange($event)"
    >
      <template v-if="component === 'ion-select'">
        <ion-select-option v-for="option of options"
                           :key="option.value"
                           :value="option.value">
          {{ option.text }}
        </ion-select-option>
      </template>
    </component>
  </ion-item>
</template>

<script setup lang="ts">
  import { computed, inject, Ref, ref, watch } from 'vue';

  const props = withDefaults(defineProps<{
    label: string;
    modelValue?: string | number | string[];
    type?: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'currency' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week';
    component?: 'ion-input' | 'ion-textarea' | 'ion-select';
    // A hint to the browser for which keyboard to display
    inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url' | undefined;
    // If true, a clear icons will appear in the input when there is a value. Clicking it clears the input.
    clearInput?: boolean;
    disabled?: boolean;
    placeholder?: string;
    options?: { text: string; value: string }[];
    multiple?: boolean;
    selectBtnOk?: string;
    selectBtnCancel?: string;
  }>(), {
    type: 'text',
    component: 'ion-input',
    clearInput: false,
    disabled: false
  });

  // defining emit
  const emit = defineEmits(['update:modelValue']);

  // Refs
  const componentValue: Ref<string | string[] | number | undefined> = ref();
  const inputComponent = ref(null); // from the dom refs

  // Computeds
  const component = computed(() => {
    return props.component ?? 'ion-input';
  });

  const componentType = computed(() => {
    return props.type ?? 'text';
  });

  function onInput (e) {
    const value = e.target.value;
    emit('update:modelValue', value);
  }

  function onChange (e) {
    const value = e.target.value;

    if (props.component !== "ion-select") {
      return;
    }

    emit('update:modelValue', value);
  }

  watch(() => props.modelValue, (value) => {
    componentValue.value = value;
  }, { immediate: true });
</script>

<style scoped>

</style>
