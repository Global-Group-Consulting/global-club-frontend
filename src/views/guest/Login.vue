<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="testo">
              <h3>Gentile utente,</h3>
              <h1>Benvenuto</h1>
            </div>

            <form-input
              label="Username"
              type="mail"
              clear-input
              v-model="formData.email"
            />

            <form-input
              label="Password"
              type="password"
              clear-input
              v-model="formData.password"
            />

            <!--
                        <IonItem position="floating" class="checkbox">
                          <IonCheckbox checked></IonCheckbox>
                          <IonLabel class="ion-text-center">Remember me</IonLabel>
                        </IonItem>
            -->

            <btn
              class="ion-text-capitalize"
              size="large"
              icon-name="login-btn"
              expand="block"
              @click="login"
              >Login
            </btn>

            <div class="ion-text-center" href="http://localhost:8100/reset">
              <IonButton fill="clear" id="underline"
                >Hai dimenticato la password?</IonButton
              >
            </div>
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
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

.testo {
  margin-bottom: 4rem;
  margin-top: -3rem;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
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

#underline {
  text-decoration: underline;
}
</style>
