<template>
  <div :class="{'ion-margin-bottom': addSpaceAfter}" class="form-input-wrapper">
    <ion-item :class="{'is-readonly': readonly, 'is-disabled': disabled}"
              class="form-input"
              @click.stop.prevent="toggle()"
    >
      <ion-label>{{ label }}</ion-label>
      <ion-toggle ref="inputComponent"
                  :checked="modelValue"
                  :value="true"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :readonly="readonly"
                  @ionChange="onChange($event)"
                  @click.prevent.stop
      >
      </ion-toggle>
    </ion-item>

    <small v-if="showError" class="form-input-error">{{ error }}</small>
    <small v-if="message && !showError" class="form-input-message">{{ message }}</small>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, getCurrentScope, PropType } from 'vue';

  export default defineComponent({
    name: "FormToggleV",
    props: {
      label: String,
      modelValue: {
        type: Boolean,
        default: false
      },
      disabled: Boolean,
      placeholder: String,
      options: Object as PropType<{ text: string; value: string }[]>,
      addSpaceAfter: {
        type: Boolean,
        default: true
      },
      readonly: Boolean,
      error: String,
      message: String
    },
    setup (props, { emit }) {
      const showError = computed(() => props.error && !props.readonly && !props.disabled)

      function toggle () {
        emit('update:modelValue', !props.modelValue);
      }

      function onChange (e) {
        const value = e.target.checked;

        if (value !== props.modelValue) {
          emit('update:modelValue', value === true);
        }
      }

      return {
        showError,
        onChange,
        toggle
      }
    }
  })

</script>

<style scoped>

</style>
