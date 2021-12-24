<template>
  <IonPage>
    <div class="header-nav">
      <TopToolbar include-back>I miei ordini</TopToolbar>
    </div>
    <IonContent class="ion-padding">
      <ion-grid class="ion-no-padding history-content">
        <ion-row>
          <ion-col>
            <div class="ion-text-start">Ordini in corso</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br />
      <SharedOrder ></SharedOrder>
      <br />
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col>
            <div class="ion-text-start">Ordini conclusi</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br />
      <SharedOrder></SharedOrder>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import SharedOrder from "../../shared/SharedOrder.vue";
import { useStore } from "vuex";
import { storeKey } from "@/store";
import { Order } from "@/@types/Order";
import { OrderApis } from "@/plugins/httpCalls/OrderApis";
import { defineComponent, onMounted,ref,computed,ComputedRef} from "vue";
import { User } from "@/@types/User";
import { OrderStatusEnum } from "@/@enums/order.status.enum";
export default defineComponent({
  name: "History",
  components : { SharedOrder},
  setup() {

    const store = useStore(storeKey);
    const authUser: ComputedRef<User> = computed(
      () => store.getters["auth/user"]
    );
    const orderPending = ref<Order[]>([]);
    const orderCompleted = ref<Order[]>([]);
    const orderCancelled = ref<Order[]>([]);
    const orderInProgress = ref<Order[]>([]);
    const getData = async () => {
       await OrderApis?.readAll(undefined,authUser.value.id).then(resp => {
       orderPending.value=resp?.data.filter(x=> x.status===OrderStatusEnum.PENDING)?? [];
       orderCompleted.value=resp?.data.filter(x=> x.status===OrderStatusEnum.COMPLETED)?? [];
       orderCancelled.value=resp?.data.filter(x=> x.status===OrderStatusEnum.CANCELLED)?? [];
       orderInProgress.value=resp?.data.filter(x=> x.status===OrderStatusEnum.IN_PROGRESS)?? [];

          });
    };
    onMounted(async () => {
      getData();
    });
   
    return {
      orderPending, 
      orderInProgress, 
      orderCompleted, 
      orderCancelled
    };
  },
});
</script>

<style>
.stato-banner {
  background-color: rgb(30, 30, 30);
  border-radius: 15px;
  text-align: left;
  font-size: 13px;
  padding: 10px;
  padding: 20px 0px 17px 0px;
}

.progress {
  height: 8px;
  border-radius: 10px;
  margin-top: 6px;
}

.completato {
  color: #5fe15f;
}
.annullato {
  color: #fd1818;
}

.lavorazione {
  color: #c9a866;
}

.header-nav {
  color: white;
  padding-left: 30px;
  padding-right: 75px;
}

.history-content {
  margin-top: 40px;
}
</style>
