<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>

      <ion-grid fixed class="ion-no-padding ion-margin-top">
        <ion-row>
          <ion-col class="ion-align-self-end">
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
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid fixed class="ion-no-padding ion-margin-top">
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="ion-text-start text-small text-gray2">
              <p>Bentornato,</p>
            </div>
          </ion-col>

          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div></div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div>
              <p class="title ion-text-left ion-no-margin">Mario Rossi</p>
            </div>
          </ion-col>

          <ion-col
            class="ion-align-self-center"
            sizeLg="6"
            sizeMd="7"
            sizeSm="8"
          >
            <div class="ion-text-end">
              <img class="ion-margin-end" src="/assets/brite.png" alt="" />
              <p class="brite-h1 title-big ion-no-margin">76.654</p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-top ion-margin-bottom">
          <ion-col>
            <ion-chip class="resoconto text-xsmall font-bold">
              <ion-label>Resoconto</ion-label>
            </ion-chip>
            <ion-chip class="text-xsmall text-gray1">
              <ion-label>1/1/21 - 30/06/21</ion-label>
            </ion-chip>
            <ion-chip class="text-xsmall text-gray1">
              <ion-label>1/7/21 - 31/12/21</ion-label>
            </ion-chip>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8"> </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="banner" fixed>
        <ion-row>
          <div class="ion-text-start">
            <img class="ion-margin-end" src="/assets/brite-gold.png" />
            <p class="somma">76.654</p>
            <p class="text-small text-gray2 ion-no-margin">
              Totale utilizzabile
            </p>
          </div>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="ion-text-start">
              <img class="ion-margin-end" src="/assets/brite-gold.png" />
              <p class="somma">30.876</p>
              <p class="text-small text-gray2 ion-no-margin">
                Sacadono a Gennaio '22
              </p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="ion-text-start">
              <img class="ion-margin-end" src="/assets/brite-gold.png" />
              <p class="somma">45.778</p>
              <p class="text-small text-gray2 ion-no-margin">
                Scadono a Luglio '22
              </p>
            </div>
          </ion-col>
          <ion-col class="dettagli" sizeLg="6" sizeMd="7" sizeSm="8">
            <div>
              <btn
                class="ion-text-capitalize m-0"
                size="large"
                expand="block"
                @click="$router.push('#')"
              >
                Detagli
              </btn>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid fixed class="ion-no-padding ion-margin-top">
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <p class="stato-ordini">Stato ordini in corso</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <img src="/assets/workout-pic.png" alt="" />
          </ion-col>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <p class="text-small text-gray3">Ordine del 20/o9/'21</p>
            <p class="text-gray2 text-xsmall">
              Stato: <span>In lavorazione</span>
            </p>
            <ion-progress-bar color="primary" value="0.5"></ion-progress-bar>
          </ion-col>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <btn
              size="small"
              shape="round"
              slot="icon-only"
              icon-name="circle-right"
              @click="$router.push('/order')"
            ></btn>
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
/* Search Bar */

.searchbar-input {
  --background: white;
  --border-radius: 15px;
  --color: #ada9a4;
}

.search-container {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 15px;
}

.brite-h1 {
  display: inline-block;
}

.resoconto {
  background: linear-gradient(
    274.3deg,
    #ab8e54 0%,
    #6f592f 99.99%,
    #ad9c7b 100%
  );
}

.banner {
  background-color: #272727;
  background-image: url(/assets/banner.svg);
  max-width: 600px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  margin-right: auto;
  margin-left: auto;
}

.money img {
  display: inline-block;
  height: 20px;
  width: 18px;
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

.dettagli {
  text-align: left;
}
</style>
