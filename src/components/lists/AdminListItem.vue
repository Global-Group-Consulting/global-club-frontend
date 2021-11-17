<template>
  <ion-item>
    <ion-thumbnail slot="start">
      <img :src="formatImgUrl(image)" alt="cover_image">
    </ion-thumbnail>

    <ion-label>
      <h2>{{ title }}</h2>
      <h4>{{ description }}</h4>
    </ion-label>

    <page-link :to="{}"
               :btn-props="{ fill: 'outline', shape: 'round' }">
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

<style scoped>

</style>
