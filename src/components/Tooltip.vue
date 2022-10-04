<template>
  <div class="popper-vue" @mouseover="showTooltip" @mouseout="hideTooltip"
       :title="tooltip">
    <!--    <span ref="popper"
              v-show="visible"
              :class="['popper-vue__popper', popperClass]"
        >
          <slot name="tooltip">
            {{ tooltip }}
          </slot>

          <span v-show="arrow" class="popper-vue__arrow_wrapper" data-popper-arrow>
            <span :class="['popper-vue__arrow', arrowClass]"/>
          </span>

        </span>-->

    <div class="popper-vue__reference" ref="reference" role="button">

      <slot/>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted, ref, watch} from 'vue';
import {createPopper, Instance} from '@popperjs/core';

export default defineComponent({
  name: "Tooltip",
  props: {
    arrow: {
      type: Boolean,
      default: true,
    },
    arrowClass: {
      type: [Object, Array, String],
      default: undefined,
    },
    /**
     * Any options should follow popper documentation
     * https://popper.js.org/docs/v2/
     */
    options: {
      type: Object,
      default: () => ({
        placement: 'bottom',
        strategy: 'fixed',
        /*modifiers: [
          {
            name: 'offset',
            options: {
              offset: ["10%", 20],
            },
          },
        ],*/
      }),
    },
    delay: {
      type: Number,
      default: 300
    },
    popperClass: {
      type: [Object, Array, String],
      default: undefined,
    },

    tooltip: String
  },
  setup(props, {emit}) {
    // let vuePopperInstance: Instance | null = null;
    const reference = ref();
    const popper = ref();
    const visible = ref(true);

    // let timer: NodeJS.Timeout | null = null;

    function showTooltip() {
      /*if (!visible.value || timer) {
        timer = setTimeout(() => {
          visible.value = true;

          vuePopperInstance?.update();
        }, props.delay)
      }*/
    }

    function hideTooltip() {
      /*if (timer) {
        clearTimeout(timer);
      }

      if (visible.value) {
        // visible.value = false;
      }*/
    }

    watch(() => props.options, value => {
      // vuePopperInstance?.setOptions(value);
    }, {deep: true})

    onMounted(() => {
      /*vuePopperInstance = createPopper(
          reference.value as HTMLElement,
          popper.value as HTMLElement,
          props.options,
      );

      nextTick(() => {
        vuePopperInstance?.update();
      })

      emit('popper', vuePopperInstance);*/
    })

    return {
      reference,
      popper,
      visible,
      showTooltip, hideTooltip
    }
  }
})

</script>

<style scoped>
.popper-vue {
  position: relative;
}

.popper-vue__reference {
  display: flex;
}

.popper-vue__popper {
  position: relative;
  color: white;
  font-weight: normal;
  font-size: 13px;
  padding: 4px 8px;
  background-color: black;
  border-radius: 8px;
  z-index: 99;
  text-align: center;
}


</style>

