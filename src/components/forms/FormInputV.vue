<template>
  <div :class="{'ion-margin-bottom': addSpaceAfter}" class="form-input-wrapper">
    <ion-item :class="{'is-readonly': readonly, 'is-disabled': disabled}"
              class="form-input">
      <ion-label position="floating">{{ label }}</ion-label>
      <component :is="component"
                 ref="inputComponent"
                 :type="componentType"
                 :value="modelValue"
                 :clearInput="clearInput"
                 :placeholder="placeholder"
                 :multiple="multiple"
                 :disabled="component === 'ion-select' ? (readonly || disabled) : disabled"
                 :readonly="readonly"
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

    <small v-if="error && !readonly && !disabled" class="form-input-error">{{ error }}</small>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: "FormInputV",
    props: {
      label: String,
      modelValue: [String, Number],
      type: {
        type: String as PropType<'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'currency' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'>,
        default: "text"
      },
      component: {
        type: String as PropType<'ion-input' | 'ion-textarea' | 'ion-select'>,
        default: "ion-input"
      },
      // A hint to the browser for which keyboard to displa,
      inputMode: String as PropType<'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url' | undefined>,
      // If true, a clear icons will appear in the input when there is a value. Clicking it clears the input,
      clearInput: Boolean,
      disabled: Boolean,
      placeholder: String,
      options: Object as PropType<{ text: string; value: string }[]>,
      multiple: Boolean,
      selectBtnOk: String,
      selectBtnCancel: String,
      addSpaceAfter: {
        type: Boolean,
        default: true
      },
      readonly: Boolean,
      error: String
    },
    setup (props, { emit }) {
      const componentType = computed(() => {
        return props.type ?? 'text';
      });

      function onInput (e) {
        const value = e.target.value;

        if (props.component === "ion-select") {
          return;
        }

        emit('update:modelValue', value);
      }

      function onChange (e) {
        const value = e.target.value;

        if (props.component !== "ion-select" && props.modelValue === value) {
          return;
        }

        emit('update:modelValue', value);
      }

      return {
        componentType,
        onInput, onChange
      }
    }
  })

</script>

<style scoped>

</style>
