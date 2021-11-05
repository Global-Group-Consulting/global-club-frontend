<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>

      <form @submit.prevent="login" @keydown.enter="login">
        <ion-grid fixed>
          <ion-row class="ion-justify-content-center">
            <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
              <div class="mt-5vh mb-4">
                <p class="login-first-text">Gentile utente,</p>
                <p class="login-second-text">Benvenuto</p>
              </div>

              <FormInput
                label="Username"
                type="mail"
                clear-input
                v-model="formData.email"
              />

              <FormInput
                label="Password"
                type="password"
                clear-input
                :add-space-after="false"
                v-model="formData.password"
              />

              <IonButton
                class="btn-link"
                fill="clear"
                @click="$router.push('/reset')"
                >Hai dimenticato la password?
              </IonButton>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </IonContent>

    <ion-footer>
      <ion-grid fixed class="grid-login">
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8" class="py-0">
            <btn
              class="ion-text-capitalize"
              size="large"
              icon-name="login-btn"
              expand="block"
              @click="login"
            >
              Login
            </btn>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts" setup>
import { defineComponent, inject, reactive } from "vue";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import Icon from "@/components/Icon.vue";
import { AlertsPlugin } from "@/plugins/Alerts";
import FormInput from "@/components/forms/FormInput.vue";

const auth: AuthPlugin | undefined = inject<AuthPlugin>("auth");
const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

const formData = reactive({
  email: "florian.leica@gmail.com",
  password: "password1234",
});

async function login() {
  try {
    await auth?.login({ ...formData });
  } catch (e) {
    await alerts.error(e);
  }
}

async function logout() {
  await auth?.logout();
}
</script>

<style scoped>
</style>
