<template>
  <IonPage>
    <IonHeader :translucent="false">
      <div class="logo-container"></div>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary"></IonMenuButton>
        </IonButtons>
        <IonTitle>{{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <h1>Forgot your password?</h1>
      <p>
        Don’t worry! Write here your email address and we’ll send a link for
        reset your password
      </p>

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

      <IonButton class="reset-bt ion-text-capitalize">Reset password</IonButton>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {
  IonInput,
  IonButton,
  IonContent,
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
    IonButton,
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap");

ion-menubutton {
  --background: red;
}

.logo-container {
  /* logo-club 1 */

  position: absolute;
  width: 415px;
  height: 226px;
  left: 0px;
  top: -60px;

  background: url(/public/assets/logo-club1.png);
}

h1 {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #ab8e54;
  text-shadow: 0px 4px 4px #000000;
}

p {
  font-family: Open Sans;
  color: #969696;
  text-shadow: 0px -4px 4px #000000;
}

ion-input {
  margin-left: auto;
  margin-right: auto;
  background: #212121;

  --padding-start: 15px;
  border-radius: 20px;
  height: 4rem;
  --placeholder-color: #888;
  max-width: 60vh;

  color: #969696;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: left;
}

.reset-bt {
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ion-color-primary-contrast);

  --border-radius: 20px;
  width: 20rem;
  height: 4rem;
  margin-top: 3rem;
}
</style>