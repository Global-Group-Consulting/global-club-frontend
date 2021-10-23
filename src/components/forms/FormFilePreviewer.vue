<template>
  <ion-row class="form-file-previewer">
    <ion-col v-for="image of images" :key="image.id">
      <ion-thumbnail>
        <img :src="formatImgUrl(image.id)" :alt="image.fileName">

        <btn color="danger" type="icon-only" icon-name="close"
             class="close-btn" @click="$emit('delete', image)"></btn>
      </ion-thumbnail>

      <div class="img-title-container" :title="image.fileName">
        <small class="img-title">{{ image.fileName }}</small>
      </div>
    </ion-col>
  </ion-row>
</template>

<script lang="ts" setup>
  import { Attachment } from '@/@types/Attachment';
  import { formatImgUrl } from '@/@utilities/images';
  import { computed } from 'vue';

  const props = defineProps<{
    modelValue: Attachment | Attachment[];
  }>();

  const emit = defineEmits(['update:modelValue', 'delete']);

  const images = computed(() => {
    if (props.modelValue instanceof Array) {
      return props.modelValue;
    }

    return [props.modelValue];
  });
</script>

<style lang="scss" scoped>
  .form-file-previewer {

    &:deep(ion-col) {
      --col-size: 80px;
      flex-grow: 0;
      flex-shrink: 1;

      ion-thumbnail {
        --size: var(--col-size);
        position: relative;

        &:after {
          content: "";
          width: 100%;
          padding-bottom: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background-image: linear-gradient(228deg, black -20%, rgba(0, 0, 0, 0) 45%);
        }
      }

      .close-btn {
        --size: 20px;
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 2;
        margin: 0;
      }

      .img-title-container {
        max-width: var(--col-size);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
