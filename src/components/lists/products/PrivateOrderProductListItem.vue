<template>
  <PageLink :to="linkTo" only-container>
    <template v-slot:default="{href, navigate}">
      <ion-item v-bind="!readonly ? {href: href} : null"
                @click="!readonly ? navigate : null">
        <ion-thumbnail slot="start" class="center-inner-icon">
          <Image class="product-card-img" :file-id="product?.thumbnail?.id" file-name="cover_image"/>
        </ion-thumbnail>

        <ion-label>
          <h3>{{ product?.title || "Prodotto non più disponibile" }}</h3>
          <h4 class="d-flex ion-align-items-center">
            <template v-if="orderProduct.product.hasQta">
              <ClubButton color="secondary" size="small" disabled>{{ orderProduct.qta }}</ClubButton>
              <span class="mx-2">x</span>
            </template>
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
  import Image from "@/components/Image.vue";

  export default defineComponent({
    name: "PrivateOrderProductListItem",
    components: {Image, BriteValue, ClubButton, PageLink },
    props: {
      orderProduct: Object as PropType<OrderProduct>,
      readonly: Boolean
    },
    setup (props) {
      // const store = useStore(storeKey)
      // const alerts = inject("alerts") as AlertsPlugin;
      const product: ComputedRef<Product | undefined> = computed(() => props.orderProduct?.product);

      const linkTo = computed(() => {
        if (!product.value || product.value?.packChange) {
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
