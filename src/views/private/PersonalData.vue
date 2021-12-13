<template>
  <IonPage>
      <div class="header-nav"> 
            <TopToolbar include-back>Account personale</TopToolbar>
            </div>
    <IonContent class="ion-padding">
    <ion-grid>
    <ion-row class="btn-tabs">
        <ion-col value="descrizione">
            <ClubButton color="secondary" version="link" @click="categoria='personali'" value="personali" class="btn-hover">Dati 1</ClubButton>
          </ion-col>
          <ion-col>
        <ClubButton color="secondary" version="link" @click="categoria='contrattuali'" value="contrattuali" class="btn-hover">Dati 2</ClubButton>
            </ion-col>
        </ion-row>
        <br>
        <v-switch :case="categoria">
    <template #personali>
 <PersonalDataDetail></PersonalDataDetail>
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
import PersonalDataDetail from '../private/PersonalDataDetail.vue';
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
 import ClubButton from '@/components/ClubButton.vue';
export default defineComponent({
  name: "PersonalData",
  components: {PersonalDataDetail,ClubButton},
setup() {
 const { t } = useI18n()
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