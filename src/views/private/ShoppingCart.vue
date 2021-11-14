<template>
  <IonPage>
    <IonContent class="ion-padding">


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
        <ion-img src="/assets/icons/prodotto.jpg"></ion-img>
      </ion-col>
      <ion-col size="6">
        <div> Viaggio all inclusive ...</div>
        <div class="brite1">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              2500
            </div>
         <ion-button size="small">-</ion-button> 0 <ion-button size="small">+</ion-button>
      </ion-col>
      <ion-col size="3" class="gh">
       
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
        
      </ion-col>
      
    </ion-row>
     <hr />

 
        <ion-row>
      <ion-col size="3">
        <ion-img src="/assets/icons/prodotto.jpg"></ion-img>
      </ion-col>
      <ion-col size="6">
        <div> Viaggio all inclusive ...</div>
        <div class="brite1">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              2500
            </div>
            <ion-button size="small">-</ion-button> 0 <ion-button size="small">+</ion-button>
      </ion-col>
      <ion-col size="3">
       
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
        
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
import { pin, walk, warning, wifi, wine } from "ionicons/icons";
import { defineComponent, inject } from "vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonLabel,
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

 

</style>