<template>
  <ion-item class="form-input form-rte item-interactive item-textarea item-input ion-margin-bottom"
            :class="{'item-has-focus': focus, 'item-has-value': hasValue }">
    <ion-label position="floating">{{ label }}</ion-label>
    <div class="sc-ion-textarea-md-h">
      <EditorContent :editor="editor"/>
    </div>
  </ion-item>

</template>

<script lang="ts">
  import { useEditor, EditorContent, Editor } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import { computed, defineComponent, onBeforeUnmount, Ref, ref, watch } from 'vue';

  export default defineComponent({
    name: "FormRTE",
    components: {
      EditorContent
    },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      label: String
    },
    setup (props, { emit }) {
      const focus = ref(false)
      const textValue = ref(props.modelValue)
      const hasValue = computed(() => !!textValue.value)

      const editor: Ref<Editor> = useEditor({
        content: props.modelValue,
        extensions: [
          StarterKit,
        ],
        onUpdate: () => {
          textValue.value = editor.value.getText();
          emit('update:modelValue', editor.value.getHTML())
        },
        onFocus: () => {
          focus.value = true
        },
        onBlur: () => {
          focus.value = false
        }
      })

      watch(() => props.modelValue, (value) => {
        const isSame = editor.value.getHTML() === value

        if (isSame) {
          return
        }

        editor.value.commands.setContent(value, false)
      })

      onBeforeUnmount(() => {
        editor.value.destroy()
      })

      return { editor, focus, hasValue }
    },
  });
</script>

<style scoped>

</style>
