<template>
  <ion-row>
    <ion-col>
      <h5>{{ label }}</h5>
    </ion-col>
  </ion-row>

  <ion-row class="form-file-previewer" v-if="modelValue">
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


    <ion-col>
      <a href="#" @click.prevent="onAddClick" class="btn-file-add">
        <ion-thumbnail>
          <icon name="plus"></icon>
        </ion-thumbnail>
        <div class="img-title-container">
          <small class="img-title">Aggiungi...</small>
        </div>
      </a>
    </ion-col>
  </ion-row>
</template>

<script lang="ts" setup>
  import { Attachment } from '@/@types/Attachment';
  import { formatImgUrl } from '@/@utilities/images';
  import { computed, inject } from 'vue';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { useI18n } from 'vue-i18n';

  const props = defineProps<{
    modelValue: {} | Attachment | Attachment[];
    label: string;
    maxImages: number;
  }>();

  const emit = defineEmits(['update:modelValue', 'delete']);
  const {t} = useI18n()
  const alerts = inject<AlertsPlugin>("alerts") as AlertsPlugin

  const images = computed(() => {
    if (props.modelValue instanceof Array) {
      return props.modelValue;
    }

    return [props.modelValue];
  });

  function onAddClick () {
    if(+props.maxImages && images.value.length >= +props.maxImages){
      alerts.info(t("alerts.filesUploader.maxFiles.message", {maxFiles: props.maxImages}), t("alerts.filesUploader.maxFiles.title"))
    }
  }
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

      .btn-file-add {
        display: inline-block;
        color: inherit;
        text-decoration: inherit;

        &:hover {
          ion-thumbnail {
            ion-icon {
              color: rgba(var(--ion-color-primary-rgb), 1);
            }
          }
        }

        ion-thumbnail {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: var(--ion-color-secondary);
          border-radius: 20px;

          &:after {
            content: none;
          }

          ion-icon {
            font-size: calc(var(--size) * .60);
            color: rgba(var(--ion-color-primary-rgb), .3);
            transition: color .3s;
          }
        }
      }
    }
  }
</style>
