<template>
  <IonPage>


    <IonContent class="ion-padding">


   <ion-row>
         <ion-col>
           <img src="/assets/product1.jpg" alt="" />
           </ion-col>
         </ion-row>



       <ion-grid class="ion-no-padding content1">
         <ion-row>
         <ion-col>
           <div class="titoloprodotto">Viaggio All-inclusive per 2 persone alle Maldive</div>
         </ion-col>
         </ion-row>
        <br>
      <ion-row>
         <ion-col>
            <div class="prezzoprodotto">Br 2500</div>
         </ion-col>
       </ion-row>
        <ion-row class="btncontainer">
        <ion-segment value="descrizione">
          <ion-segment-button @click="categoria='descrizione'" value="descrizione">
            <ion-label>Descrizione</ion-label>
          </ion-segment-button>
          <ion-segment-button @click="categoria='condizioni'" value="condizioni">
            <ion-label>Condizioni</ion-label>
          </ion-segment-button>
        </ion-segment>


        </ion-row>
        <br>
        <v-switch :case="categoria">
    <template #descrizione>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </template>

    <template #condizioni>
      Default
    </template>
  </v-switch>




        <!-- <ion-row>
          <ion-col>
            <div class="descprodotto">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
          </ion-col>
        </ion-row> -->


      <br>
      <ion-row>
         <ion-col>
          <ion-button size="large" class="btncarrello"><span class="btntittolo">Aggiungi al carrello</span></ion-button>
         </ion-col>
       </ion-row>

       </ion-grid>



    </IonContent>
    </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent, ref } from "vue";
// import VSwitch from '@lmiller1990/v-switch';
export default defineComponent({

  name: "Product",
   components: {
    // VSwitch
  },
  setup() {
    return {
      categoria: ref('descrizione')
    }
  }
})
</script>

<style>

.titoloprodotto{
  font-size:20px;
  text-align: left;
}

.descprodotto{
  text-align: left;
  margin-top: 20px;
  color: #ffffffd9;
}

.prodottobtn{
    background-color: #272727;
    padding: 0px;
    border-radius: 20px;
}

.btncarrello{
text-transform: none;
color:#fff;
}


.btntittolo{
    font-size: 15px;
    padding: 20px;
}

.prezzoprodotto{
  font-size: 15px;
  color: #9a9a9a;
  text-align: left;

}


ion-grid {
  margin-top: 0rem;
  max-width: 500px;
}

.content1{
width: 80vw;
}


.btncontainer {
background-color: #1e1e1e;
border-radius: 20px;
}

</style>
