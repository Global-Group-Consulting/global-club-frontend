<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="header-nav">
        <TopToolbar include-back>Carrello</TopToolbar>
      </div>

      <ion-grid>
        <ion-row>
          <ion-col>
            <h6>Totale provvisorio</h6>
          </ion-col>
          <ion-col> 
              <BriteValue :value="cartTotal"></BriteValue>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list>
        <ion-item v-for="entry of products" :key="entry.product._id">
          <ion-thumbnail slot="start">
            <slot name="image">
              <img :src="formatImgUrl(entry.product.thumbnail.id)" alt="cover_image">
            </slot>
          </ion-thumbnail>

          <ion-label>
            <h2 v-html="entry.product.title"></h2>
            <div class="d-flex ion-align-items-center">
              <ClubButton size="small" only-icon icon icon-name="minus"
                          @click="changeQta(entry, -1)"/>
              <span class="px-2 ion-text-center" style="min-width: 40px;">
                {{ entry.qta }}
              </span>
              <ClubButton size="small" only-icon icon icon-name="plus"
                          @click="changeQta(entry,+1)"/>
            </div>
          </ion-label>

          <ion-buttons>
            <PageLink :to="{name: 'private.product', params: {id: entry.product._id}}"
                      :btn-props="{fill:'clear'}">
              Vai al prodotto
            </PageLink>
            <ClubButton version="link" style="color: red" only-icon icon icon-name="trash"
                        @click="removeProduct(entry)"/>
          </ion-buttons>

        </ion-item>
      </ion-list>

      <ion-row class="ion-justify-content-center mt-5">
        <ion-col class="ion-text-center" size="12" size-sm="7" size-md="6">
          <ClubButton size="large" expanded>
            Procedi all'ordine
          </ClubButton>
        </ion-col>
      </ion-row>
    </ionContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    IonContent,
    IonPage,
  } from "@ionic/vue";
  import { warning } from "ionicons/icons";
  import { computed, defineComponent } from "vue";
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { formatBrites } from '@/@utilities/currency';
  import { formatImgUrl } from '@/@utilities/images';
  import { ComputedRef } from 'vue';
  import { OrderProduct } from "@/@types/Order";
  import BriteValue from '@/components/BriteValue.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import { Product } from '@/@types/Product';
  import PageLink from '@/components/PageLink.vue';

  export default defineComponent({
    components: {
      PageLink,
      ClubButton,
      TopToolbar,
      BriteValue,
      IonPage,
      IonContent,
      ClubButton,
    },
    name: "ShoppingCart",
    setup () {
      const store = useStore(storeKey);
      const products: ComputedRef<OrderProduct[]> = computed(() => store.getters["cart/products"]);
      const cartTotal = computed(() => store.getters["cart/tempTotal"]);

      function changeQta (entry: OrderProduct, value: number) {
        if (entry.qta <= 1 && value === -1) {
          return
        }

        store.dispatch("cart/updateQta", {
          productId: entry.product._id,
          qta: value
        })
      }

      function removeProduct (entry: OrderProduct) {
        store.dispatch("cart/remove", entry.product._id)
      }

      return {
        warning,
        cartTotal,
        products,
        formatBrites, formatImgUrl,
        changeQta, removeProduct
      };
    },
  });
</script>

<style>

  
  .prodotticarrello {
    background-color: rgb(30, 30, 30);
    text-align: left;
    font-size: 13px;
  }


  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(243, 243, 243, 0.342);
  }

  .btncart {
    text-transform: none;
    color: #fff;
    font-size: 15px;
    padding: 50px;
  }

  .icon-alignment {
    position: absolute;
    top: 75px;
  }

  .img-radius {
    border-radius: 25px;
  }

  .brite-img {
    width: 15px;
  }

  .header-nav {
    color: white;
    padding-left: 30px;
    padding-right: 75px;
  }

  .increment-content {
    background-color: #2d2d2d;
    width: max-content;
    border-radius: 50px;
    margin-top: 10px;
    height: 35px;
  }

.carrello-dettagli{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
}

</style>
