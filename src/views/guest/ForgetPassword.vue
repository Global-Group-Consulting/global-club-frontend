<template>
  <IonPage>
    <IonContent class="ion-padding">
      <!-- Sezione visibile appena si atterra sulla pagina -->
      <div v-if="!emailSent">
        <div class="logo-container"></div>
        <form>
          <ion-grid fixed>
            <ion-row class="ion-justify-content-center">
              <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
                <div class="what-to-do">
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
      </div>

      <!-- Sezione visibile SOLO dopo l'invio della mail -->
      <div v-else>
        <!-- html con la v gigante che dice che tutto è andato bene -->
        <div class="logo-container"></div>
        <ion-grid fixed>
          <ion-row class="ion-justify-content-center">
            <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
              <div class="v-container"></div>
              <div class="what-to-do">
                <p class="login-first-text">
                  Abbiamo preso in carico la tua richiesta. A breve riceveri una
                  email con le istruzioni necessarie.
                </p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </IonContent>

    <ion-footer>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <!-- Visibile se l'email non è ancora stata inviata -->
            <btn
              v-if="!emailSent"
              class="ion-text-capitalize btn-margin"
              size="large"
              icon-name="lock-btn"
              expand="block"
              @click="onSendEmailClick"
            >
              Recupera password
            </btn>

            <!-- Visibile SOLO DOPO che l'email è stata inviata -->
            <btn
              v-else
              class="ion-text-capitalize btn-margin"
              size="large"
              icon-name="chevron-left"
              expand="block"
              @click="$router.push({ name: 'public.login' })"
            >
              Torna al login
            </btn>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onIonViewDidLeave } from "@ionic/vue";

export default defineComponent({
  name: "ForgetPassword",
  setup() {
    const emailSent = ref(false);

    function onSendEmailClick() {
      emailSent.value = true;
    }

    onIonViewDidLeave(() => {
      emailSent.value = false;
    });

    return {
      emailSent,
      onSendEmailClick,
    };
  },
});
</script>

<style scoped>
</style>







