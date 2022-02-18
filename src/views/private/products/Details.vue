<template>
  <IonPage>
    <IonContent @ionScrollEnd="onScrollEnd" @ionScroll="onScroll" scroll-events>
      <TopToolbar include-back slot="fixed" class="product-toolbar"></TopToolbar>

      <div class="product-slideshow-container" :style="`filter: brightness(${brightness})`">
        <ion-slides v-if="product && product.images"
                    class="h-100"
                    pager
                    :options="slideOpts">
          <ion-slide v-for="image of product.images" :key="image.id">
            <Image class="full-width" :file-id="image.id" :file-name="image.fileName" fallback-large/>
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
          <Tabs :data="tabsItems" ref="tabs" :show-tabs="tabsItems.length > 1">
            <template v-slot:tabSlide_description>
              <div v-html="product?.description"></div>
            </template>

            <template v-slot:tabSlide_conditions>
              <div v-html="product?.conditions"></div>
            </template>
          </Tabs>
        </div>

        <div class="ion-text-center mt-3 mb-5">
          <ClubButton size="large" version="filled"
                      @click="addToCart">Aggiungi al carrello
          </ClubButton>
        </div>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, Ref, ref } from "vue";
  import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
  import { useRoute, useRouter } from 'vue-router';
  import {useStore} from 'vuex';
  import {storeKey} from '@/store';
  import BriteValue from '@/components/BriteValue.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import Tabs from '@/components/tabs/Tabs.vue';
  import {formatImgUrl} from '@/@utilities/images';
  import {HttpPlugin} from '@/plugins/HttpPlugin';
  import {AlertsPlugin} from '@/plugins/Alerts';
  import {Product} from '@/@types/Product';
  import {TabEntry} from '@/@types/TabEntry';
  import Image from "@/components/Image.vue";

  export default defineComponent({
    name: "Details",
    components: {
      Image,
      Tabs,
      BriteValue,
      TopToolbar,
      ClubButton
    },
    setup () {
      const route = useRoute();
      const router = useRouter();
      const store = useStore(storeKey);
      const http = inject("http") as HttpPlugin;
      const alerts = inject("alerts") as AlertsPlugin;
      const product: Ref<Product | undefined> = ref()
      const tabs: Ref<typeof Tabs | null> = ref(null)
      const category = ref('descrizione')
      const tabsItems: ComputedRef<TabEntry[]> = computed(() => [{
            id: "description",
            text: "Descrizione",
          }, {
            id: "conditions",
            text: "Condizioni",
            if: !!product.value?.conditions
          }].filter(el => el.if ?? true)
      )
      const slideOpts = {
        initialSlide: 0,
        speed: 400,
      };
      const scrollPercent = ref(0)

      const brightness = computed(() => {
        const value = 1 - scrollPercent.value / 100;

        if (value < 0.5) {
          return .5
        }
        return value
      })

      function onScrollEnd () {
        tabs.value?.updateSlider()
      }

      function onScroll (e: Event & { detail: { scrollTop: number }; currentTarget: HTMLElement }) {
        const scrollHeight = (e.currentTarget.shadowRoot?.querySelector("main")?.scrollHeight ?? 0) - e.currentTarget.offsetHeight;
        scrollPercent.value = e.detail.scrollTop * 100 / scrollHeight;
      }

      onIonViewDidEnter(async () => {
        // only fetch data if the params contain an id
        if (route.params.id) {
          try {
            const productDetails = await http.api.products.read(route.params.id as string)

            product.value = productDetails

            tabs.value?.updateSlider()
          } catch (er: any) {
            if (er?.response.status === 404) {
              await router.back()
            }
          }
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
        addToCart, onScrollEnd, onScroll,
        tabsItems, tabs,
        scrollPercent, brightness,
      }
    }
  })
</script>

<style lang="scss" scoped>
$slider-height: 60vh;

:deep {

  .product-toolbar {
    &::after {
      content: none;
    }
  }

  .product-slideshow-container {
    height: $slider-height;
    position: sticky;
    top: 0;

    &::after {
      content: "";
      background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
      height: 50%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }

    ion-img.full-width {
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
}

</style>
