<template>
  <div class="form-input-wrapper ion-margin-bottom">
    <ion-item class="form-input form-rte item-interactive item-textarea item-input "
              :class="{'item-has-focus': isEditable && focus, 'item-has-value': hasValue }">
      <ion-label position="floating">{{ label }}</ion-label>
      <div class="sc-ion-textarea-md-h">
        <FormRTEBubbleMenu :editor="editor"></FormRTEBubbleMenu>
        <EditorContent :editor="editor"/>
      </div>
    </ion-item>

    <small v-if="showError" class="form-input-error">{{ error }}</small>
    <small v-if="message && !showError" class="form-input-message">{{ message }}</small>
  </div>
</template>

<script lang="ts">
  import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import Underline from '@tiptap/extension-underline';
  import { computed, defineComponent, onBeforeUnmount, Ref, ref, watch } from 'vue';
  import FormRTEBubbleMenu from '@/components/forms/FormRTEBubbleMenu.vue';

  export default defineComponent({
    name: "FormRTE",
    components: {
      FormRTEBubbleMenu,
      EditorContent,
    },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      label: String,
      error: String,
      message: String,
      readonly: Boolean,
      disabled: Boolean
    },
    setup (props, { emit }) {
      const focus = ref(false)
      const textValue = ref(props.modelValue)
      const isEditable = computed(() => !props.readonly && !props.disabled)
      const hasValue = computed(() => !!textValue.value)

      const editor: Ref<Editor> = useEditor({
        content: props.modelValue,
        extensions: [
          StarterKit,
          Underline
        ],
        editable: isEditable.value,
        onUpdate: () => {
          const value = editor.value.getText();
          let htmlValue = editor.value.getHTML();

          if (!value.trim()) {
            htmlValue = ""
          }

          textValue.value = value;
          emit('update:modelValue', htmlValue)
        },
        onFocus: () => {
          focus.value = true
        },
        onBlur: () => {
          focus.value = false
        }
      })

      const showError = computed(() => props.error && !props.readonly && !props.disabled)

      watch(() => props.modelValue, (value) => {
        const isSame = editor.value.getHTML() === value;

        if (isSame) {
          return
        }

        editor.value.commands.setContent(value, false);
        textValue.value = value
      })

      onBeforeUnmount(() => {
        editor.value.destroy()
      })

      return { editor, focus, hasValue, showError, isEditable }
    },
  });
</script>

<style scoped>

</style>
