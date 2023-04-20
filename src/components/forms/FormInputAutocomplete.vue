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

  <datalist id="autocomplete_list" @change="onChange">
    <option v-for="(option, i) in listOptions" :key="i"
            :data-value=" asyncOptionsValueKey ? option[asyncOptionsValueKey] : null"
            :value="asyncOptionsLabelKey ? option[asyncOptionsLabelKey] : option">
      <!--      {{ asyncOptionsValueKey ? option[asyncOptionsValueKey] : null }}-->
    </option>
  </datalist>
</template>

<script lang="ts">
import { computed, defineComponent, inject, nextTick, onMounted, PropType, Ref, ref, watch } from 'vue'
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
    let fetchDelay: any = null

    const listOptions: Ref<string[]> = ref([])

    async function onInput (value) {
      emit('update:modelValue', value)
      emitSelectedOption(value)
    }

    function onChange (e) {
      const value = e.target.value

      emit('update:modelValue', value)
    }

    function onFocus (e) {
      e.target.lastChild.setAttribute('list', 'autocomplete_list')
    }

    function onBlur (e) {
      // console.log(e)
    }

    async function fetchAsyncData () {
      if (props.asyncOptionsUrl) {
        if (fetchDelay) {
          clearTimeout(fetchDelay)
        }

        if (!value.value || value.value.length <= 2) {
          listOptions.value = []

          return
        }

        fetchDelay = setTimeout(async () => {
          const result = await http.get(props.asyncOptionsUrl as string, { params: { [props.asyncFilterKey]: value.value } })

          listOptions.value = result.data
        }, 200)
      }
    }

    function emitSelectedOption (value) {
      const selectedOption = listOptions.value.find(option => {
        return (props.asyncOptionsLabelKey ? option[props.asyncOptionsLabelKey] : option) === value
      })

      emit('update:selectedOption', selectedOption)

      emit('update:asyncModelValue', selectedOption ? (props.asyncOptionsEmitKey ? selectedOption[props.asyncOptionsEmitKey] : selectedOption) : null)
    }

    watch(() => props.options, value => {
      listOptions.value = value ?? []
    }, { immediate: true, deep: true })

    watch(() => value.value, value => {
      onInput(value)

      fetchAsyncData()
    })

    return {
      isOpen, listOptions,
      value,
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
