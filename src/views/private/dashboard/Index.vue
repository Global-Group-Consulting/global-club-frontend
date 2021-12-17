<template>
  <IonPage>
    <IonContent class="ion-padding">
      <SearchBar></SearchBar>

      <ion-grid fixed class="ion-no-padding">
        <ion-row>
          <ion-col>
            <div class="bentornato">
              Bentornato,
            </div>
          </ion-col>
          <ion-col>
            <div></div>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
          <ion-col>
            <div class="user">
             {{ firstName }}
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
      <ion-grid fixed class="ion-no-padding">
      <Movement></Movement>
      <br/>
      <LastOrders></LastOrders>
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
      </ion-toolbar>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { storeKey } from "@/store";
import { defineComponent, ref, computed, ComputedRef } from "vue";
import { User } from "@/@types/User";
import Movement from "./Movement.vue";
import LastOrders from "./LastOrders.vue"
import SearchBar from '@/components/SearchBar.vue';

export default defineComponent({
  name: "Dashboard",
  components: { Movement, LastOrders, SearchBar },
  setup() {
    const store = useStore(storeKey);
    const authUser: ComputedRef<User> = computed(
      () => store.getters["auth/user"]
    );
    const firstName = ref<string>(authUser?.value?.firstName);
    return {
      firstName,
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
  font-size: 11px;
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

.stato-banner {
  background-color: rgb(30, 30, 30);
  border-radius: 30px;
  text-align: left;
  font-size: 13px;
  padding: 20px 0px 17px 0px;
  margin-bottom: 20px;
}


.button1 {
  position: absolute;
  bottom: 20px;
}

.progress-lavorazione {
  height: 8px;
  border-radius: 10px;
  margin-top: 6px;
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

.modulo-cerca :hover {
  background-color: #967d4a;
  color: white;
}

.scrolling-wrapper::-webkit-scrollbar {
  display: none;
}


.lavorazione {
  color:#c9a866;
}

</style>
 