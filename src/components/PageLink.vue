<template>
  <router-link
      :to="resolvedPath"
      custom
      v-slot="{ href, navigate}"
  >
    <ClubButton v-bind="ionBtnProps"
                v-if="!onlyContainer"
                :class="$props.class"
                @click="onClick(navigate, $event)"
                :href="href"
                type="button">
      <slot></slot>
    </ClubButton>

    <slot v-if="onlyContainer" v-bind="{href, navigate}"></slot>
  </router-link>
</template>

<script lang="ts">
import { RouteLocationRaw, useRouter } from 'vue-router'
import { computed, defineComponent, PropType } from 'vue'
import ClubButton from '@/components/ClubButton.vue'

export interface IonButtonInterface {
  disabled?: boolean;
  strong?: boolean;
  fill?: 'default' | 'clear' | 'outline' | 'solid';
  mode?: import('@ionic/core').Mode;
  type?: 'button' | 'reset' | 'submit';
  color?: string;
  size?: 'small' | 'default' | 'large';
  modelValue?: string | boolean;
  buttonType?: string;
  expand?: 'full' | 'block';
  routerDirection?: import('@ionic/core').RouterDirection;
  routerAnimation?: import('@ionic/core').AnimationBuilder;
  download?: string;
  href?: string;
  rel?: string;
  shape?: 'round';
  target?: string;
}

export default defineComponent({
  components: { ClubButton },
  props: {
    to: {
      type: Object as PropType<RouteLocationRaw>
    },
    btnProps: Object as PropType<IonButtonInterface>,
    onlyContainer: Boolean,
    class: String
  },
  setup (props, { attrs }) {
    const router = useRouter()

    const resolvedPath = computed(() => {
      if (!props.to) {
        return ''
      }

      let resolvedPath = router.resolve(props.to).path

      if (props.to['query']) {
        const query = props.to['query']

        resolvedPath += '?' + Object.keys(query).map(key => key + '=' + query[key]).join('&')
      }

      return resolvedPath
    })

    const ionBtnProps = computed(() => {
      return Object.assign({
        version: 'link'
      }, props.btnProps, attrs)
    })

    function onClick (navigate, e) {
      const keys = ['metaKey', 'ctrlKey'].reduce((acc, key) => {
        if (e[key]) {
          acc[key] = e[key]
        }

        return acc
      }, {})

      if (props.btnProps?.target !== '_blank' && Object.keys(keys).length === 0) {
        e.preventDefault()

        navigate()
      }

    }

    return {
      resolvedPath,
      ionBtnProps,
      onClick
    }
  }
})

</script>

<style scoped>

</style>
