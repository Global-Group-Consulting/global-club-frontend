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
      <h1>Login to your account</h1>
      <IonInput type="mail" placeholder="Username"></IonInput>
      <br />
      <IonInput type="password" placeholder="Password"></IonInput>

      <IonItem position="floating">
        <IonCheckbox slot="start" checked></IonCheckbox>
        <IonLabel>Remember me</IonLabel>
      </IonItem>

      <IonButton class="login-bt ion-text-capitalize">Login</IonButton>

      <IonItem class="ion-text-center" href="https://www.ionicframework.com">
        <IonLabel>Forgot your password?</IonLabel>
      </IonItem>

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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap");

ion-menubutton {
  --background: red;
}

h1 {
  color: var(--ion-color-primary);
  font-weight: bold;
  font-family: "Open Sans", sans-serif;
}

ion-input {
  --background: #212121;
  --placeholder-color: var(--ion-color-secondary-tint);
  border-radius: 20px;
  height: 4rem;
}
ion-checkbox {
  --background-checked: var(--ion-color-primary);
}

ion-item {
  --background: var(--ion-color-primary-contrast);
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
}

ion-input {
  --placeholder-color: #888;
  background: #212121;
  border-radius: 25px;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  align-items: center;
  color: #979797;
  text-align: left;
  --padding-start: 15px;
}
</style>