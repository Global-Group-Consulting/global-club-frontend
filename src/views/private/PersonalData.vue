<template>
  <IonPage>
      <div class="header-nav"> 
            <TopToolbar include-back>Dettagli prodotto</TopToolbar>
            </div>
    <IonContent class="ion-padding">
    <ion-grid>
    <ion-row class="btn-tabs">
        <ion-col value="descrizione">
            <ClubButton color="secondary" version="link" @click="categoria='personali'" value="personali" class="btn-hover">Personali</ClubButton>
            
          </ion-col>

          <ion-col>
        <ClubButton color="secondary" version="link" @click="categoria='contrattuali'" value="contrattuali" class="btn-hover">Contrattuali</ClubButton>
            </ion-col>
         
        </ion-row>
        <br>
        <v-switch :case="categoria">
    <template #personali>
      testo 1 
    </template>

    <template #contrattuali>
      testo 2 
    </template>
  </v-switch>

       </ion-grid>


    </IonContent>
  </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent, ref } from "vue";
import VSwitch from '@lmiller1990/v-switch';
import ClubButton from '@/components/ClubButton.vue';

export default defineComponent({
  name: "User",
  components: {
    VSwitch, ClubButton
  },
setup() {
    return {
      categoria: ref('descrizione')
    }
  }
});
</script>
<style>

.btn-tabs {
background-color: #1e1e1e;
border-radius: 20px;
}

.btn-hover:hover{
  background-color:#ab8e54;
  border-radius: 20px;
}

.btn-hover:hover{
  background-color:#ab8e54;
  border-radius: 20px;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

</style>