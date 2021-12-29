<template>
  <AdminListItem
      :title="product.title"
      :description="prodDesc"
      :open-link="{ name: (asAdmin ? 'admin.products.details': 'private.products.details'), params: { id: product?._id ?? '' } }"
      :open-link-label="$t('pages.products.btn_open')"
      :image="product?.thumbnail?.id"
  >
    <template v-slot:buttons-start>
      <slot name="buttons-start"></slot>
    </template>
    <template v-slot:buttons-end>
      <slot name="buttons-end"></slot>
    </template>
  </AdminListItem>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { Product } from '@/@types/Product';
  import { formatBrites, formatCurrency } from '@/@utilities/currency';

  export default defineComponent({
    name: "AdminProductListItem",
    components: { AdminListItem },
    props: {
      product: Object as PropType<Product>,
      qta: Number,
      price: {
        type: Number,
        default: 0
      },
      asAdmin: {
        type: Boolean,
        default: true
      }
    },
    setup (props) {
      const prodDesc = computed(() => {
        if (!props.product) {
          return ""
        }

        const toReturn: string[] = [];

        if (props.qta) {
          const price = formatBrites(props.price * props.qta);

          if (price) {
            toReturn.push(`${formatBrites(props.price)} X ${props.qta} =`, price);
          }
        }

        return toReturn.join(" ");
      })

      return { prodDesc }
    }
  });
</script>

<style scoped>

</style>
