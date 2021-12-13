<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <div class="search-container">
        <div v-if="options.length">
          <AutoComplete :options="options" :optionsKey="optionsKey"/>
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
              <p class="user">{{firstName}}</p>
            </div>
          </ion-col>
          <ion-col>
            <div class="brite">
              <img class="brite-img" src="/assets/brite.png" alt="" />
              <p class="brite-h1">76.654</p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
  <Movimentazione></Movimentazione>
        <br>
    <UltimoOrdine></UltimoOrdine>
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
      </ion-toolbar>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { ProductCategoryApis } from '@/plugins/httpCalls/ProductCategoryApis';
  import Popover from "../popover.vue";
  import { defineComponent, inject, onMounted,ref,computed, ComputedRef } from 'vue';
  import AutoComplete from "../../../components/AutoComplete.vue"
  import { ProductCategory } from '@/@types/ProductCategory';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import { User } from '@/@types/User';
  import Movimentazione from './movimentazione.vue'
  import UltimoOrdine from './UltimoOrdine.vue'

  export default defineComponent({
    name: "Dashboard",
    components: { Popover, AutoComplete,Movimentazione,UltimoOrdine},
    setup () {
      const store = useStore(storeKey);
      const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;
      const authUser: ComputedRef<User> = computed(() => store.getters['auth/user']);
      const options = ref<ProductCategory[]>([]);
      const statistic = ref<any>();
      const optionsKey = ref("title");
      const selected = ref({});
      const isOpenRef = ref(false);
      const event = ref();
      const firstName = ref<string>(authUser?.value?.firstName);
      const getData = async ()=> {
        try {
         await  ProductCategoryApis?.readAll().then(resp => {
           options.value=resp as never[]??[];
          });
        } catch (error) {
          alerts.error(error);
        }
      }
      onMounted(async()=> {getData()})
      
      const setOpen = (state: boolean, ev?: Event) => {
        event.value = ev;
        isOpenRef.value = state;
      };
      return {
        options,
        selected,
        optionsKey,
        isOpenRef,
        setOpen,
        event,
        firstName,
        statistic
      };
    },
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

.scrolling-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

.modulo-cerca {
    display: inline-block;
  }

.modulo-cerca :hover{
 background-color:#967d4a;
 color:white;
}

.scrolling-wrapper::-webkit-scrollbar {
    display: none;
}

.icon-align{
    position: absolute;
    top: 25px;
    padding-left: 20px;
}

</style>
 