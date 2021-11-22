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
              <img class="brite-img" src="/assets/brite.png" alt="" />
              5000
            </div>
          </ion-col>
        </ion-row>
        </ion-grid>

      <ion-grid class="prodotticarrello">
        <ion-row>
      <ion-col size="3">
        <img class="img-radius" src="/assets/icons/prodotto.jpg">
      </ion-col>
      <ion-col size="6">
        <div> Viaggio all inclusive ...</div>
        <div class="brite1">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              2500
            </div>
            <div class="increment-content">
         <ion-button size="small">-</ion-button> 0 <ion-button size="small">+</ion-button>
            </div>
      </ion-col>
      <ion-col size="3">
        <ion-router-link href="http://localhost:8100/product"><ion-icon class="icon-alignment" src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>
      </ion-col>
    </ion-row>
     <hr />
        <ion-row>
      <ion-col size="3">
       <img class="img-radius" src="/assets/icons/prodotto.jpg">
      </ion-col>
      <ion-col size="6">
        <div> Viaggio all inclusive ...</div>
        <div class="brite1">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              2500
            </div>
            <div class="increment-content">
         <ion-button size="small">-</ion-button> 0 <ion-button size="small">+</ion-button>
            </div>
      </ion-col>
      <ion-col size="3">
       <ion-icon class="icon-alignment" src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>   
    </ion-row>
    <hr />
     <ion-row>
         <ion-col class="ion-text-center">
          <ion-button size="large"><div class="btncart">Procedi all'ordine</div></ion-button>
         </ion-col>
       </ion-row>
  </ion-grid>
    </ionContent>
  </IonPage>
</template>

<script>


import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { warning } from "ionicons/icons";
import { defineComponent} from "vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    // IonCard,
    // IonCardContent,
    // IonCardHeader,
    // IonCardSubtitle,
    // IonCardTitle,
    IonIcon,
    // IonItem,
    // IonLabel,
  },
  name: "ShoppingCart",

  setup() {
    return { warning };
  },
});
</script>

<style>

.brite {
  text-align:center;
  margin-top: 10px;
}

.brite1 {
  text-align:left;
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

.btncart{
text-transform: none;
color:#fff; 
font-size: 15px;
padding: 50px;
}

 .icon-alignment{
position: absolute;
top: 75px;
}

.img-radius{
  border-radius: 25px;
}

.brite-img {
width: 15px;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

.increment-content{
    background-color: #2d2d2d;
    width: max-content;
    border-radius: 50px;
    margin-top: 10px;
    height: 35px;
}

</style>