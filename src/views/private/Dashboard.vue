<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <div class="search-container">
        <div v-if="options.length">
          <AutoComplete :options="options" :optionsKey="optionsKey" @save-option="saveResult"/>
        </div>
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
            @didDismiss="setOpen(false)">
          <Popover></Popover>
        </ion-popover>
      </div>
      <ion-grid class="ion-no-padding content1" fixed="true">
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
          <ion-col>
            <div class="brite">
              <img class="brite-img" src="/assets/brite.png" alt=""/>
              <p class="brite-h1">76.654</p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-row class="chips">
        <ion-col>
          <ion-chip class="resoconto text-xsmall font-bold ion-text-left">
            <ion-label>Resoconto</ion-label>
          </ion-chip>
        </ion-col>

        <ion-col>
          <ion-chip class="text-xsmall text-gray1">
            <ion-label>1/1/21 - 30/06/21</ion-label>
          </ion-chip>
        </ion-col>

        <ion-col>
          <ion-chip class="text-xsmall text-gray1 ion-text-end">
            <ion-label>1/7/21 - 31/12/21</ion-label>
          </ion-chip>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col sizeLg="6" sizeMd="7" sizeSm="8"></ion-col>
      </ion-row>

      <ion-grid class="banner" fixed>
        <ion-row>
          <div class="ion-text-start">
            <img class="ion-margin-end" src="/assets/brite-gold.png"/>
            <p class="title-big ion-no-margin display-ib">76.654</p>
            <p class="text-small text-gray2 ion-no-margin">
              Totale utilizzabile
            </p>
          </div>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="ion-text-start">
              <img class="ion-margin-end" src="/assets/brite-gold.png"/>
              <p class="title-big ion-no-margin display-ib">30.876</p>
              <p class="text-small text-gray2 ion-no-margin">
                Sacadono a Gennaio '22
              </p>
            </div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="ion-text-start">
              <img class="ion-margin-end" src="/assets/brite-gold.png"/>
              <p class="title-big ion-no-margin display-ib">45.778</p>
              <p class="text-small text-gray2 ion-no-margin">
                Scadono a Luglio '22
              </p>
            </div>
          </ion-col>
          <ion-col class="dettagli" sizeLg="6" sizeMd="7" sizeSm="8">
            <div>
              <btn
                  class="ion-text-capitalize m-0 button1"
                  size="small"
                  expand="block"
                  @click="$router.push('#')"
              >
                Dettagli
              </btn>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid class="ion-no-padding content1">
        <ion-row>
          <ion-col>
            <p class="stato-ordini">Stato ordini in corso</p>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid class="statobanner">
        <ion-row>
          <ion-col size="2">
            <ion-img src="/assets/workout-pic.png"></ion-img>
          </ion-col>
          <ion-col size="8">
            <span class="order"> Ordine del 20/09/21</span><br>
            <span class="order-status">Stato: In lavorazione</span>
            <ion-progress-bar class="progress1" color="primary" value="0.8"></ion-progress-bar>
          </ion-col>
          <ion-col size="2">
            <ion-icon src="./assets/icons/plus.svg"></ion-icon>
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
    <ion-footer>
      <ion-toolbar>
        <btn
            @click="$router.push({ name: '.order' })"
            fill="clear"
            size="small"
            shape="round"
            slot="icon-only"
            icon-name="circle-right"
        ></btn>
        <btn
            @click="$router.push({ name: '.order' })"
            fill="clear"
            size="small"
            shape="round"
            slot="icon-only"
            icon-name="circle-right"
        ></btn>
      </ion-toolbar>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
  import { ProductCategoryApis } from '@/plugins/httpCalls/ProductCategoryApis';
  import Popover from "./popover.vue";
  import { defineComponent, inject, ref } from 'vue';
  import AutoComplete from "../../components/AutoComplete.vue"
  import { ProductCategory } from '@/@types/ProductCategory';
  import { AlertsPlugin } from '@/plugins/Alerts';

  const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

  export default defineComponent({
    name: "Dashboard",
    components: { Popover, AutoComplete },
    setup () {
      const isOpenRef = ref(false);
      const event = ref();
      const setOpen = (state: boolean, ev?: Event) => {
        event.value = ev;
        isOpenRef.value = state;
      };
      return {
        isOpenRef,
        setOpen,
        event,
      };
    },
    data () {
      return {
        selected: {},
        options: [] as ProductCategory[] | undefined,
        optionsKey: "description"
      };
    },
    methods: {
      getData: async function () {
        try {
          await ProductCategoryApis?.readAll().then(resp => {
            this.options = resp
          });
        } catch (error) {
          await alerts.error(error);
        }

      },
      saveResult: function (_value) {
        this.selected = _value;
        console.log(this.selected);
      },

    },
    async created () {
      await this.getData();
    }
  });
</script>
 <style>
.searchbar-input {
  max-width: 30rem;
  --background: white;
  --border-radius: 15px;
}

.searchbar-input.sc-ion-searchbar-md {
  color: #ada9a4;
  font-size: 14px;
  text-align: left;
} 

.search-container {
  display: flex;
  justify-content: center;
  align-items: left;
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
  margin-top: 0rem;
  max-width: 500px;
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
  width: 80vw;
  max-width: 500px;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 30px;
  margin-right: auto;
  margin-left: auto;
  padding-bottom: 6px;
  
}

.money {
  text-align: left;
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

.dettagli {
  text-align: left;
}

.statobanner {
background-color: rgb(30, 30, 30);
border-radius: 30px;
text-align: left;
width: 80vw;
max-width: 500px;
font-size: 13px;
}

.stato-ordini {
  font-size:18px;
  text-align:left;
}

.button1{
position: absolute;
    bottom: 20px;
}

.progress1{
height: 8px;
border-radius: 10px;
margin-top: 6px;
}

.content1{
width: 80vw;
}


.sc-ion-searchbar-md-h {
border-radius: 20px;

}




</style>
