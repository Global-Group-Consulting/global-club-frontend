<template>
  <IonPage>
    <div class="header-nav">
      <TopToolbar include-back>I miei ordini</TopToolbar>
        </div>
    <IonContent class="ion-padding">


 <ion-grid class="ion-no-padding history-content">
        <ion-row>
          <ion-col>
            <div class="ion-text-start">Ordini in corso</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    <br>
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="8">
            <span>Ordine del 20/09/21</span><br>
            Stato: <span class="lavorazione">In lavorazione</span>
            <ion-progress-bar class="progress" color="primary" value="0.8"></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
           <ion-icon style="zoom:2.0;padding-top:9px;" src="./assets/icons/circle-right.svg"></ion-icon>
          </ion-col>

        </ion-row>
      </ion-grid>
      <br>
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col>
            <div class="ion-text-start">Ordini conclusi</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br>
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br>
            Stato: <span class="completato">Completato</span>
            <ion-progress-bar class="progress" color="primary" value="1"></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-icon style="zoom:2.0;padding-top:9px;" src="./assets/icons/circle-right.svg"></ion-icon>
          </ion-col>

        </ion-row>
      </ion-grid>
      <br>
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br>
             Stato: <span class="annullato">Annullato</span>
            <ion-progress-bar class="progress" color="primary" value="1"></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
           <ion-icon style="zoom:2.0;padding-top:9px;" src="./assets/icons/circle-right.svg"></ion-icon>
          </ion-col>

        </ion-row>
      </ion-grid>
      <br>
       <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
           <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br>
            Stato: <span class="completato">Completato</span>
            <ion-progress-bar class="progress" color="primary" value="1"></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
          <ion-icon style="zoom:2.0;padding-top:9px;" src="./assets/icons/circle-right.svg"></ion-icon>
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
  name: "History",
  setup() {
    //const http: HttpPlugin = inject('http');
  },
});
</script>

<style>


.stato-banner {
background-color: rgb(30, 30, 30);
border-radius: 15px;
text-align: left;
font-size: 13px;
padding:10px;
padding: 20px 0px 17px 0px;
}


.progress{
height: 8px;
border-radius: 10px;
margin-top: 6px;
}

.completato{
  color: #5fe15f;
}
.annullato{
  color:#fd1818;
}

.lavorazione {
  color:#c9a866;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

.history-content {
  margin-top: 40px;
}

</style>
