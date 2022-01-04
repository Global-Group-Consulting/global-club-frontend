<template>
  <PageLink :to="{name: 'private.products.details', params: {id: product._id}}"
            only-container>
    <template v-slot:default="{href, navigate}">
      <ion-card class="product-card" :href="href" @click="navigate">
        <div class="product-img-wrapper">
          <ion-img class="product-card-img" :src="formatImgUrl(product.thumbnail?.id)" alt="cover_image"/>

          <div class="overlay">
            <div class="clickable-area btn-fav" @click.stop.prevent="toggleFavourite">
              <ClubButton only-icon icon icon-name="star"
                          :color="isFavourite ? 'primary' : 'secondary'"
                          class="m-0"></ClubButton>
            </div>

            <div class="clickable-area btn-go">
              <ClubButton only-icon icon icon-name="chevron-right"
                          version="outline"
                          class="m-0"></ClubButton>
            </div>
          </div>
        </div>

        <ion-card-header>
          <ion-card-title v-html="prodTitle"/>
        </ion-card-header>


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
    name: "PrivateProductCardItem",
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

        let title = props.product.title;
        const maxLength = 30;
9
        if (title.length > maxLength) {
          title = title.slice(0, maxLength) + "..."
        }

        return title
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
