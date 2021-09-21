<template>
  <IonPage>
    <IonHeader :translucent="false">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary"></IonMenuButton>
        </IonButtons>
        <IonTitle>{{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h1>Login to uour account</h1>
      <IonInput type="mail" placeholder="Username"></IonInput>

      <IonInput
        class="ion-margin"
        type="password"
        placeholder="Password"
      ></IonInput>

      <IonItem>
        <IonCheckbox slot="start" checked></IonCheckbox>
        <IonLabel>Rememeber me</IonLabel>
      </IonItem>

      <IonButton class="login-bt ion-text-capitalize">Login</IonButton>

      <!--<div v-if="!$store.getters['auth/isLoggedIn']">
        <h1>Login to your account</h1>

        <ion-input
          :value="email"
          type="email"
          placeholder="Username"
        ></ion-input>
        <ion-input
          :value="password"
          type="password"
          placeholder="Password"
        ></ion-input>

        <ion-button @click="login">Login</ion-button>
      </div>
      <div v-else>
        <IonButton @click="logout">logout</IonButton>
      </div>-->
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonInput,
  IonLabel,
  IonButton,
  IonContent,
  IonItem,
  IonCheckbox,
  IonPage,
  IonHeader,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonInput,
    IonLabel,
    IonItem,
    IonCheckbox,
    IonButton,
  },
  /*data() {
    //return {
     // email: "",
     // password: "",
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.login({ email: this.email, password: this.password });
      } catch (e) {
        console.log(e);
      }
    },
    async logout() {
      await this.$auth.logout();
    },
  },*/
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;800&display=swap");

IonInput {
  --background: #ab8e54;
  --placeholder-color: #3d3d3d;
  background-color: #ab8e54;
}
IonCheckbox {
  --background-checked: #ab8e54;
}

IonItem {
  --background: #trasparent;
}

IonLabel {
}

.login-bt {
  display: block;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #000000;
  --padding-start: 56px;
  --padding-end: 56px;

  --border-radius: 15px;
  --padding-bottom: 0px;
  --padding-top: 0px;
}
</style>