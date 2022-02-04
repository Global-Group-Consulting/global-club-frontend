<template>
  <ion-img :src="formatImgUrl(fileId)" :alt="fileName"
           @ionError="onImgError"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {formatImgUrl} from "@/@utilities/images";

export default defineComponent({
  name: "Image",
  props: {
    fileId: String,
    fileName: {
      type: String,
      default: "image"
    },
    fallbackLarge: Boolean
  },
  setup(props) {

    function onImgError(e) {
      e.target.src = `/assets/img_placeholder${props.fallbackLarge ? '_large' : ''}.png`;
    }

    return {
      formatImgUrl,
      onImgError
    }
  }
});
</script>

<style scoped>

</style>
