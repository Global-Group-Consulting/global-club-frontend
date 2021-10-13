
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
        <div class="text">
          <p>
            We are so glad to welcome you to Global Club App! Please login to
            your account to start tracking all your movement and enjoy it!
          </p>
        </div>
        <IonButton
          class="login-bt ion-text-capitalize"
          shape="round"
          @click="$router.push('/login')"
          >Login</IonButton
        >
      </div>
      <div class="g-container">
        <div class="g-logo"></div>
      </div>
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

/*div .logo-container {
  /*logo-club 1 */

/*position: fixed;
  width: 415px;
  height: 226px;
  left: 0px;
  top: -60px;
  z-index: +10;

  background-image: url("/assets/logo trasparent.png");
}*/
.container {
  margin-top: 25vh;
  margin-bottom: 0;
}
h1 {
  /* Welcome */

  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 35px;

  align-items: center;
  text-align: center;

  color: #ab8e54;
}

.text {
  width: 50vmin;
  margin-left: auto;
  margin-right: auto;
}

p {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #969696;
  margin: 30px 0px 36px 0px;
}

.login-bt {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
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

g-container {
  position: relative;
}
div .g-logo {
  /* logo_dark 1 */

  position: absolute;
  width: 33vmin;
  height: 66vmin;

  background: url("/assets/logo_grey1.png");
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: contain;

  right: 0;
  bottom: 0;
}
</style>
