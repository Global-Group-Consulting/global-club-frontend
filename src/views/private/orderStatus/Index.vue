<template>
   <IonPage>
     
        <div class="header-nav"> 
      <TopToolbar include-back>Order number</TopToolbar>
        </div>
          
      <IonContent class="ion-padding">
         <ion-app>
            <ion-content>
               <ion-grid>
                  <ion-row>
                     <ion-col>
                        <h6>Totale</h6>
                     </ion-col>
                     <ion-col>
                        <div class="brite">
                           <img class="brite-img" src="/assets/brite.png" alt="" />
                           5000
                        </div>
                     </ion-col>
                  </ion-row>
               </ion-grid>

               <ion-grid class="prodotti-carrello">
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
                        <div class="quantity">1</div>
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
                       <div class="quantity">1</div>
                     </ion-col>
                     <ion-col size="3">
                        <ion-icon class="icon-alignment" src="./assets/icons/chevron-right.svg"></ion-icon>
                     </ion-col>
                  </ion-row>
                  <hr/>
                  
               </ion-grid>
               <BottomDrawer></BottomDrawer>
            </ion-content>
         </ion-app>
      </IonContent>
   </IonPage>
</template>
<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
<script>
   import BottomDrawer from "./BottomDrawer.vue";
   
   export default {
     name: "App",
     components: { BottomDrawer },
   };
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

.brite-img{
   width:16px;
}


.prodotti-carrello {
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

.icon-alignment{
position: absolute;
top: 65px;
}

.img-radius{
   border-radius: 25px!important;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}


</style>