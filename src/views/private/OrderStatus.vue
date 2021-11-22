<template>
   <IonPage>
     
        <div class="header-nav"> 
      <TopToolbar include-back>Order number</TopToolbar>
        </div>
          
      <IonContent class="ion-padding">
         <ion-app>
            <ion-content scrollY="false">
               
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
                  <hr />
                  
               </ion-grid>
               <div class="bottom-drawer" ref="drawerRef">
                  <div style="text-align:center">
                     <button @click="toggleDrawer" class="toggleButton"></button>
                  </div>
                  <ion-grid style="padding-top:0;">
                     <ion-row>
                        <ion-col>
                           <div class="ion-text-start">
                              <h3>Stato</h3>
                           </div>
                        </ion-col>
                        <ion-col>
                           <div class="ion-text-end">
                              <h6>In lavorazione</h6>
                           </div>
                        </ion-col>
                     </ion-row>
                     <ion-row>
                        <div class="container">
                           <ul>
                              <li >
                                 <div class="actions">
                                    <div class="title ion-text-start" style="margin-left:-53px; margin-top:25px;">Ordine creato</div>
                                 </div>
                                 <span class="number">
                                 <span>01</span>
                                 <span></span>
                                 </span>
                              </li>
                              <div class="actions">
                                 <div class="title ion-text-right">20/09/2021, 10:30</div>
                                 <div class="title ion-text-start">Francesco - Amministrazione</div>
                                 <div class="info ion-text-start">Gentile cliente, grazie per averci inviato questo ordine. Per poter procedere con l'ordine abbiamo bisogno di ricevere una fotocopia del suo documento di identita. </div>
                                 <br>
                                 <div class="type ion-text-start">Cordiali saluti, <br> Francesco</div>
                              </div>
                              <li style="padding-top:0px;">
                                 <div class="actions-1">
                                    <div class="title ion-text-right" style="padding-bottom:10px;">20/09/2021, 10:30</div>
                                    <div class="title ion-text-start" style="margin-left:-53px; margin-top:-45px;">Tu</div>
                                    <div class="info ion-text-start" style="margin-left:-53px;">Buongiorno Francesco, certo, ecco il documento richiesto.</div>
                                    <br>
                                    <div class="type ion-text-start" style="margin-left:-53px;">Cordiali saluti</div>
                                    <div class="custom-style ion-text-start ">
                                       <ion-button expand="block" class="m-0 button-style" color="light" size="small" @click="$router.push('#')">Documento identita.pdf </ion-button>
                                    </div>
                                 </div>
                                 <span class="number">
                                 <span>02</span>
                                 </span>
                              </li>
                              <div class="actions">
                                 <div class="title ion-text-right" style="margin-top:24px;">20/09/2021, 10:30</div>
                                 <div class="title ion-text-start">Nuovo stato ordine: In Lavorazione</div>
                              </div>
                           </ul>
                        </div>
                     </ion-row>
                  </ion-grid>
               </div>
            </ion-content>
         </ion-app>
      </IonContent>
   </IonPage>
</template>
<style src='@ionic/core/css/core.css'></style>
<style src='@ionic/core/css/ionic.bundle.css'></style>
<script>
   import { createGesture } from "@ionic/core";
   
   export default {
     name: "App",
     components: {},
     methods: {
       toggleDrawer: function() {
         const c = this.$refs.drawerRef;
         if (c.dataset.open === "true") {
           c.style.transition = ".5s ease-out";
           c.style.transform = "";
           c.dataset.open = "false";
         } else {
           c.style.transition = ".5s ease-in";
           c.style.transform = `translateY(${-340}px) `;
           c.dataset.open = "true";
         }
       }
     },
     mounted() {
       const c = this.$refs.drawerRef;
       const gesture = createGesture({
         el: c,
         gestureName: "my-swipe",
         direction: "y",
         /**
          * when moving, we start to show more of the drawer
          */
         onMove: event => {
           if (event.deltaY < -340) return;
   
           // closing with a downward swipe
           if (event.deltaY > 20) {
             c.style.transform = "";
             c.dataset.open = "false";
             return;
           }
   
           c.style.transform = `translateY(${event.deltaY}px)`;
         },
         /**
          * when the moving is done, based on a specific delta in the movement; in this
          * case that value is -150, we determing the user wants to open the drawer.
          *
          * if not we just reset the drawer state to closed
          */
         onEnd: event => {
           c.style.transition = ".5s ease-out";
   
           if (event.deltaY < -30 && c.dataset.open !== "true") {
             c.style.transform = `translateY(${-340}px) `;
             c.dataset.open = "true";
             console.log("in on end");
           }
         }
       });
   
       // enable the gesture for the item
       gesture.enable(true);
     }
   };
</script>
<style>
   #app {
   font-family: "Avenir", Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
   }
   /*
   so the goal here is to have the drawer with only 10px displayed when 
   closed, which leaves room for button or handle to start drag
   */
   .bottom-drawer {
   background-color: #0f0f0f;
   position: absolute;
   right: 4px;
   left: 4px;
   bottom: -480px;
   height: 600px;
   border-radius: 50px;
   }
   .toggleButton{
   margin-top: 30px;
   background-color: grey;
   width: 60px;
   height: 5px;
   border-radius: 80px;
   }
   .ion-text-start{
   color:white;
   padding-left:20px;
   }
   .ion-text-end{
   color:white;
   padding-right:20px;
   }
   .container ul {
   list-style: none;
   position: absolute;
   top: 65%;
   left: 50%;
   transform: translate(-50%, -50%);
   padding: 1px 100px;
   color: #fff;
   font-size: 13px;
   padding-right:0;
   padding-left:30px;
   }
   .container ul:before {
   content: '';
   width: 1px;
   height: 100%;
   position: absolute;
   border-left: 2px dashed #fff;
   left:30px;
   }
   .container ul li {
   position: relative;
   margin-left: 30px ;
   padding: 14px;
   border-radius: 6px;
   width: 250px;
   }
   .container ul li:not(:first-child) {
   margin-top: 40px;
   }
   .container ul li > span {
   height: 100%;
   background: #fff;
   left: -30px;
   top: 0;
   position: absolute;
   }
   .container ul li > span:before, .container ul li > span:after {
   content: '';
   width: 8px;
   height: 8px;
   border-radius: 50%;
   border: 4px solid #fff;
   position: absolute;
   background: brown;
   left: -7px;
   top: 0;
   }
   .container ul li span:after {
   top: 100%;
   }
   .container ul li > div {
   margin-left: 10px;  
   }
   .container div .title, .container div .type {
   font-weight: 600;
   font-size: 12px;
   }
   .container div .info {
   font-weight: 300;
   }
   .container div > div {
   margin-top: 5px;
   }
   .container span.number {
   height: 100%;
   }
   .container span.number span {
   position: absolute;
   font-size: 10px;
   left: -35px;
   font-weight: bold;
   }
   .container span.number span:first-child {
   top: 0;
   }
   .container span.number span:last-child {
   top: 100%;
   }
   .actions{
   margin-top:-45px;
   }
   .actions-1{
   padding-bottom:15px;
   }
   .button-style{
   --border-radius: 50px;
   text-align:left;
   }
   .custom-style{
   margin-left:-50px;
   padding-top:10px;
   }
   .bottom-drawer[data-open="true"] {
   height:770px;
   bottom:-540px;
   }
   .bottom-drawer[data-open="true"] .container ul{
   top:43%;
   }

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