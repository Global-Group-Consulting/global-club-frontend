<template>
  <PageLink :to="linkTo" only-container>
    <template v-slot:default="{href, navigate}">
      <ion-item :href="readonly ? null : href" @click="navigate" :disabled="readonly">
        <ion-thumbnail slot="start" class="center-inner-icon">
          <ion-img class="product-card-img" :src="formatImgUrl(product?.thumbnail?.id)" alt="cover_image"/>
        </ion-thumbnail>

        <ion-label>
          <h3>{{ product?.title || "Prodotto non più disponibile" }}</h3>
          <h4 class="d-flex ion-align-items-center">
            <ClubButton color="secondary" size="small" disabled>{{ orderProduct.qta }}</ClubButton>
            <span class="mx-2">x</span>
            <BriteValue :value="orderProduct?.price"></BriteValue>
          </h4>
        </ion-label>

        <div slot="end" v-if="!readonly">
          <ClubButton only-icon icon-name="chevron-right" icon version="link" color="secondary"></ClubButton>
        </div>
      </ion-item>
    </template>
  </PageLink>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import { Product } from '@/@types/Product';
  import { formatImgUrl } from '@/@utilities/images';
  import PageLink from '@/components/PageLink.vue';
  import { OrderProduct } from '@/@types/Order';
  import ClubButton from '@/components/ClubButton.vue';
  import BriteValue from '@/components/BriteValue.vue';

  export default defineComponent({
    name: "PrivateProductListItem",
    components: { BriteValue, ClubButton, PageLink },
    props: {
      orderProduct: Object as PropType<OrderProduct>,
      readonly: Boolean
    },
    setup (props) {
      // const store = useStore(storeKey)
      // const alerts = inject("alerts") as AlertsPlugin;
      const product: ComputedRef<Product | undefined> = computed(() => props.orderProduct?.product);

      const linkTo = computed(() => {
        if (!product.value) {
          return null
        }
        return { name: 'private.products.details', params: { id: product.value?._id } }
      })

      return {
        product,
        formatImgUrl,
        linkTo
      }
    }
  });
</script>

<style scoped>

</style>
