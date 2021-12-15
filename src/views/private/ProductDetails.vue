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

        <div class="pb-5 pt-2">
          <!--
           Non ha senso usare una row per creare i pulsanti delle tab

           In Ionic esiste il componente ion-segment
           https://ionicframework.com/docs/api/segment

           Usiamo per favore questo componente in modalità ios.


           -->
          <ion-row class="btn-tabs">
            <ion-col value="descrizione">
              <ClubButton color="secondary" version="link" @click="categoria='descrizione'" value="descrizione"
                          class="btn-hover">Descrizione
              </ClubButton>

            </ion-col>
         
        </ion-row>
        <br>
        <v-switch :case="categoria">
    <template #descrizione>
      testo 1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  
    </template>

    <template #condizioni>
      testo 2 Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    </template>
  </v-switch>

       </ion-grid>
      <ClubButton class="sticky-button" size="large" version="filled">Aggiungi al carrello</ClubButton>

    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, Ref, ref } from "vue";
  import VSwitch from '@lmiller1990/v-switch';
  import ClubButton from '@/components/ClubButton.vue';
  import { onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { useRoute } from 'vue-router';
  import { Product } from '@/@types/Product';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { formatImgUrl } from '@/@utilities/images';
  import BriteValue from '@/components/BriteValue.vue';

  export default defineComponent({

    name: "Product",
    components: {
      BriteValue,
      TopToolbar,
      VSwitch, ClubButton
    },
    setup () {
      const route = useRoute();
      const http = inject("http") as HttpPlugin;
      const product: Ref<Product | undefined> = ref()
      const categoria = ref('descrizione')
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
        categoria.value = "descrizione";
      })

      return {
        categoria,
        product,
        slideOpts,
        formatImgUrl
      }
    }
  })
</script>

<style lang="scss" scoped>
.prodotto-container{
    background-image: url(/assets/product1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
     height: 50vh;
   
}

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
      background: var(--secondary-bg-gradient);
    }
  }

  /*.prodotto-container{

    background-image: url(/assets/product1.jpg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      height: 40%;

  }*/
  /*
  .titolo-prodotto{
    font-size:20px;
    text-align: left;
  }


  .prezzo-prodotto{
    font-size: 15px;
    color: #9a9a9a;
    text-align: left;

  }


  .btn-tabs {
  background-color: #1e1e1e;
  border-radius: 20px;
  }

  .header-nav{
  color: white;
  padding-left: 30px;
  padding-right: 75px;
  }

  .btn-hover:hover{
    background-color:#ab8e54;
    border-radius: 20px;
  }

  .btn-hover:hover{
    background-color:#ab8e54;
    border-radius: 20px;
  }*/


.sticky-button{
position: sticky;
z-index: 5;
bottom: 5%;
margin-top: 5%;
}

</style>
