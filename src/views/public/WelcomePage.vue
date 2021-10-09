
<template>
  <IonPage>
<!--    <IonHeader>
      <div class="logo-container"></div>
      <div class="vertical-line"></div>

      <IonToolbar> </IonToolbar>
    </IonHeader>-->
    <IonContent>
      <div class="vertical-line"></div>
      <div class="container">
        <h1>Welcome</h1>

        <p>
          We are so glad to welcome you to <br />Global Club App!<br />Please
          login to your account to start <br />tracking all your movement and
          <br />enjoy it!
        </p>

        <IonButton
            class="login-bt ion-text-capitalize"
            shape="round"
            @click="$router.push('/login')"
          >Login</IonButton
        >
      </div>
      <div class="g-logo"></div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonToolbar,
  IonButton,
  IonItem,
  IonThumbnail,
  IonList,
  IonLabel,
} from "@ionic/vue";

export default defineComponent({
  name: "Dashboard",
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonToolbar,
  IonButton,
  IonItem,
  IonThumbnail,
  IonList,
  IonLabel,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;800&display=swap");

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
  /* Welcome */
  margin-top: 6rem;

  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;

  align-items: center;
  text-align: center;

  color: #ab8e54;
}

p {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #969696;
  margin: 30px 46px 36px 46px;
}

.login-bt {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: #000000;
  --padding-start: 56px;
  --padding-end: 56px;
  --border-radius: 15px;
  --padding-bottom: 0px;
  --padding-top: 0px;
  --background: #ab8e54;
}

.vertical-line {
  border-left: 2px solid #ab8e54;
  height: 100%;
  position: absolute;
  left: 9%;
  margin-left: -3px;
  top: 0;
}

.g-logo {
  /* logo_dark 1 */

  position: fixed;
  width: 500px;
  height: 500px;
  left: 289px;
  top: 397px;

  background: url("/assets/logo_white.png");
}

.container {
  position: relative;
}
</style>
