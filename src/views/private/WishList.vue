<template>
  <IonPage>
    <IonContent class="ion-padding">
    
     Viaggi

   
        <br>
        <ion-grid>
        <ion-row>
          <ion-col>
          <div class="container">
          <img class="imgprodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="topleft" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
           
          </div>
          <ion-router-link style="color:#fff;" href="http://localhost:8100/product">Titolo</ion-router-link>
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="imgprodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="topleft" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

        </ion-row>

        <ion-row>
          <ion-col>
           <div class="container">
          <img class="imgprodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="topleft" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="imgprodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="topleft" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>
        </ion-row>
     </ion-grid>

     
    Elettronica

    <ion-grid>
        <ion-row>
          <ion-col>
          <div class="container">
          <img class="imgprodotto" src="/assets/icons/elettronica.jpg">
         <ion-icon class="topleft" src="./assets/icons/circle-right.svg"></ion-icon>
           <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
           
          </div>
          <ion-router-link style="color:#fff;" href="http://localhost:8100/product">Titolo</ion-router-link>
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="imgprodotto" src="/assets/icons/elettronica.jpg">
         <ion-icon class="topleft" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottomright" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

        </ion-row>

     </ion-grid>

     
    

    </IonContent>
</IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent } from "vue";

export default defineComponent({
  name: "WishList",
  setup() {
    //const http: HttpPlugin = inject('http');
  },
});
</script>


<style>

.imgprodotto{
    border-radius: 20px;
    height: auto;
    width: 100%;
}


.container {
  position: relative;
}

.topleft {
  position: absolute;
  bottom:15px;
  right: 15px;
  font-size: 18px;
}


.bottomright{
  position: absolute;
  top: 8px;
  left: 16px;
  font-size: 18px;
}


</style>