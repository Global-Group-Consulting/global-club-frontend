<template>
 <ion-grid>
      <div class="scrolling-wrapper">

       <div class="modulo-cerca" @click="category='totale-resoconto'" value="totale-resoconto">
            <ion-chip class="resoconto">
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
  </ion-grid>


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
import { DashboardApis } from "@/plugins/httpCalls/DashboardApis";
import { Statistic } from '@/@types/Statistics';
import BriteValue from '@/components/BriteValue.vue';
import ClubButton from '@/components/ClubButton.vue';
import { defineComponent, onMounted, ref } from "vue";
  import VSwitch from '@lmiller1990/v-switch';
  export default defineComponent({
  name: "Movement",
   components: {VSwitch,ClubButton, BriteValue,},
  setup () {
 const category = ref('totale-resoconto');
 const statistic = ref<Statistic>();
 const getData = async ()=> {
  
       await DashboardApis?.readAll().then(resp => {
       statistic.value=resp;
      });
    }
    onMounted(async()=> {getData()})
  return {
      statistic,
      category
     };
    }
  });

</script>

 <style>
 </style>