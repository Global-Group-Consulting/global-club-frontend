<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div v-if="!emailSent">
        <div class="logo-container"></div>
        <form>
          <ion-grid fixed class="grid-login">
            <ion-row class="ion-justify-content-center">
              <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
                <div class="testo">
                  <p class="login-first-text">
                    Ti invitiamo ad inserire la tua email.<br/>
                    Riceverai in seguito un messaggio<br/>
                    con le istruzioni su come reimpostare<br/>
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

      <div v-else>
        mostro blocco secondario
      </div>
    </IonContent>

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

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "Login",
    data () {
      return {
        emailSent: true,
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







