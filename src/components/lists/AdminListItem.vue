<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <slot name="image">
        <img :src="formatImgUrl(image)" alt="cover_image">
      </slot>
    </ion-thumbnail>

    <ion-label>
      <h2>
        <slot name="title">
          <span v-html="title"></span>
        </slot>
      </h2>
      <h4>
        <slot name="description">
          <span v-html="description"></span>
        </slot>
      </h4>
      <slot name="extraLabels"></slot>
    </ion-label>

    <page-link :to="openLink"
               :btn-props="{ fill: 'clear' }">
      {{ openLinkLabel ?? "Open" }}
    </page-link>
  </ion-item>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { formatImgUrl } from '@/@utilities/images';
  import PageLink from '@/components/PageLink.vue';
  import { RouteLocationRaw } from 'vue-router';

  export default defineComponent({
    name: "AdminListItem",
    components: { PageLink },
    props: {
      image: String,
      title: String,
      description: String,
      openLink: {
        required: true,
        type: Object as PropType<RouteLocationRaw>
      },
      openLinkLabel: String
    },
    setup () {
      return {
        formatImgUrl
      }
    }
  });
</script>

<style scoped lang="scss">
  ion-thumbnail {
    background-color: var(--ion-color-secondary);
    position: relative;

    ::v-deep(ion-icon) {
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
