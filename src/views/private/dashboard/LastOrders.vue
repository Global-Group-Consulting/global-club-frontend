     <template>
     <div class="user">Stato ordini in corso</div>
     <br/>
      <ion-grid class="stato-banner">
        <ion-row>
          <ion-col size="2" class="ion-text-center">
             <img src="/assets/workout-pic.png">
          </ion-col>
          <ion-col size="8">
            <span> Ordine del 20/09/21</span><br>
            Stato: <span class="lavorazione">In lavorazione</span>
            <ion-progress-bar class="progress-lavorazione" color="primary" value="0.8"></ion-progress-bar>
          </ion-col>
          <ion-col size="2" class="ion-text-center">
            <ion-router-link href="order"><ion-icon style="zoom:2.0;padding-top:9px;" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
      </template>
      
<script lang="ts">
import { defineComponent, onMounted } from "vue";
export default defineComponent({
  name: "LastOrders",
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