<template>
  <IonPage> 
     <IonContent class="ion-padding">
    Risultati ricerca 


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

    <ion-grid>
        <ion-row>
          <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
           
          </div>
          <ion-router-link style="color:#fff;" href="http://localhost:8100/product">Titolo</ion-router-link>
          </ion-col>

           <ion-col>
          <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-icon class="top-left" src="./assets/icons/plus.svg"></ion-icon>
          <ion-icon class="bottom-right" src="./assets/icons/plus.svg"></ion-icon>
          </div>
          Titolo
          </ion-col>

        </ion-row>
      </ion-grid>

     </IonContent>
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
    name: "Search",
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

.img-prodotto{
    border-radius: 20px;
    height: auto;
    width: 100%;
}


.container {
  position: relative;
}

.top-left {
  position: absolute;
  bottom:15px;
  right: 15px;
  font-size: 18px;
}


.bottom-right{
  position: absolute;
  top: 8px;
  left: 16px;
  font-size: 18px;
}

</style>>
