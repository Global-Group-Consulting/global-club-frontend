<template>
  <IonPage> 
    

    <IonContent class="ion-padding">

         <ion-grid>
        <ion-row>
          <ion-col size="2">
            <ion-img src="/assets/workout-pic.png"></ion-img>
          </ion-col>
          <ion-col size="6">
           Mario Rossi
           Pacchetto Fast
          </ion-col>
          <ion-col size="4">
             <ion-button size="small">Modifica</ion-button>
          </ion-col>

        </ion-row>
      </ion-grid>

      <ion-grid class="daticontent">
         <ion-row>
           <h2>Account</h2>
           </ion-row> 

        <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Dati personali</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Dati contratuali</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">I miei ordini</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Il mio profilo</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

  </ion-grid>

    <br>


  <ion-grid class="daticontent">
         <ion-row>
           <h2>Notifiche</h2>
           </ion-row> 

        <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Notifiche Pop-up</div> 
      </ion-col>
      <ion-col size="2">
          <ion-toggle></ion-toggle>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Le mie notifiche</div> 
      </ion-col>
      <ion-col size="2">
       
      </ion-col>
      </ion-row>

  </ion-grid>
    
          <br>


     <ion-grid class="daticontent">
         <ion-row>
           <h2>Altri</h2>
           </ion-row> 

        <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Contattaci</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Privacy Policy</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="2">
        <ion-icon src="./assets/icons/filter.svg"></ion-icon>
      </ion-col>
      <ion-col size="8">
        <div class="textcontent">Logout</div> 
      </ion-col>
      <ion-col size="2">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>


     </ion-grid>


    </IonContent>
    </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent,ref} from "vue";
import VSwitch from '@lmiller1990/v-switch';

export default defineComponent({
  name: "Product",
   components: {
    VSwitch
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



.content1{
width: 80vw;
}


.btncontainer {
background-color: #1e1e1e;
border-radius: 20px;
}



.textcontent {
  text-align: left;
}

.daticontent{
background-color: rgb(30, 30, 30);
border-radius: 30px;
text-align: left;
}

</style>