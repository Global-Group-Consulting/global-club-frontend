<template>
  <page-link :to="openLink" only-container>
    <template v-slot:default="{href, navigate}">
      <ion-item :button="isButton" :detail="isButton"
                :href="href" @click="navigate">
        <ion-thumbnail slot="start">
          <slot name="image">
            <Image :file-id="image"></Image>
          </slot>
        </ion-thumbnail>

        <ion-label>
          <h2>
            <slot name="title">
              <span v-html="title"></span>
            </slot>
          </h2>
          <h4>
            <slot name="description" v-bind:description="description">
              <span v-html="description"></span>
            </slot>
          </h4>
          <slot name="extraLabels"></slot>
        </ion-label>

        <slot name="buttons-start"></slot>

        <slot name="buttons-main">
          <page-link :to="openLink"
                     v-if="!isButton"
                     :btn-props="{ version: 'link', iconName:'chevron-right', icon: true, onlyIcon: true }">
          </page-link>
        </slot>

        <slot name="buttons-end"></slot>
      </ion-item>
    </template>
  </page-link>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { formatImgUrl } from '@/@utilities/images'
import PageLink from '@/components/PageLink.vue'
import { RouteLocationRaw } from 'vue-router'
import Image from '@/components/Image.vue'

export default defineComponent({
  name: 'AdminListItem',
  components: { Image, PageLink },
  props: {
    image: String,
    title: String,
    description: String,
    openLink: {
      required: true,
      type: Object as PropType<RouteLocationRaw>
    },
    openLinkLabel: String,
    isButton: Boolean
  },
  setup () {
    return {
      formatImgUrl
    }
  }
})
</script>

<style scoped lang="scss">
ion-thumbnail {
  background-color: var(--ion-color-secondary);
  position: relative;

  &:deep(ion-icon) {
    width: var(--size);
    height: var(--size);
    color: var(--ion-color-primary);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
