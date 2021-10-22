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


            <form-input label="Username" type="mail"
                        clear-input
                        v-model="formData.email"/>

            <form-input label="Password" type="password"
                        clear-input
                        v-model="formData.email"/>

            <!--
                        <IonItem position="floating" class="checkbox">
                          <IonCheckbox checked></IonCheckbox>
                          <IonLabel class="ion-text-center">Remember me</IonLabel>
                        </IonItem>
            -->

            <btn size="large" icon-name="login-btn"
                 expand="block"
                 @click="login">Login
            </btn>


            <!--
                        <btn icon-name="login-btn" type="icon-only">asdasdsada</btn>
                        <btn icon-name="login-btn" size="large" type="toolbar">asdasdsada</btn>
            -->

            <div class="ion-text-center" href="http://localhost:8100/reset">
              <IonButton fill="clear" id="underline">Hai dimenticato la password?</IonButton>
            </div>
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

<script lang="ts" setup>
  import { defineComponent, inject, reactive } from 'vue';
  import { AuthPlugin } from '@/plugins/AuthPlugin';
  import Icon from '@/components/Icon.vue';

  const auth: AuthPlugin | undefined = inject<AuthPlugin>('auth');

  const formData = reactive({
    email: 'florian.leica@gmail.com',
    password: 'password1234',
  });

  async function login () {
    try {
      await auth?.login({ ...formData });
    } catch (e) {
      console.log(e);
    }
  }

  async function logout () {
    await auth?.logout();
  }
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");

.logo-container {
  /* logo-club 1 */

  width: 75%;
  max-width: 700px;
  height: 30%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8vh;

  background: url(/assets/GlobalClubGold.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

ion-input {
  background: #212121;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  /*max-width: 60vh;*/

  --padding-start: 15px;
  border-radius: 20px;
  height: 4rem;
  --placeholder-color: #888;

  color: #969696;
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 27px;
  text-align: left;
}

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

h1 {
  font-weight: bolder;
}

ion-checkbox::part(container) {
  --background-checked: var(--ion-color-primary);
  margin-right: auto;
  margin-left: auto;
}

/*ion-item {
  --background: transparent;
  color: var(--ion-color-primary);
  --inner-border-width: 0;
}*/

ion-label {
  /* Remember me */

  color: var(--ion-color-primary);

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
}

.login-bt {
  /* Login */

  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;

  color: white;

  --border-radius: 20px;
  width: 20rem;
  height: 4rem;
  margin-top: 3rem;
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
