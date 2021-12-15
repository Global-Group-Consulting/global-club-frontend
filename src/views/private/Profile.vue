<template>
  <IonPage> 
    <div class="header-nav"> 
      <TopToolbar include-back>Il mio profilo</TopToolbar>
        </div>
    <IonContent class="ion-padding">

         <ion-grid>
        <ion-row>
          <ion-col class="ion-text-center" size="2">
            <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="6">
           <div class="dati-user">Mario Rossi</div>
           <div class="dati-pacchetto">Pacchetto Fast</div>
          </ion-col>
          <ion-col size="4">
           <ClubButton size="small" version="filled">Modifica</ClubButton>
          </ion-col>

        </ion-row>
      </ion-grid>

      <ion-grid class="dati-content">
         <ion-row>
           <h2>Account</h2>
           </ion-row>

        <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/user.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Dati personali</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
        <ion-router-link class="link-color" href="#"><ion-icon src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/document.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Dati contratuali</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
      <ion-router-link class="link-color" href="#"><ion-icon src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/graph.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>I miei ordini</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
      <ion-router-link class="link-color" href="#"><ion-icon src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/chart.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Il mio profilo</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
      <ion-router-link class="link-color" href="#"><ion-icon src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>      </ion-col>
      </ion-row>

  </ion-grid>

    <br>


  <ion-grid class="dati-content">
         <ion-row>
           <h2>Notifiche</h2>
           </ion-row>

        <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/settings.svg"></ion-icon>
      </ion-col>
      <ion-col size="10" class="ion-no-padding">
        <div>Notifiche Pop-up</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end ion-no-padding">
       <ion-toggle></ion-toggle>   
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/settings.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Le mie notifiche</div>
      </ion-col>
      <ion-col size="1">

      </ion-col>
      </ion-row>

  </ion-grid>

          <br>


     <ion-grid class="dati-content">
         <ion-row>
           <h2>Altri</h2>
           </ion-row>

        <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/settings.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Contattaci</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
      <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/folder.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Privacy Policy</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
        <ion-icon src="./assets/icons/chevron-right.svg"></ion-icon>
      </ion-col>
      </ion-row>

      <ion-row>
      <ion-col size="1">
        <ion-icon src="./assets/icons/logout.svg"></ion-icon>
      </ion-col>
      <ion-col size="10">
        <div>Logout</div>
      </ion-col>
      <ion-col size="1" class="ion-text-end">
       <ion-router-link class="link-color" href="#"><ion-icon src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>
      </ion-col>
      </ion-row>


     </ion-grid>


    </IonContent>
    </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent} from "vue";
import ClubButton from '@/components/ClubButton.vue';

export default defineComponent({
  name: "Product",
   components: {ClubButton,
  
  },
  setup() {
    return {
      categoria: ('descrizione')
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

.btntittolo{
    font-size: 15px;
    padding: 20px;
}

.prezzoprodotto{
  font-size: 15px;
  color: #9a9a9a;
  text-align: left;

}

.dati-content{
background-color: rgb(30, 30, 30);
border-radius: 30px;
text-align: left;
}

.link-color{
 color:#fff;
}

.dati-user{
 text-align: left;
 font-size: 20px;
}

.dati-pacchetto{
 text-align: left;
 font-size: 15px;
 color:#909090;
}


.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}


</style>
