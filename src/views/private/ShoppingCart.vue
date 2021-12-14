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
            <div class="brite">
              <BriteValue :value="cartTotal"></BriteValue>
            </div>
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
            <h2>
              <span v-html="entry.product.title"></span>
            </h2>
            <h4>
              <div class="increment-content">
                <ion-button size="small">-</ion-button>
                0
                <ion-button size="small">+</ion-button>
              </div>
            </h4>
          </ion-label>

        </ion-item>
      </ion-list>


      <ion-row>
        <ion-col class="ion-text-center">
          <ion-button size="large">
            <div class="btncart">Procedi all'ordine</div>
          </ion-button>
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

  export default defineComponent({
    components: {
      TopToolbar,
      BriteValue,
      IonPage,
      IonContent,
    },
    name: "ShoppingCart",
    setup () {
      const store = useStore(storeKey);
      const products: ComputedRef<OrderProduct[]> = computed(() => store.getters["cart/products"]);
      const cartTotal = computed(() => store.getters["cart/tempTotal"]);

      return {
        warning,
        cartTotal,
        products,
        formatBrites, formatImgUrl
      };
    },
  });
</script>

<style>

  .brite {
    text-align: center;
    margin-top: 10px;
  }

  .brite1 {
    text-align: left;
    margin-top: 10px;
  }


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

</style>
