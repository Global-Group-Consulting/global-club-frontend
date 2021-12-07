<template>
  <AdminListItem
      :title="prodTitle"
      :description="product?.description"
      :open-link="{ name: 'admin.products.details', params: { id: product?._id ?? '' } }"
      :open-link-label="$t('pages.products.btn_open')"
      :image="product?.thumbnail?.id"
  >
  </AdminListItem>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { Product } from '@/@types/Product';
  import { formatCurrency } from '@/@utilities/currency';

  export default defineComponent({
    name: "ProductListItem",
    components: { AdminListItem },
    props: {
      product: Object as PropType<Product>,
      qta: Number
    },
    setup (props) {
      const prodTitle = computed(() => {
        if (!props.product) {
          return ""
        }

        const toReturn = [props.product.title];

        if (props.qta) {
          const price = formatCurrency(props.product.price * props.qta);

          if (price) {
            toReturn.push(`(x${props.qta}) =`, price);
          }
        }

        return toReturn.join(" ");
      })

      return { prodTitle }
    }
  });
</script>

<style scoped>

</style>
