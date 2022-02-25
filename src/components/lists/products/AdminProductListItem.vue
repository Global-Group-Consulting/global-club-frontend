<template>
  <AdminListItem
      :title="product.title"
      :description="prodDesc"
      :open-link="{ name: (asAdmin ? 'admin.products.details': 'private.products.details'), params: { id: product?._id ?? '' } }"
      :open-link-label="$t('pages.products.btn_open')"
      :image="product?.thumbnail?.id"
  >
    <template v-slot:buttons-start>
      <Tooltip v-if="!product.visible" tooltip="Non visibile publicamente">
        <Icon name="hide" class="me-2"></Icon>
      </Tooltip>

      <Tooltip v-if="repayment" tooltip="Rimborso">
        <Icon name="redo" class="me-2" color="green"></Icon>
      </Tooltip>

      <slot name="buttons-start"></slot>
    </template>

    <template v-slot:buttons-end>
      <slot name="buttons-end"></slot>
    </template>
  </AdminListItem>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import AdminListItem from '@/components/lists/AdminListItem.vue';
import {Product} from '@/@types/Product';
import {formatBrites} from '@/@utilities/currency';
import Icon from "@/components/Icon.vue";
import Tooltip from "@/components/Tooltip.vue";

export default defineComponent({
  name: "AdminProductListItem",
  components: {Tooltip, Icon, AdminListItem},
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
    },
    repayment: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const prodDesc = computed(() => {
      if (!props.product) {
        return ""
      }

      const toReturn: string[] = [];

      if (props.qta && !props.product.packChange) {
        const price = formatBrites(props.price * props.qta);

        if (price) {
          toReturn.push(`${formatBrites(props.price)} X ${props.qta} =`, price);
        }
      }

      return toReturn.join(" ");
    })

    return {prodDesc}
  }
});
</script>

<style scoped>

</style>
