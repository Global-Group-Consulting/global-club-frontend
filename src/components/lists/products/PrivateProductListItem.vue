<template>
  <PageLink :to="{name: 'private.product', params: {id: product._id}}"
            only-container>
    <template v-slot:default="{href, navigate}">
      <ion-card class="product-card" :href="href" @click="navigate">
        <ion-img class="product-card-img" :src="formatImgUrl(product.thumbnail?.id)" alt="cover_image"/>

        <ion-card-header>
          <ion-card-title v-html="prodTitle"/>
        </ion-card-header>

        <div class="overlay">
          <div class="clickable-area btn-fav" @click.stop.prevent="toggleFavourite">
            <ClubButton only-icon icon icon-name="star"
                        :color="isFavourite ? 'primary' : 'secondary'"
                        class="m-0"></ClubButton>
          </div>
        </div>

      </ion-card>
    </template>
  </PageLink>
</template>

<script lang="ts">
  import { computed, defineComponent, inject, PropType } from 'vue';
  import { Product } from '@/@types/Product';
  import { formatCurrency } from '@/@utilities/currency';
  import { formatImgUrl } from '@/@utilities/images';
  import PageLink from '@/components/PageLink.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { AlertsPlugin } from '@/plugins/Alerts';

  export default defineComponent({
    name: "PrivateProductListItem",
    components: { ClubButton, PageLink },
    props: {
      product: Object as PropType<Product>,
      asAdmin: {
        type: Boolean,
        default: true
      }
    },
    setup (props) {
      const store = useStore(storeKey)
      const alerts = inject("alerts") as AlertsPlugin;
      const prodTitle = computed(() => {
        if (!props.product) {
          return ""
        }

        return props.product.title
      })

      const isFavourite = computed(() => store.getters["favourites/products"].find(el => el._id === props.product?._id))

      async function toggleFavourite () {
        if (isFavourite.value) {
          const result = await alerts.ask({
            header: "Rimozione preferito",
            message: "Sei sicuro di voler rimuovere questo prodotto dalla lista dei preferiti?",
            buttonOkText: "Si, rimuovi",
            buttonCancelText: "No, annulla"
          })

          if (result) {
            await store.dispatch("favourites/toggle", props.product)
          }
        } else {
          await store.dispatch("favourites/toggle", props.product)
        }
      }

      return {
        prodTitle, formatImgUrl, toggleFavourite,
        isFavourite
      }
    }
  });
</script>

<style scoped>

</style>
