<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tsb="tab1" href="/tabs/tab1">
          <ion-icon name="home-outline"></ion-icon>
        </IonTabButton>
        <IonTabButton tsb="tab2" href="/tabs/tab2">
          <ion-icon name="star-outline"></ion-icon> </IonTabButton
        ><IonTabButton tsb="tab3" href="/tabs/tab3">
          <ion-icon src="/assets/GCentral.svg"></ion-icon> </IonTabButton
        ><IonTabButton tsb="tab4" href="/tabs/tab4">
          <ion-icon name="bag-outline"></ion-icon> </IonTabButton
        ><IonTabButton tsb="tab5" href="/tabs/tab5">
          <ion-icon name="person-outline"></ion-icon>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
//import { defineComponent, inject } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet
} from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: {
    IonContent,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
    }
  }
}
</script>