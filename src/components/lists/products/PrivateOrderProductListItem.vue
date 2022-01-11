<template>
  <PageLink :to="{name: 'private.products.details', params: {id: product?._id}}" only-container>
    <template v-slot:default="{href, navigate}">
      <ion-item :href="href" @click="navigate" >
        <ion-thumbnail slot="start" class="center-inner-icon">
          <ion-img class="product-card-img" :src="formatImgUrl(product?.thumbnail?.id)" alt="cover_image"/>
        </ion-thumbnail>

        <ion-label>
          <h3>{{ product?.title }}</h3>
          <h4 class="d-flex ion-align-items-center">
            <ClubButton color="secondary" size="small" disabled>{{ orderProduct.qta }}</ClubButton>
            <span class="mx-2">x</span>
            <BriteValue :value="orderProduct?.price"></BriteValue>
          </h4>
        </ion-label>

        <div slot="end">
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
    },
    setup (props) {
      // const store = useStore(storeKey)
      // const alerts = inject("alerts") as AlertsPlugin;
      const product: ComputedRef<Product | undefined> = computed(() => props.orderProduct?.product);

      return {
        product,
        formatImgUrl
      }
    }
  });
</script>

<style scoped>

</style>
