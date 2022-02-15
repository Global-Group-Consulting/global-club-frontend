<template>
  <ion-img :src="src"
           :alt="fileName"
           class="img"
           :class="baseClasses"
  />

  <ion-img :src="lazySrc"
           :alt="fileName"
           @ionImgDidLoad="onLazyDidLoaded"
           @ionError="onImgError"
           class="lazy-img" :class="lazyClasses"/>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, Ref, ref} from 'vue';
import {formatImgUrl} from "@/@utilities/images";

export default defineComponent({
  name: "Image",
  props: {
    fileId: String,
    fileName: {
      type: String,
      default: "image"
    },
    fallbackLarge: Boolean,
    class: String
  },
  setup(props) {
    const src: Ref<string> = ref(`/assets/img_placeholder${props.fallbackLarge ? '_large' : ''}.png`);
    const lazySrc: Ref<string> = ref(formatImgUrl(props.fileId));
    const lazyLoaded = ref(false)

    const lazyClasses = computed(() => getImgClass(true));
    const baseClasses = computed(() => getImgClass());

    function getImgClass(lazy = false) {
      const classList: string[] = []

      if (props.class) {
        classList.push(props.class);
      }

      if (!lazy && lazyLoaded.value) {
        classList.push("hide")
      } else if (lazy && lazyLoaded.value) {
        classList.push("loaded")
      }

      return classList.join(" ");
    }

    function onImgError(e) {
      e.target.src = `/assets/img_placeholder${props.fallbackLarge ? '_large' : ''}.png`;
    }

    function onLazyDidLoaded() {
      lazyLoaded.value = true
    }


    return {
      src,
      formatImgUrl, getImgClass,
      onImgError, onLazyDidLoaded,
      lazyClasses,
      baseClasses,
      lazySrc,
      lazyLoaded
    }
  }
});
</script>

<style scoped lang="scss">
.img {
  opacity: 1;
  transition: opacity .3s;

  &.hide {
    opacity: 0;
  }
}

.lazy-img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity .3s;

  &.loaded {
    opacity: 1;
  }
}
</style>
