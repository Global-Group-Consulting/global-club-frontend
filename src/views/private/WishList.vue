<template>
  <IonPage>
    <div class="header-nav"> 
      <TopToolbar include-back>Preferiti</TopToolbar>
        </div>
    <IonContent class="ion-padding">
    

        <ion-grid class="wish-content">
          <ion-row>
          <ion-col>
          Viaggi
          </ion-col>
          </ion-row>
        <ion-row>
          <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
           
          </div>
          <ion-router-link style="color:#fff;" href="http://localhost:8100/product">Titolo</ion-router-link>
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="top-left" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

        </ion-row>

        <ion-row>
          <ion-col>
           <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="top-left" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="top-left" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>
        </ion-row>
     </ion-grid>

    <ion-grid>
      <ion-row>
          <ion-col>
          Elettronica
          </ion-col>
          </ion-row>
        <ion-row>
          <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/elettronica.jpg">
         <ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon>
           <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
           
          </div>
          <ion-router-link style="color:#fff;" href="http://localhost:8100/product">Titolo</ion-router-link>
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/elettronica.jpg">
         <ion-icon class="top-left" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
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

.img-prodotto{
    border-radius: 20px;
    height: auto;
    width: 100%;
}


.container {
  position: relative;
}

.top-left {
  position: absolute;
  bottom:15px;
  right: 15px;
  font-size: 18px;
}


.bottom-right{
  position: absolute;
  top: 8px;
  left: 16px;
  font-size: 18px;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

.wish-content{
margin-top: 15px;
}
</style>