<template>
  <div class="PersonalDataDatiAnagrafici">
  <ion-item>
  <ion-label position="stacked">Tipologia soggetto</ion-label>
  <ion-input class="user-label" disabled readonly><span class="data-position">Persona fisica</span></ion-input>
  <ion-label position="stacked">Nome</ion-label>
  <ion-input class="user-label" disabled readonly><span class="data-position">Mario</span></ion-input>
  <ion-label position="stacked">Cognome</ion-label>
  <ion-input class="user-label" disabled readonly><span class="data-position">Rossi</span></ion-input>
  <ion-label position="stacked">Sesso</ion-label>
  <ion-input class="user-label" disabled readonly><span class="data-position">Maschio</span></ion-input>
  <ion-label position="stacked">Codice fiscale</ion-label>
  <ion-input class="user-label" disabled readonly><span class="data-position">MRNRSS98B64I760R</span></ion-input>
  </ion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "PersonalDataDetail",
  setup() {
    return {}
  },
});
</script>

<style>
.user-label{
background-color: #fcfcfc;
color: black;
margin-top: 15px;
border-radius: 15px;
}

.data-position {
padding-left:10px;
}

</style>
