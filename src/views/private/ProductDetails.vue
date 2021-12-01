<template>
  <IonPage>
    <IonContent>

     <ion-row class="prodotto-container">
         <ion-col>
           <div class="header-nav"> 
            <TopToolbar include-back>Dettagli prodotto</TopToolbar>
            </div>
         </ion-col>
         </ion-row>

       <ion-grid>
         <ion-row>
         <ion-col>
           <div class="titolo-prodotto">Viaggio All-inclusive per 2 persone alle Maldive</div>
         </ion-col>
         </ion-row>
       
      <ion-row>
         <ion-col>
            <div class="prezzo-prodotto">Br 2500</div>
         </ion-col>
       </ion-row>
       <br>


        <ion-row class="btn-tabs">
        <ion-col value="descrizione">
            <ClubButton color="secondary" version="link" @click="categoria='descrizione'" value="descrizione" class="btn-hover">Descrizione</ClubButton>
            
          </ion-col>

          <ion-col>
        <ClubButton color="secondary" version="link" @click="categoria='condizioni'" value="condizioni" class="btn-hover">Condizioni</ClubButton>
            </ion-col>
         
        </ion-row>
        <br>
        <v-switch :case="categoria">
    <template #descrizione>
      testo 1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  
    </template>

    <template #condizioni>
      testo 2 Aenean commodo ligula eget dolor. Aenean massa.
    </template>
  </v-switch>

       </ion-grid>
      <ClubButton size="large" version="filled">Aggiungi al carrello</ClubButton>

    </IonContent>
    </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent, ref } from "vue";
import VSwitch from '@lmiller1990/v-switch';
import ClubButton from '@/components/ClubButton.vue';
export default defineComponent({

  name: "Product",
     components: {
    VSwitch, ClubButton
  },
  setup() {
    return {
      categoria: ref('descrizione')
    }
  }
})
</script>

<style>
.prodotto-container{
 
    background-image: url(/assets/product1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 40%;

}

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
}

</style>
