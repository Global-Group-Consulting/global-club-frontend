<template>
  <BubbleMenu :editor="editor" v-if="editor" class="form-rte-bubble-menu">
    <div v-for="(group, i) of config" :key="i">

      <button v-for="btn in group" :key="`group_${i}_${btn.id}`" type="button"
              @click="editor.chain().focus()[btn.toggleFn]().run()"
              :class="{ 'is-active': editor.isActive(btn.activeTxt) }">
        <Icon :name="btn.icon"/>
      </button>
    </div>
  </BubbleMenu>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Editor, BubbleMenu } from '@tiptap/vue-3';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "FormRTEBubbleMenu",
    components: {
      Icon,
      BubbleMenu
    },
    props: {
      editor: Object as PropType<Editor>
    },
    setup () {
      const config = [
        // Text style group
        [
          {
            id: "txtBold",
            icon: "rte-bold",
            toggleFn: "toggleBold",
            activeTxt: "bold"
          },
          {
            id: "txtItalic",
            icon: "rte-italic",
            toggleFn: "toggleItalic",
            activeTxt: "italic"
          },
          {
            id: "txtUnderline",
            icon: "rte-underline",
            toggleFn: "toggleUnderline",
            activeTxt: "underline"
          }
        ]
      ]

      return {
        config
      }
    }
  });
</script>

<style scoped lang="scss">
  .form-rte-bubble-menu {
    border-radius: 8px;
    overflow: hidden;

    button {
      padding: 8px;
      font-weight: bold;

      &.is-active {
        background: var(--primary-bg-gradient);
        color: black
      }
    }
  }
</style>
