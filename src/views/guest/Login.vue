<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <ion-grid fixed class="grid-login">
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="testo">
              <p class="login-first-text">Gentile utente,</p>
              <p class="login-second-text">Benvenuto</p>
            </div>

            <form-input
              class="form"
              label="✉ Username"
              type="mail"
              clear-input
              v-model="formData.email"
            />

            <form-input
              class="form"
              label="🗝 Password"
              type="password"
              clear-input
              v-model="formData.email"
            />
            <div class="ion-text-center" href="http://localhost:8100/reset">
              <IonButton class="reset" fill="clear"
                >Hai dimenticato la password?</IonButton
              >
            </div>

            <!--
                        <IonItem position="floating" class="checkbox">
                          <IonCheckbox checked></IonCheckbox>
                          <IonLabel class="ion-text-center">Remember me</IonLabel>
                        </IonItem>
            -->

            <btn
              class="btn-fixed-container ion-text-capitalize"
              size="large"
              icon-name="login-btn"
              expand="block"
              @click="login"
              >Login
            </btn>
          </ion-col>
        </ion-row>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
import { defineComponent, inject, reactive } from "vue";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import Icon from "@/components/Icon.vue";

const auth: AuthPlugin | undefined = inject<AuthPlugin>("auth");

const formData = reactive({
  email: "florian.leica@gmail.com",
  password: "password1234",
});

async function login() {
  try {
    await auth?.login({ ...formData });
  } catch (e) {
    console.log(e);
  }
}

async function logout() {
  await auth?.logout();
}
</script>

<style scoped>
.testo {
  margin-bottom: 2rem;
  margin-top: 3rem;

  color: white;
  text-shadow: 0px 4px 4px #000000;
}

#icon {
  background: url(/assets/LoginBtn.svg);
  background-repeat: no-repeat;
  background-position: 5px 2px;
  text-align: left;
  text-indent: 42px;
}

grid-login {
  margin-top: -20px;
}
</style>
