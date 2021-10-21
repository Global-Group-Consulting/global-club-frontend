<template>
  <IonPage>

    <IonContent class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">

            <h1>Login to your account</h1>
            <IonInput
                required="true"
                type="mail"
                placeholder="Username"
                clear-input="true"
                v-model="formData.email"
            ></IonInput>
            <br/>
            <IonInput
                required="true"
                type="password"
                placeholder="Password"
                clear-input="true"
                v-model="formData.password"
            ></IonInput>

            <!--
                        <IonItem position="floating" class="checkbox">
                          <IonCheckbox checked></IonCheckbox>
                          <IonLabel class="ion-text-center">Remember me</IonLabel>
                        </IonItem>
            -->

            <IonButton class="login-bt ion-text-capitalize" @click="login">Login</IonButton>

            <IonItem class="ion-text-center" href="http://localhost:8100/reset">
              <IonLabel>Forgot your password?</IonLabel>
            </IonItem>


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
  import { inject, reactive } from 'vue';
  import { AuthPlugin } from '@/plugins/AuthPlugin';

  const auth = inject<AuthPlugin>('auth');

  const formData = reactive({
    email: 'florian.leica@gmail.com',
    password: 'password1234'
  });

  async function login () {
    try {
      await auth.login({ ...formData });
    } catch (e) {
      console.log(e);
    }
  }

  async function logout () {
    await auth.logout();
  }
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

h1 {
  /* Login to your account */
  margin-bottom: 3rem;

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: #ab8e54;
  text-shadow: 0px 4px 4px #000000;
}

ion-checkbox::part(container) {
  --background-checked: var(--ion-color-primary);
  margin-right: auto;
  margin-left: auto;
}

ion-item {
  --background: transparent;
  color: var(--ion-color-primary);
  --inner-border-width: 0;
}

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
