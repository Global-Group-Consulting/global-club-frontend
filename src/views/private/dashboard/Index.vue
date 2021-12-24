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
           <BriteValue></BriteValue>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br/>
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
import Movement from "../../shared/Movement.vue";
import LastOrders from "./LastOrders.vue"
import SearchBar from '@/views/shared/SearchBar.vue';
import BriteValue from '@/components/BriteValue.vue';

export default defineComponent({
  name: "Dashboard",
  components: { Movement, LastOrders, SearchBar, BriteValue, },
  setup() {
    const store = useStore(storeKey);
    const authUser: ComputedRef<User> = computed(
      () => store.getters["auth/user"]
    );
    const firstName = ref<string>(authUser?.value?.firstName);
    return {
      firstName
    };
  },
});
</script>


 <style>

.bentornato {
  margin-top:20px;
  text-align: left;
  color: #ada9a4;
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


.stato-banner {
  background-color: rgb(30, 30, 30);
  border-radius: 30px;
  text-align: left;
  font-size: 13px;
  padding: 20px 0px 17px 0px;
  margin-bottom: 20px;
}


.progress-lavorazione {
  height: 8px;
  border-radius: 10px;
  margin-top: 6px;
}


.lavorazione {
  color:#c9a866;
}

</style>