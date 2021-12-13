     <template>
      <ion-grid class="statobanner">
        <ion-row>
          <ion-col size="2">
            <ion-img src="/assets/workout-pic.png"></ion-img>
          </ion-col>
          <ion-col size="8">
            <span class="order"> Ordine del 20/09/21</span><br>
            <span class="order-status">Stato: In lavorazione</span>
            <ion-progress-bar class="progress1" color="primary" value="0.8"></ion-progress-bar>
          </ion-col>
          <ion-col size="2">
            <ion-router-link href="order"><ion-icon class="icon-align" src="./assets/icons/chevron-right.svg"></ion-icon></ion-router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
      </template>
      
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "UltimoOrdine",
   components: {},
  setup () {

 const getData = async ()=> {
  
       const data = "";
    }
    onMounted(async()=> {getData()})
  return {

     };
    }
  });

</script>

 <style>
 </style>