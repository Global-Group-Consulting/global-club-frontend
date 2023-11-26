<template>
  <div :class="{'ion-margin-bottom': addSpaceAfter}" class="form-input-wrapper">
    <ion-item :class="{'is-readonly': readonly, 'is-disabled': disabled}"
              class="form-input">
      <ion-label position="floating">{{ label }}</ion-label>
      <component :is="component"
                 ref="inputComponent"
                 :type="componentType"
                 :value="computedModelValue"
                 :clearInput="clearInput"
                 :placeholder="placeholder"
                 :multiple="multiple"
                 :interface="calcInterface"
                 :interfaceOptions="calcInterfaceOptions"
                 :disabled="component === 'ion-select' ? (readonly || disabled) : disabled"
                 :readonly="readonly"
                 :okText="selectBtnOk || $t('forms.generic.selects.okText')"
                 :cancelText="selectBtnCancel || $t('forms.generic.selects.cancelText')"
                 @ionInput="onInput($event)"
                 @ionChange="onChange($event)"
                 @ionFocus="inFocus = true"
                 @ionBlur="inFocus = false"
      >
        <template v-if="component === 'ion-select'">
          <template v-if="clearInput">
            <ion-select-option value="">-- Nessuna scelta --</ion-select-option>
          </template>
          <ion-select-option v-for="option of options"
                             :key="option.value"
                             :value="option.value">
            {{ option.text }}
          </ion-select-option>
        </template>
      </component>
    </ion-item>

    <slot name="after" v-bind:inFocus="inFocus"></slot>

    <small v-if="showError" class="form-input-error">{{ error }}</small>
    <small v-if="message && !showError" class="form-input-message">{{ message }}</small>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'

export default defineComponent({
  name: 'FormInputV',
  props: {
    label: String,
    modelValue: [String, Number, Array],
    interface: String as PropType<'action-sheet' | 'alert' | 'popover'>,
    interfaceOptions: Object,
    type: {
      type: String as PropType<'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'currency' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week'>,
      default: 'text'
    },
    component: {
      type: String as PropType<'ion-input' | 'ion-textarea' | 'ion-select' | 'ion-toggle'>,
      default: 'ion-input'
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
    error: String,
    message: String
  },
  setup (props, { emit }) {
    const store = useStore(storeKey)
    const inputComponent = ref()
    const componentType = computed(() => {
      return props.type ?? 'text'
    })
    const inFocus = ref(false)

    const showError = computed(() => props.error && !props.readonly && !props.disabled)

    const calcInterface = computed(() => {
      if (props.interface) {
        return props.interface
      }

      return store.getters['smAndDown'] ? 'action-sheet' : 'alert'
    })

    const calcInterfaceOptions = computed(() => {
      const cssClass = ['form-input-alert-sheet']

      if (props.interfaceOptions?.cssClass) {
        cssClass.push(props.interfaceOptions.cssClass)
      }

      return Object.assign({}, props.interfaceOptions, {
        cssClass: cssClass.join(' ')
      })
    })

    const computedModelValue = computed({
      get () {
        if (props.type === 'date') {
          return props.modelValue ? props.modelValue.toString().split('T')[0] : ''
        }

        return props.modelValue
      },
      set (value) {
        emit('update:modelValue', value)
      }
    })

    function onInput (e) {
      const value = e.target.value

      if (props.component === 'ion-select') {
        return
      }

      emit('update:modelValue', value)
    }

    function onChange (e) {
      let value = e.target.value

      if (props.component !== 'ion-select' && props.modelValue === value) {
        return
      }

      // set value to null if empty string to avoid validation error
      if (props.type === 'date' && value === '') {
        value = null
      }

      emit('update:modelValue', value)
    }

    async function getInputElement(){
      return inputComponent.value.$el.getInputElement();
    }

    return {
      componentType,
      showError,
      onInput, onChange,
      inFocus,
      computedModelValue,
      calcInterface, calcInterfaceOptions,
      getInputElement,
      inputComponent
    }
  }
})

</script>

<style scoped>

</style>
