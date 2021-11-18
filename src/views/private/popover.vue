<template>
  <ion-content class="ion-padding">
    
    <div class="scrolling-wrapper">

       <div class="modulo-cerca">
            <ion-chip class="resoconto">
              <ion-label>Resoconto</ion-label>
            </ion-chip>
        </div>

       <div class="modulo-cerca">
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
    
     </ion-content>

  
</template>

<script>
import { IonContent } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Popover",
  components: { IonContent },
});
</script>