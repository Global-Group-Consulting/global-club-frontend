<template>
  <ion-page>
    <ion-tabs
      @ionTabsWillChange="beforeTabChange"
      @ionTabsDidChange="afterTabChange"
    >
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="Home" href="/tabs/tab1">
          <ion-icon src="assets/HomeBtn.svg"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="WishList" href="/tabs/tab2">
          <ion-icon src="assets/WishListBtn.svg"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="G" href="/tabs/tab3">
          <ion-icon src="assets/G-btn.svg"></ion-icon>
        </ion-tab-button>

        <ion-tab-button tab="Shopping Cart" href="/tabs/tab4">
          <ion-icon src="assets/CartBtn.svg"></ion-icon>
        </ion-tab-button>

        <ion-tab-button class="button-native" tab="User" href="/tabs/tab5">
          <ion-icon src="assets/UserBtn.svg"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonIcon,
  IonLabel,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";
import { calendar, personCircle } from "ionicons/icons";

export default defineComponent({
  components: { IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    };
    const afterTabChange = () => {
      // do something after tab change
    };
    return {
      beforeTabChange,
      afterTabChange,
    };
  },
});
</script>
<style>
ion-tab-bar {
  --ion-color-base: trasparent !important;

  position: absolute;
  bottom: 0;
  width: 100%;
}

ion-tab-button::part(native) {
  --color-selected: red;
  --background: red;
  --background-focused: red;
  --color: red;
  --color-focused: red;
  --ripple-color: red;
}
</style>
