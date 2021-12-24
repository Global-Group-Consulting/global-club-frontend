<template >
  <ion-grid class="stato-banner" v-for="item in orders" :key="item._id">
    <ion-row> 
      <ion-col size="2" class="ion-text-center">
        <img src="/assets/workout-pic.png" />
      </ion-col>
      <ion-col size="8">
        <span>Ordine del {{item.createdAt}}</span><br />
        Stato: <span class="lavorazione">{{item.status}}</span>
        <ion-progress-bar
          class="progress"
          color="primary"
          value="0.8"
        ></ion-progress-bar>
      </ion-col>
      <ion-col size="2" class="ion-text-center">
        <ion-icon
          style="zoom: 2; padding-top: 9px"
          src="./assets/icons/circle-right.svg"
        ></ion-icon>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { storeKey } from "@/store";
import { Order } from "@/@types/Order";
import { OrderApis } from "@/plugins/httpCalls/OrderApis";
import { defineComponent, onMounted,ref,computed,ComputedRef} from "vue";
import { User } from "@/@types/User";
import { OrderStatusEnum } from "@/@enums/order.status.enum";
export default defineComponent({
  name: "OrdersInProgress",
  components: {},
  setup() {

    const store = useStore(storeKey);
    const authUser: ComputedRef<User> = computed(
      () => store.getters["auth/user"]
    );
    const orders = ref<Order[]>([]);
    const getData = async () => {
       await OrderApis?.readAll(OrderStatusEnum.PENDING,authUser.value.id).then(resp => {
       orders.value = resp?.data ?? [];
          });
    };
    onMounted(async () => {
      getData();
    });
   
    return {
      orders 
    };
  },
});
</script>
<style>
</style>