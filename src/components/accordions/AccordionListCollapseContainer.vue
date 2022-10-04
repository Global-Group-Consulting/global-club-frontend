<template>
  <div class="accordion-collapse-container" ref="accordionCollapseContainer">
    <div class="accordion-collapse-content" ref="accordionCollapseContent">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, watch } from 'vue'

export default defineComponent({
  name: 'AccordionListCollapseContainer',
  props: {
    expanded: Boolean
  },
  setup (props) {
    const accordionCollapseContainer: Ref<HTMLElement | null> = ref(null)
    const accordionCollapseContent: Ref<HTMLElement | null> = ref(null)

    function setContainerMinHeight () {
      if (!accordionCollapseContainer.value) {
        return
      }

      if (props.expanded) {
        accordionCollapseContainer.value.style.height = accordionCollapseContent.value?.offsetHeight + 'px'
      } else {
        accordionCollapseContainer.value.style.height = ''
      }
    }

    watch(() => props.expanded, setContainerMinHeight, {
      immediate: true
    })

    onMounted(() => {
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          setContainerMinHeight()
        }
      })

      if (accordionCollapseContent.value) {
        resizeObserver.observe(accordionCollapseContent.value)
      }

      setContainerMinHeight()
    })

    return {
      accordionCollapseContainer,
      accordionCollapseContent
    }
  }
})
</script>

<style scoped>

</style>
