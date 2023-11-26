<template>
  <FormInputV v-model="value"
              :label="label"
              class="form-input-autocomplete-wrapper"
              @ionBlur="onBlur"
              @ionFocus="onFocus"
              ref="input"
              :error="error"
  >
  </FormInputV>

  <div class="mb-3 ion-text-left" v-if="value && allowNewValues">
    <small v-if="isNew">Utente ospite: {{ value }}</small>
    <small v-else>Id utente: {{ asyncModelValue }}</small>
  </div>

  <datalist :id="listId" @change="onChange">
    <option v-for="(option, i) in listOptions" :key="i"
            :data-value=" asyncOptionsValueKey ? option[asyncOptionsValueKey] : null"
            :value="asyncOptionsLabelKey ? option[asyncOptionsLabelKey] : option">
      <!--      {{ asyncOptionsValueKey ? option[asyncOptionsValueKey] : null }}-->
    </option>
  </datalist>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, Ref, ref, watch } from 'vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export default defineComponent({
  name: 'FormInputAutocomplete',
  components: { FormInputV },
  props: {
    modelValue: [String, Number],
    label: String,
    asyncOptions: Boolean,
    asyncOptionsUrl: String,
    asyncFilterKey: {
      type: String,
      default: 'value'
    },
    asyncOptionsValueKey: String,
    asyncOptionsLabelKey: String,
    asyncOptionsEmitKey: String,
    asyncModelValue: [String, Number],
    allowNewValues: Boolean,
    options: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    error: String
  },
  setup(props, {emit}) {
    const isOpen = ref(false)
    const http = inject('http') as HttpPlugin
    const value: Ref<any> = ref(props.modelValue)
    const input = ref<typeof FormInputV>()
    const isNew = ref(false)
    let fetchDelay: any = null

    const listId = 'autocomplete_list_' + Math.random().toString(36).substring(2, 9)

    const listOptions: Ref<string[]> = ref([])

    async function onInput (value) {
      emit('update:modelValue', value)
      emitSelectedOption(value)
    }

    function onChange (e) {
      const value = e.target.value

      emit('update:modelValue', value)
    }

    function onFocus () {
      // inputEl.value.setAttribute('list', 'autocomplete_list')

      // inputEl.value.setFocus()
      // setTimeout(() => {
      //   const keyboardEvent = new KeyboardEvent('keyup')
      //
      //   // input.dispatchEvent(new CustomEvent('click'))
      //   input.showPicker()
      //   // input.dispatchEvent(keyboardEvent)
      // }, 100)*/

    }

    function onBlur (e) {
      // console.log(e)
    }

    async function fetchAsyncData () {
      if (props.asyncOptionsUrl) {
        if (fetchDelay) {
          clearTimeout(fetchDelay)
        }

        if (!value.value || value.value.replaceAll(' ', '').length <= 2) {
          listOptions.value = []

          return
        }

        fetchDelay = setTimeout(async () => {
          try {
            const result = await http.get(props.asyncOptionsUrl as string, { params: { [props.asyncFilterKey]: value.value } })

            listOptions.value = result.data
          } catch (e) {
            // do nothing
          }
        }, 200)
      }
    }

    function emitSelectedOption (value) {
      const selectedOption = listOptions.value.find(option => {
        return (props.asyncOptionsLabelKey ? option[props.asyncOptionsLabelKey] : option) === value
      })

      let valueToEmit = null
      isNew.value = false

      if (selectedOption) {
        valueToEmit = props.asyncOptionsEmitKey ? selectedOption[props.asyncOptionsEmitKey] : selectedOption
      } else if (props.allowNewValues){
        isNew.value = true
        valueToEmit = value
      }

      emit('update:selectedOption', valueToEmit)
      emit('update:asyncModelValue', valueToEmit)
    }

    watch(() => props.options, value => {
      listOptions.value = value ?? []
    }, { immediate: true, deep: true })

    watch(() => value.value, value => {
      onInput(value)

      fetchAsyncData()
    })

    // Set datalist to input on internal input element
    watch(() => input.value, async (input) => {
      if (input) {
        const el = await input.getInputElement()
        el.setAttribute('list', listId)
      }
    })

    return {
      listId,
      isOpen,
      listOptions,
      input,
      value,
      isNew,
      onFocus, onBlur, onInput, onChange
    }
  }
});
</script>

<style scoped lang="scss">

.form-input-autocomplete-wrapper {

  :deep(ion-card) {
    --background: inherit;
    border-radius: 0 0 20px 20px;
    z-index: 99;

    ion-list {
      background: inherit;
    }

    .item {
      --background: inherit !important;
      color: inherit;
    }
  }
}
</style>

<style lang="scss">
.autocomplete-dropdown {
  //pointer-events: none;

  ion-backdrop {
    //display: none;
  }
}
</style>
