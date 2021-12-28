<template>
  <IonPage>
    <IonContent>
      <TopToolbar include-back slot="fixed" class="product-toolbar"></TopToolbar>

      <div class="product-slideshow-container">
        <ion-slides v-if="product && product.images"
                    class="h-100"
                    pager
                    :options="slideOpts">
          <ion-slide v-for="image of product.images" :key="image.id">
            <ion-img :src="formatImgUrl(image.id)" :alt="image.fileName"/>
          </ion-slide>
        </ion-slides>
      </div>

      <ion-grid fixed class="ion-text-left">
        <ion-row>
          <ion-col>
            <h1 class="titolo-prodotto">{{ product?.title }}</h1>
            <div class="prezzo-prodotto">
              <BriteValue :value="product?.price"></BriteValue>
            </div>
          </ion-col>
        </ion-row>

        <div class="pb-4 pt-5">
          <Tabs :data="tabsItems">
            <template v-slot:tabSlide_description>
              <div v-html="product?.description"></div>
            </template>

            <template v-slot:tabSlide_conditions>
              <div>Presto disponibili...</div>
            </template>
          </Tabs>
        </div>

        <div class="ion-text-center">
          <ClubButton size="large" version="filled"
                      @click="addToCart">Aggiungi al carrello
          </ClubButton>
        </div>
      </ion-grid>

    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from "vue";
  import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import BriteValue from '@/components/BriteValue.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import Tabs from '@/components/tabs/Tabs.vue';
  import { formatImgUrl } from '@/@utilities/images';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { Product } from '@/@types/Product';
  import { TabEntry } from '@/@types/TabEntry';

  export default defineComponent({
    name: "Product",
    components: {
      Tabs,
      BriteValue,
      TopToolbar,
      ClubButton
    },
    setup () {
      const route = useRoute();
      const store = useStore(storeKey);
      const http = inject("http") as HttpPlugin;
      const alerts = inject("alerts") as AlertsPlugin;
      const product: Ref<Product | undefined> = ref()
      const category = ref('descrizione')
      const tabsItems: TabEntry[] = [{
        id: "description",
        text: "Descrizione"
      }, {
        id: "conditions",
        text: "Condizioni"
      }]
      const slideOpts = {
        initialSlide: 0,
        speed: 400,
      };

      onIonViewDidEnter(async () => {
        // only fetch data if the params contain an id
        if (route.params.id) {
          const productDetails = await http.api.products.read(route.params.id as string)

          product.value = productDetails
        }
      })

      onIonViewDidLeave(async () => {
        product.value = undefined;
        category.value = "descrizione";
      })

      const addToCart = async () => {
        await store.dispatch("cart/add", product.value)

        await alerts.toastSuccess("Prodotto aggiunto al carrello.")
      }

      return {
        category,
        product,
        slideOpts,
        formatImgUrl,
        addToCart,
        tabsItems
      }
    }
  })
</script>

<style lang="scss" scoped>
  $slider-height: 60vh;

  .product-toolbar {
    &::after {
      background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      height: 250%;
      top: 0;
      bottom: unset;
    }
  }

  .product-slideshow-container {
    height: $slider-height;
    position: sticky;
    top: 0;

    ion-img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    + ion-grid {
      position: relative;
      z-index: 2;
      backdrop-filter: blur(12px);
      //background: var(--secondary-bg-gradient);
    }
  }

</style>
