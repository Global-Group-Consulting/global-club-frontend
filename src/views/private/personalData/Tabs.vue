<template>
        <ion-grid>
    <ion-row class="btn-tabs">
        <ion-col value="descrizione">
            <ClubButton ref="btn1" color="secondary" version="link" @click="cat='personali'" value="personali" class="btn-hover">Dati 1</ClubButton>
          </ion-col>
          <ion-col>
        <ClubButton color="secondary" version="link" @click="cat='contrattuali'" value="contrattuali" class="btn-hover">Dati 2</ClubButton>
            </ion-col>
        </ion-row>
        <br>
        <v-switch :case="cat">
    <template #personali>
   <PersonalDataDetail></PersonalDataDetail>
    </template>
    <template #contrattuali>
    </template>
  </v-switch>
 </ion-grid>
</template>
<script lang="ts">
import { ref,defineComponent } from 'vue';
import VSwitch from '@lmiller1990/v-switch'
import PersonalDataDetail from '../PersonalDataDetail.vue';
import ClubButton from '@/components/ClubButton.vue';
export default defineComponent({
    name:'Tabs',
     components: {PersonalDataDetail,ClubButton,VSwitch},
    setup() {
        return {
      cat: ref<string>('personali'),
    }
    },
})
</script>
<style>

</style>
