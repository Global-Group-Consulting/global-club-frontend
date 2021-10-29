<template>
  <IonPage>
    <IonContent class="ion-padding" v-if="!emailSent">
      <div class="logo-container"></div>
      <form>
        <ion-grid fixed class="grid-login">
          <ion-row class="ion-justify-content-center">
            <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
              <div class="testo">
                <p class="login-first-text">
                  Ti invitiamo ad inserire la tua email.<br />
                  Riceverai in seguito un messaggio<br />
                  con le istruzioni su come reimpostare<br />
                  la tua passoword
                </p>
              </div>
              <form-input
                class="form"
                label="✉ Email"
                type="mail"
                clear-input
              />
              <!-- <IonContent class="ion-padding" v-if="!emailSent"> -->
              <IonButton
                class="reset"
                fill="clear"
                @click="$router.push('/login')"
                >Torna alla pagina di login?
              </IonButton>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </IonContent>
    <ion-content class="ion-padding" v-else>
      mostro blocco secondario
    </ion-content>
    -->

    <ion-footer>
      <ion-grid fixed class="grid-login">
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <btn
              class="ion-text-capitalize"
              size="large"
              icon-name="lock-btn"
              expand="block"
              @click="login"
            >
              Recupera password
            </btn>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts" setup>
import {
  IonInput,
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
} from "@ionic/vue";

import { defineComponent, inject } from "vue";
import { AuthPlugin } from "@/plugins/AuthPlugin";
import Icon from "@/components/Icon.vue";
import { AlertsPlugin } from "@/plugins/Alerts";

const auth: AuthPlugin | undefined = inject<AuthPlugin>("auth");
const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

async function logout() {
  await auth?.logout();
}

export default defineComponent({
  name: "Login",
  components: {
    IonPage,
    IonHeader,
    IonContent,
    IonInput,
    IonButton,
  },
  data() {
    return {
      emailSent: false,
    };
  },
});
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







