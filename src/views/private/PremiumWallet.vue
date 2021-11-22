<template>
  <IonPage>
    <div class="header-nav"> 
      <TopToolbar include-back>Il mio portfolio</TopToolbar>
        </div>
    
    <IonContent class="ion-padding">
        <ion-grid>
      <div class="scrolling-wrapper">
       <div class="modulo-cerca" @click="categoria='totale-resoconto'" value="totale-resoconto">
            <ion-chip class="resoconto">
              <ion-label>Resoconto</ion-label>
            </ion-chip>
        </div>
       <div class="modulo-cerca" @click="categoria='totale-trimestre'" value="totale-trimestre">
            <ion-chip class="trimestre">
              <ion-label>1/1/21 - 30/06/21</ion-label>
            </ion-chip>
        </div>
       <div class="modulo-cerca">
            <ion-chip class="trimestre">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
        </div>
        <div class="modulo-cerca">
            <ion-chip class="trimestre">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
        </div>
      </div>
      </ion-grid>
        <br>
        <v-switch :case="categoria">

    <template #totale-resoconto>
      
        <ion-grid class="banner">
        <ion-row>
          <div class="money">
            <img src="/assets/brite-gold.png" />
            <p class="somma">76.654</p>
            <p class="descrizione">Totale utilizzabile</p>
          </div>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="money">
              <img src="/assets/brite-gold.png" />
              <p class="somma">30.876</p>
              <p class="descrizione">Scadono a Gennaio '22</p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <div class="money">
              <img src="/assets/brite-gold.png" />
              <p class="somma">45.778</p>
              <p class="descrizione">Scadono a Luglio '22</p>
            </div>
          </ion-col>
          <ion-col size="4" class="dettagli">
            <div>
              <btn
                class="ion-text-capitalize m-0 button1"
                size="small"
                expand="block"
                @click="$router.push('#')"
              >
                Dettagli
              </btn>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

    </template>
    <template #totale-trimestre>
      

      <ion-grid class="banner">
        <ion-row>
          <div class="money">
            <img src="/assets/brite-gold.png" />
            <p class="somma">27.820</p>
            <p class="descrizione">Totale disponibile</p>
          </div>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="money">
              <img src="/assets/brite-gold.png" />
              <p class="somma">5000</p>
              <p class="descrizione">Brite utilizzati</p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="8">
            <div class="money">
              <img src="/assets/brite-gold.png" />
              <p class="somma">32.830</p>
              <p class="descrizione">Brite accumulati</p>
            </div>
          </ion-col>
          <ion-col size="4" class="dettagli">
            <div>
              <btn
                class="ion-text-capitalize m-0 button1"
                size="small"
                expand="block"
                @click="$router.push('#')"
              >
                Dettagli
              </btn>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </v-switch>

</IonContent>
</IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent, ref } from "vue";
import VSwitch from '@lmiller1990/v-switch';

export default defineComponent({
  name: "PremiumWallet",
  components: {
    VSwitch
  },
  setup() {
    return {
      categoria: ref('totale-resoconto')
    }
    //const http: HttpPlugin = inject('http');
  },

});
</script>

<style>

.banner {
  background-color: #272727;
  background-image: url(/assets/banner.svg);
  width: 80vw;
  max-width: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 6px;
  
}

.money {
  text-align: left;
}

.money img {
  display: inline-block;
  height: 20px;
  width: 18.612716674804688px;
  margin-right: 5px;
}

.somma {
  display: inline-block;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  margin-bottom: 0;
  margin-top: 0;
}

.descrizione {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  color: #ada9a4;
  margin-top: 0;
}

.button1{
position: absolute;
    bottom: 20px;
}

.dettagli {
  text-align: left;
}

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.modulo-cerca {
    display: inline-block;
  }

  .modulo-cerca :hover{
 background-color:#967d4a;
}

.scrolling-wrapper::-webkit-scrollbar {
    display: none;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}


</style>