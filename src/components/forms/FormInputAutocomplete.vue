<template>
  <FormInputV :model-value="modelValue"
              :label="label"
              class="form-input-autocomplete-wrapper"
              @ionInput="onInput($event)"
              @ionChange="onChange($event)"
              @ionFocus="onFocus"
              @ionBlur="onBlur"
              ref="input"
  >
  </FormInputV>

  <datalist id="autocomplete_list">
    <option v-for="(option, i) in listOptions" :key="i"
            :value="option"></option>
  </datalist>
</template>

<script lang="ts">
import {defineComponent, inject, nextTick, onMounted, PropType, Ref, ref, watch} from 'vue';
import FormInputV from "@/components/forms/FormInputV.vue";
import {HttpPlugin} from "@/plugins/HttpPlugin";

export default defineComponent({
  name: "FormInputAutocomplete",
  components: {FormInputV},
  props: {
    modelValue: [String, Number],
    label: String,
    asyncOptions: Boolean,
    asyncOptionsUrl: String,
    options: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup(props, {emit}) {
    const isOpen = ref(false);
    const http = inject("http") as HttpPlugin;
    let fetchDelay: any = null;

    const listOptions: Ref<string[]> = ref([]);

    async function onInput(e) {
      const value = e.target.value.trim();

      emit('update:modelValue', value);

      if (props.asyncOptionsUrl) {
        if (fetchDelay) {
          clearTimeout(fetchDelay)
        }

        if (!value || value.length <= 2) {
          listOptions.value = [];

          return
        }

        fetchDelay = setTimeout(async () => {
          const result = await http.get(props.asyncOptionsUrl as string, {params: {"value": value}});

          listOptions.value = result.data;
        }, 200)
      }
    }

    function onChange(e) {
      const value = e.target.value;

      emit('update:modelValue', value);
    }

    function onFocus(e) {
      e.target.lastChild.setAttribute("list", "autocomplete_list");
    }

    function onBlur(e) {
      console.log(e)
    }

    watch(() => props.options, value => {
      listOptions.value = value ?? [];
    }, {immediate: true, deep: true})

    return {
      isOpen, listOptions,
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
