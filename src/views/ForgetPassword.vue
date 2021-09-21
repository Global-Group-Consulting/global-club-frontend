<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonImg> </IonImg>

        <IonTitle> </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <h1>Welcome</h1>
      <p>We are so glad to welcome you to Global Club App!</p>
      <p>
        Please login to your account to start tracking all your movement and
        enjoy it!
      </p>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonToolbar,
} from "@ionic/vue";

export default defineComponent({
  name: "Dashboard",
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonToolbar,
});
</script>