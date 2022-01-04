<template>

      <div class="scrolling-wrapper">

       <div class="modulo-cerca" @click="category='totale-resoconto'" value="totale-resoconto">
            <ion-chip class="trimestre">
              <ion-label>Resoconto</ion-label>
            </ion-chip>
        </div>

       <div class="modulo-cerca" @click="category='totale-primo-trimestre'" value="totale-primo-trimestre">
            <ion-chip class="trimestre">
              <ion-label>1/1/21 - 30/06/21</ion-label>
            </ion-chip>
        </div>

       <div class="modulo-cerca"  @click="category='totale-secondo-trimestre'" value="totale-secondo-trimestre" >
            <ion-chip class="trimestre">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
        </div>

        <div class="modulo-cerca" @click="category='totale-terzo-trimestre'" value="totale-terzo-trimestre">
            <ion-chip class="trimestre">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
        </div>

      </div>

  <br/>

   <v-switch :case="category">
    <template #totale-resoconto>
       <ion-grid class="banner" >
        <ion-row>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
          <div class="money">
            <BriteValue></BriteValue>
            <p class="somma">76.654</p>
            <p class="descrizione">Totale utilizzabile</p>
            </div>
            </ion-col>


          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
            <div class="money">
              <BriteValue></BriteValue>
              <p class="somma">30.876</p>
              <p class="descrizione">Scadono a Gennaio '22</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
            <div class="money">
              <BriteValue></BriteValue>
              <p class="somma">45.778</p>
              <p class="descrizione">Scadono a Luglio '22</p>
            </div>
          </ion-col>
          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
            <ClubButton size="small" version="filled">Dettagli</ClubButton>
          </ion-col>
        </ion-row>
      </ion-grid>


    </template>

    <template #totale-primo-trimestre>

      <ion-grid class="banner">
        <ion-row>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
          <div class="money">
           <BriteValue></BriteValue>
            <p class="somma">27.820</p>
            <p class="descrizione">Totale disponibile</p>
          </div>
         </ion-col>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
            <div class="money">
              <BriteValue></BriteValue>
              <p class="somma">5000</p>
              <p class="descrizione">Brite utilizzati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
            <div class="money">
             <BriteValue></BriteValue>
              <p class="somma">32.830</p>
              <p class="descrizione">Brite accumulati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
               <ClubButton size="small" version="filled">Dettagli</ClubButton>
          </ion-col>


        </ion-row>
      </ion-grid>
    </template>


    <template #totale-secondo-trimestre>
      <ion-grid class="banner">
        <ion-row>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
          <div class="money">
           <BriteValue></BriteValue>
            <p class="somma">27.820</p>
            <p class="descrizione">Totale disponibile</p>
          </div>
         </ion-col>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
            <div class="money">
              <BriteValue></BriteValue>
              <p class="somma">3000</p>
              <p class="descrizione">Brite utilizzati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
            <div class="money">
             <BriteValue></BriteValue>
              <p class="somma">32.830</p>
              <p class="descrizione">Brite accumulati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
               <ClubButton size="small" version="filled">Dettagli</ClubButton>
          </ion-col>


        </ion-row>
      </ion-grid>
    </template>


        <template #totale-terzo-trimestre>
      <ion-grid class="banner">
        <ion-row>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
          <div class="money">
           <BriteValue></BriteValue>
            <p class="somma">27.820</p>
            <p class="descrizione">Totale disponibile</p>
          </div>
         </ion-col>
          <ion-col size-lg="3" size-md="6" size-sm="12" size-xs="12" size="12">
            <div class="money">
              <BriteValue></BriteValue>
              <p class="somma">2000</p>
              <p class="descrizione">Brite utilizzati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
            <div class="money">
             <BriteValue></BriteValue>
              <p class="somma">32.830</p>
              <p class="descrizione">Brite accumulati</p>
            </div>
          </ion-col>

          <ion-col size-lg="3" size-md="6" size-sm="6" size-xs="6" size="6">
               <ClubButton size="small" version="filled">Dettagli</ClubButton>
          </ion-col>


        </ion-row>
      </ion-grid>
    </template>


  </v-switch>
</template>
<script lang="ts">
  import { Statistics } from '@/@types/Statistics';
  import BriteValue from '@/components/BriteValue.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import { defineComponent, inject, onMounted, ref } from "vue";
  import VSwitch from '@lmiller1990/v-switch';
  import { HttpPlugin } from '@/plugins/HttpPlugin';

  export default defineComponent({
    name: "Movement",
    components: { VSwitch, ClubButton, BriteValue, },
    setup () {
      const category = ref('totale-resoconto');
      const statistic = ref<Statistics>();
      const http = inject("http") as HttpPlugin
      const getData = async () => {

        await http.api.dashboard.readAll().then(resp => {
          statistic.value = resp;
        });
      }

      onMounted(async () => {getData()})

      return {
        statistic,
        category
      };
    }
  });

</script>

 <style>

 .modulo-cerca {
  display: inline-block;
}

.modulo-cerca :hover {
  background-color: #967d4a;
  color: white;
}

.trimestre {
  border-radius: 50px;
  padding: 10px, 30px, 10px, 30px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  color: #7b786f;
  background-color: #272727;
}


.banner {
  background-color: #272727;
  background-image: url(/assets/banner.svg);
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


.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.scrolling-wrapper::-webkit-scrollbar {
  display: none;
}

 </style>
