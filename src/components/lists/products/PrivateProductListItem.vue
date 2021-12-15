<template>
  <PageLink :to="{name: 'private.product', params: {id: product._id}}"
            only-container>
    <template v-slot:default="{href, navigate}">
      <ion-card class="product-card" :href="href" @click="navigate">
        <ion-img class="product-card-img" :src="formatImgUrl(product.thumbnail?.id)" alt="cover_image"/>

        <ion-card-header>
          <ion-card-title v-html="prodTitle"/>
        </ion-card-header>
      </ion-card>
    </template>
  </PageLink>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import { Product } from '@/@types/Product';
  import { formatCurrency } from '@/@utilities/currency';
  import { formatImgUrl } from '@/@utilities/images';
  import PageLink from '@/components/PageLink.vue';

  export default defineComponent({
    name: "PrivateProductListItem",
    components: { PageLink },
    props: {
      product: Object as PropType<Product>,
      asAdmin: {
        type: Boolean,
        default: true
      }
    },
    setup (props) {
      const prodTitle = computed(() => {
        if (!props.product) {
          return ""
        }

        return props.product.title
      })

      return { prodTitle, formatImgUrl }
    }
  });
</script>

<style scoped>

</style>
