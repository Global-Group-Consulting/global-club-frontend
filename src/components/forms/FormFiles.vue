<template>

  <div class="ion-margin-bottom">

    <ion-row v-if="label">
      <ion-col class="ion-text-left">
        <span>{{ label }}</span>
      </ion-col>
    </ion-row>

    <ion-row class="form-file-previewer ">
      <template v-if="images && images.length > 0">
        <ion-col v-for="image of images" :key="image.id">
          <ion-thumbnail>
            <Image :file-id="image.id" :file-name="image.fileName" can-preview
            ></Image>

            <ClubButton color="danger" version="outline" icon-name="close"
                        icon only-icon size="small"
                        class="close-btn" @click="onRemoteFileDeleteClick(image)"
                        :tooltip="t('forms.filePreviewer.removeRemoteFileTooltip')"
            ></ClubButton>
          </ion-thumbnail>

          <div class="img-title-container" :title="image.fileName">
            <small class="img-title">{{ image.fileName }}</small>
          </div>
        </ion-col>
      </template>

      <template v-if="newImages.length > 0">
        <ion-col v-for="image of newImages" :key="image.file.name">
          <ion-thumbnail class="temp-file">
            <img :src="image.url" :alt="image.file.name">

            <ClubButton color="danger" version="outline" icon-name="close"
                        icon only-icon size="small"
                        class="close-btn" @click="onLocalFileDeleteClick(image)"
                        :tooltip="t('forms.filePreviewer.removeLocalFileTooltip')"></ClubButton>
          </ion-thumbnail>

          <div class="img-title-container" :title="image.file.name">
            <small class="img-title">{{ image.file.name }}</small>
          </div>
        </ion-col>
      </template>

      <ion-col>
        <label @click="onAddClick" class="btn-file-add" :class="{disabled: !canAddImages}"
               v-if="canAddImages">
          <ion-thumbnail>
            <icon name="plus"></icon>
          </ion-thumbnail>
          <span class="img-title-container">
          <small class="img-title">{{ $t("forms.filePreviewer.addLabel") }}</small>
        </span>
          <input type="file" @change="onFileChange" style="display: none" :accept="accept" :multiple="multiple">
        </label>
      </ion-col>
    </ion-row>

    <small v-if="showError" class="form-input-error">{{ error }}</small>
    <small v-if="message && !showError" class="form-input-message">{{ message }}</small>
  </div>

</template>

<script lang="ts" setup>
  import { Attachment, NewAttachmentFile } from '@/@types/Attachment';
  import { formatImgUrl } from '@/@utilities/images';
  import { computed, ComputedRef, inject, Ref, ref, watch } from 'vue';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { useI18n } from 'vue-i18n';
  import ClubButton from '@/components/ClubButton.vue';
  import Image from "@/components/Image.vue";


  const props = withDefaults(defineProps<{
    modelValue?: any;
    remoteImages?: any;
    label: string;
    maxImages?: number;
    accept?: string;
    multiple?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    error?: string;
    message?: string;
  }>(), {
    accept: "image/*",
    multiple: false,
    modelValue: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const emit = defineEmits(['update:modelValue', 'delete']);
  const emit = defineEmits<{
    (e: 'update:modelValue', value: NewAttachmentFile[]): void;
    (e: 'delete', value: Attachment): void;
  }>();
  const { t } = useI18n()
  const alerts = inject<AlertsPlugin>("alerts") as AlertsPlugin
  const newImages: Ref<NewAttachmentFile[]> = ref([])

  const showError = computed(() => props.error && !props.readonly && !props.disabled)

  const images: ComputedRef<Attachment[] | any[]> = computed(() => {
    if (!props.remoteImages) {
      return []
    }

    if (props.remoteImages instanceof Array) {
      return props.remoteImages as Attachment[];
    }

    return [props.remoteImages];
  });

  const canAddImages: ComputedRef<boolean> = computed(() => {
    const imagesLength = images.value.length || 0
    const newImagesLength = newImages.value.length || 0
    const maxImages = parseInt((props.maxImages || 0).toString())

    return !(maxImages > 0 && (imagesLength + newImagesLength) >= maxImages)
  })

  function onAddClick (e) {
    if (!canAddImages.value) {
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

    fileInput.value = ""
  }

  function onRemoteFileDeleteClick (image: Attachment) {
    emit('delete', image)
  }

  function onLocalFileDeleteClick (file: NewAttachmentFile) {
    const index: number = newImages.value.findIndex(localFile => localFile.url === file.url)

    if (index < 0) {
      return
    }

    URL.revokeObjectURL(file.url)

    newImages.value.splice(index, 1)
  }

  watch(() => newImages.value, (value) => {
    const files = value.reduce((acc, { file }) => {
      acc.push(file)

      return acc
    }, [] as any[])

    if (props.maxImages === 1) {
      emit("update:modelValue", files[0])
    } else {
      emit("update:modelValue", files)
    }
  }, { deep: true })

  watch(() => props.remoteImages, () => {
    newImages.value = []
  }, { deep: true })
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

        &:after, &:before {
          content: "";
          width: 100%;
          padding-bottom: 100%;
          position: absolute;
          top: 0;
          right: 0;
          //background: linear-gradient(228deg, black -20%, rgba(0, 0, 0, 0) 45%);
          transition: opacity .3s;
          opacity: 0;
        }

        &:after {
          opacity: 1;
          background: linear-gradient(228deg, black -20%, rgba(0, 0, 0, 0) 45%);
        }

        &:before {
          background: linear-gradient(190deg, black -20%, rgba(0, 0, 0, 0) 100%);
        }

        &:hover {
          &:after {
            opacity: 0;
          }

          &:before {
            opacity: 1;
          }

          .close-btn {
            &::part(native) {
              background-color: var(--ion-color-secondary) !important;
            }
          }
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
          background-color: transparent;
          border-radius: var(--border-radius);

          &:after {
            content: none;
          }

          ion-icon {
            font-size: calc(var(--size) * .60);
            color: rgba(var(--ion-color-primary-rgb), .5);
            transition: color .3s;
          }
        }
      }
    }
  }

  .form-input-message, .form-input-error {
    text-align: left;
    display: block;
  }

  .form-input-error {
    color: red;
  }
</style>
