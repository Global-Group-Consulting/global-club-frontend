<template>
  <IonPage>
    <IonContent class="ion-padding">


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
              <p class="descrizione">Sacadono a Gennaio '22</p>
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


       <ion-row>
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
      categoria: ref('descrizione')
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
</style>