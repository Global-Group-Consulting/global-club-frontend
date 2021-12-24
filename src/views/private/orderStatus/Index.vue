<template>
   <IonPage>
     
        <div class="header-nav"> 
      <TopToolbar include-back>Order number</TopToolbar>
        </div>
          
      <IonContent class="ion-padding">
         <ion-app>
            <ion-content>
               <ion-grid fixed>
                  <ion-row>
                     <ion-col class="ion-text-start">
                        <h3>Totale</h3>
                     </ion-col>
                     <ion-col class="icon-position">
                          <BriteValue :value="product?.price"></BriteValue>
                     </ion-col>
                  </ion-row>
               </ion-grid>

               <ion-grid fixed class="prodotti-carrello">
                  <ion-row>
                     <ion-col size="3">
                        <img class="img-radius" src="/assets/icons/prodotto.jpg">
                     </ion-col>
                     <ion-col size="7" class="carrello-dettagli">
                        <div> Viaggio all inclusive ...</div>
                        <BriteValue :value="product?.price"></BriteValue>
                        <div class="quantity">1</div>
                     </ion-col>
                     <ion-col size="2" class="icon-position">
                        <ion-icon style="zoom:2.0;" src="./assets/icons/chevron-right.svg"></ion-icon>
                     </ion-col>
                  </ion-row>
                  <hr />
                  <ion-row>
                     <ion-col size="3">
                        <img class="img-radius" src="/assets/icons/prodotto.jpg">
                     </ion-col>
                     <ion-col size="7" class="carrello-dettagli">
                        <div> Viaggio all inclusive ...</div>
                        <BriteValue :value="product?.price"></BriteValue>
                       <div class="quantity">1</div>
                     </ion-col>
                     <ion-col size="2" class="icon-position">
                       <ion-icon style="zoom:2.0;" src="./assets/icons/chevron-right.svg"></ion-icon>
                     </ion-col>
                  </ion-row>
                  <hr/>
                  
               </ion-grid>
               <ion-grid fixed>
               <BottomDrawer></BottomDrawer>
               </ion-grid>
            </ion-content>
         </ion-app>
      </IonContent>
   </IonPage>
</template>
<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
<script>
   import BottomDrawer from "./BottomDrawer.vue";
   import BriteValue from '@/components/BriteValue.vue';
   export default {
     name: "App",
     components: { BottomDrawer,BriteValue, },
   };
</script>
<style>


hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(243, 243, 243, 0.342);
}

.quantity{
    background-color: #323232;
    width: 25px;
    border-radius: 50%;
    text-align: center;
    height: 25px;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
   margin-top: 10px;
}



.img-radius{
   border-radius: 25px!important;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

.carrello-dettagli{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
}


.icon-position{
   display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

</style>