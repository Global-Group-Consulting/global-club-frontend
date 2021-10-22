<template>
  <IonPage>
    <!--<IonHeader :translucent="false">
      <div class="logo-container"></div>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary"></IonMenuButton>
        </IonButtons>
        <IonTitle>{{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>-->

    <IonContent class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <h1 class="down">Login to your account</h1>
            <IonInput
              required="true"
              type="mail"
              placeholder="Username"
              clear-input="true"
            ></IonInput>
            <br />
            <IonInput
              required="true"
              type="password"
              placeholder="Password"
              clear-input="true"
            ></IonInput>

            <IonItem position="floating" class="checkbox">
              <IonCheckbox checked></IonCheckbox>
              <IonLabel class="ion-text-center">Remember me</IonLabel>
            </IonItem>

            <IonButton class="login-bt ion-text-capitalize">Login</IonButton>

            <IonItem class="ion-text-center" href="http://localhost:8100/reset">
              <IonLabel>Forgot your password?</IonLabel>
            </IonItem>
          </ion-col>
        </ion-row>
      </ion-grid>

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

<style >
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap");

/*.logo-container {
 

  position: absolute;
  width: 415px;
  height: 226px;
  left: 0px;
  top: -60px;

  background: url(/public/assets/logo-club1.png);
}*/

/*

h1 {
  Login to your account 
  margin-bottom: 3rem;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #ab8e54;
  text-shadow: 0px 4px 4px #000000;
}*/
/*
ion-checkbox::part(container) {
  --background-checked: var(--ion-color-primary);
  margin-right: auto;
  margin-left: auto;
}

ion-item {
  --background: transparent;
  color: var(--ion-color-primary);
  --inner-border-width: 0;
}

ion-label {
  

  color: var(--ion-color-primary);

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
}

.login-bt {
  

  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ion-color-primary-contrast);

  --border-radius: 20px;
  width: 20rem;
  height: 4rem;
  margin-top: 3rem;
}*/

h1 {
  margin-top: 100px;
  font-size: 3rem;
}
</style>
