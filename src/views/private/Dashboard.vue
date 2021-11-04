<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <div class="search-container">
        <ion-searchbar
          placeholder="Cosa desideri cercare?"
          animated="true"
          autocomplete="on"
          inputmode="search"
        >
        </ion-searchbar>
        <btn
          class="filter"
          @click="setOpen(true, $event)"
          fill="clear"
          size="small"
          shape="round"
          slot="icon-only"
          icon-name="filter"
        ></btn>

        <ion-popover
          :is-open="isOpenRef"
          css-class="my-custom-class"
          :event="event"
          :translucent="true"
          @didDismiss="setOpen(false)"
        >
          <Popover></Popover>
        </ion-popover>
      </div>

      <ion-grid class="ion-no-padding" fixed="true">
        <ion-row>
          <ion-col>
            <div class="bentornato">
              <p>Bentornato,</p>
            </div>
          </ion-col>

          <ion-col>
            <div></div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
          <ion-col>
            <div>
              <p class="user">Mario Rossi</p>
            </div>
          </ion-col>

          <ion-col>
            <div class="brite">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              <p class="brite-h1">76.654</p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row class="chips">
          <ion-col>
            <ion-chip class="resoconto">
              <ion-label>Resoconto</ion-label>
            </ion-chip>
            <ion-chip class="trimestre">
              <ion-label>1/1/21 - 30/06/21</ion-label>
            </ion-chip>
            <ion-chip class="trimestre">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="banner">
              <div class="money">
                <img src="/assets/brite-gold.png" />
                <p class="somma">27.830</p>
                <p class="descrizione">Totale disponibile</p>
              </div>
              <div class="money">
                <img src="/assets/brite-gold.png" />
                <p class="somma">5.000</p>
                <p class="descrizione">Brite utilizzati</p>
              </div>
              <div class="money">
                <img src="/assets/brite-gold.png" />
                <p class="somma">32.830</p>
                <p class="descrizione">Brite accumulati</p>
              </div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Popover from "./popover.vue";
/* import TopToolbar from "@/components/toolbars/TopToolbar.vue"; */

export default defineComponent({
  name: "Dashboard",
  components: { Popover },
  setup() {
    const isOpenRef = ref(false);
    const event = ref();
    const setOpen = (state: boolean, ev?: Event) => {
      event.value = ev;
      isOpenRef.value = state;
    };
    return { isOpenRef, setOpen, event };
  },
});

/* export default defineComponent({
  name: "Dashboard",
  /*  components: { TopToolbar }, */
/* }); */
</script>

<style>
.searchbar-input {
  max-width: 30rem;
  --background: white;
  --border-radius: 15px;
}

.searchbar-input.sc-ion-searchbar-md {
  color: #ada9a4;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 15px;
  max-width: 31rem;
}

.bentornato {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: #ada9a4;
}
.brite {
  text-align: end;
}
.brite-h1 {
  display: inline-block;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  margin: 0;
}

ion-grid {
  margin-top: 1rem;
}

.user {
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
}

.brite-img {
  margin-right: 10px;
  margin-bottom: -5px;
}

.resoconto {
  border-radius: 50px;
  padding: 10px, 30px, 10px, 30px;
  background: linear-gradient(
    274.3deg,
    #ab8e54 0%,
    #6f592f 99.99%,
    #ad9c7b 100%
  );

  font-size: 10px;
  font-style: normal;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: 0em;
}

.trimestre {
  border-radius: 50px;
  padding: 10px, 30px, 10px, 30px;

  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  color: #7b786f;
}

.chips {
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.banner {
  background-color: #272727;
  background-image: url(/assets/banner.svg);
  width: 315px;
  height: 208px;

  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  margin-right: auto;
  margin-left: auto;
}

.money {
  text-align: left;
  margin-left: 10px;
  margin-bottom: 24px;
}

.money img {
  display: inline-block;
  height: 20px;
  width: 18.612716674804688px;
  margin-right: 5px;
}

.somma {
  display: inline-block;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  margin-bottom: 0;
  margin-top: 0;
}

.descrizione {
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0em;
  color: #ada9a4;
  margin-top: 0;
}
</style>
