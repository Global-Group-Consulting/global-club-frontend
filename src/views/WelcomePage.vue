
<template>
  <IonPage>
    <IonHeader>
      <div class="global"></div>
      <div class="vl"></div>
      <IonToolbar> </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="vl"></div>

      <h1>Welcome</h1>

      <p>
        We are so glad to welcome you to <br />Global Club App!<br />Please
        login to your account to start <br />tracking all your movement and
        <br />enjoy it!
      </p>

      <IonButton class="login-bt ion-text-capitalize" shape="round"
        >Login</IonButton
      >
      <div class="img-container"></div>
      <!--<img class="img" src="logo_white.png" alt="" />-->
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

  setup() {
    const items = [
      {
        /*text: "Item 1",*/
        src: "/public/assets/patternlandscape.png",
      },
      {
        /*text: "Item 2",*/
        src: "/public/assets/logo_white.png",
      },
      {
        /* text: "Item 3",*/
        src: "/public/assets/logo_white.png",
      },
    ];
    return { items };
  },
});
</script>

<style scoped>
h1 {
  color: #ab8e54;
  font-weight: bold;
}
p {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #969696;
  margin: 36px 56px 36px 56px;
}

@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;800&display=swap");
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
}

p {
  /* We are so glad to welcome you to Global Club App! Please login to your account to start tracking all your movements and enjoy it! */

  width: 328px;
  height: 82px;

  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;

  color: #969696;
}

.vl {
  border-left: 2px solid #ab8e54;
  height: 100%;
  position: absolute;
  left: 9%;
  margin-left: -3px;
  top: 0;
}

.img {
  height: 100%;
  z-index: +10;
  width: 100%;
  position: relative;
}
.img-container {
  position: absolute;
  --background: url(patternlandscape.png);
}

.global {
  /* logo-club 1 */

  position: absolute;
  width: 415px;
  height: 226px;
  left: 0px;
  top: -60px;

  background: url(/public/assets/global.png);
}
</style>