<template>
  <ion-row>
    <ion-col>
      <h6 class="ion-text-left">{{ label }}</h6>
    </ion-col>
  </ion-row>

  <ion-row class="form-file-previewer ion-margin-bottom">
    <template v-if="images && images.length > 0">
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
    </template>

    <template v-if="images && newImages.length > 0">
      <ion-col v-for="image of newImages" :key="image.file.name">
        <ion-thumbnail class="temp-file">
          <img :src="image.url" :alt="image.file.name">

          <btn color="danger" type="icon-only" icon-name="close"
               class="close-btn" @click="onLocalFileDeleteClick(image)"></btn>
        </ion-thumbnail>

        <div class="img-title-container" :title="image.file.name">
          <small class="img-title">{{ image.file.name }}</small>
        </div>
      </ion-col>
    </template>


    <ion-col>
      <label @click="onAddClick" class="btn-file-add">
        <ion-thumbnail>
          <icon name="plus"></icon>
        </ion-thumbnail>
        <span class="img-title-container">
          <small class="img-title">{{ $t("forms.generic.filePreviewer") }}</small>
        </span>
        <input type="file" @change="onFileChange" style="display: none" :accept="accept" :multiple="multiple">
      </label>
    </ion-col>
  </ion-row>
</template>

<script lang="ts" setup>
  import { Attachment } from '@/@types/Attachment';
  import { formatImgUrl } from '@/@utilities/images';
  import { computed, inject, Ref, ref } from 'vue';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { useI18n } from 'vue-i18n';

  interface NewAttachmentFile {
    url: string;
    file: File;
  }

  const props = withDefaults(defineProps<{
    modelValue: {} | Attachment | Attachment[];
    label: string;
    maxImages?: number;
    accept?: string;
    multiple?: boolean;
  }>(), {
    accept: "image/*",
    multiple: false
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const emit = defineEmits(['update:modelValue', 'delete']);
  const { t } = useI18n()
  const alerts = inject<AlertsPlugin>("alerts") as AlertsPlugin
  const newImages: Ref<NewAttachmentFile[]> = ref([])

  const images = computed(() => {
    if (!props.modelValue) {
      return []
    }

    if (props.modelValue instanceof Array) {
      return props.modelValue;
    }

    return [props.modelValue];
  });

  function onAddClick (e) {
    const imagesLength = images.value.length || 0
    const newImagesLength = newImages.value.length || 0
    const maxImages = parseInt((props.maxImages || 0).toString())

    if (maxImages > 0 && (imagesLength + newImagesLength) >= maxImages) {
      e.preventDefault();
      alerts.info(t("alerts.filesUploader.maxFiles.message", { maxFiles: props.maxImages }), t("alerts.filesUploader.maxFiles.title"))
    }
  }

  function onFileChange (e: InputEvent) {
    const fileInput: HTMLInputElement = e.currentTarget as HTMLInputElement

    const selectedFiles = fileInput.files

    if (!selectedFiles) {
      return;
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      newImages.value.push({
        url: URL.createObjectURL(selectedFiles[i]),
        file: selectedFiles[i]
      })
    }
  }

  function onLocalFileDeleteClick (file: NewAttachmentFile) {
    const index: number = newImages.value.findIndex(localFile => localFile.url === file.url)

    if (index < 0) {
      return
    }

    URL.revokeObjectURL(file.url)

    newImages.value.splice(index, 1)
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
        --border-radius: 20px;
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


        &.temp-file {
          border: 2px solid var(--ion-color-primary);
          overflow: hidden;
          padding: 2px;

          .close-btn {
            top: 5px;
            right: 5px;
          }
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
        cursor: pointer;

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
          border-radius: var(--border-radius);

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
