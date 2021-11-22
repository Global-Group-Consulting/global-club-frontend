<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>

      <!-- Sezione visibile appena si atterra sulla pagina -->
      <div v-if="!emailSent">
        <form>
          <ion-grid fixed>
            <ion-row class="ion-justify-content-center">
              <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
                <div class="mt-10vh">
                  <p class="login-first-text">
                    Ti invitiamo ad inserire la tua email.<br />
                    Riceverai in seguito un messaggio con le istruzioni su come
                    reimpostare la tua passoword
                  </p>
                </div>
                <FormInput
                  label="Email"
                  type="mail"
                  clear-input
                  :add-space-after="false"
                />
                <!-- <IonContent class="ion-padding" v-if="!emailSent"> -->
                <IonButton
                  fill="clear"
                  size="small"
                  class="btn-link"
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
        <ion-grid fixed>
          <ion-row class="ion-justify-content-center">
            <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
              <div class="mt-5vh">
                <Icon name="check-large" style="font-size: 120px"></Icon>

                <p class="title ion-text-center">
                  Abbiamo preso in carico la tua richiesta. <br />
                  A breve riceveri una email con le istruzioni necessarie.
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
            <ClubButton
              v-if="!emailSent"
              size="large"
              icon-name="lock-btn"
              expanded
              @click="onSendEmailClick"
            >
              Recupera password
            </ClubButton>

            <!-- Visibile SOLO DOPO che l'email è stata inviata -->
            <ClubButton
              v-else
              size="large"
              icon-name="chevron-left"
              expanded
              @click="$router.push({ name: 'public.login' })"
            >
              Torna al login
            </ClubButton>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { onIonViewDidLeave } from "@ionic/vue";
import FormInput from "@/components/forms/FormInput.vue";
import Icon from "@/components/Icon.vue";
import ClubButton from '@/components/ClubButton.vue';

export default defineComponent({
  name: "ForgetPassword",
  components: { ClubButton, Icon, FormInput },
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







