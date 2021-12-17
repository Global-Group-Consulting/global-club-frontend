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
      <OrdersInProgress></OrdersInProgress>
      <br />
      <ion-grid class="ion-no-padding">
        <ion-row>
          <ion-col>
            <div class="ion-text-start">Ordini conclusi</div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <br />
      <CompletedOrders></CompletedOrders>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
//import { HttpPlugin } from '@/plugins/HttpPlugin';
import { defineComponent } from "vue";
import OrdersInProgress from "./OrdersInProgress.vue";
import CompletedOrders from "./CompletedOrders.vue";
export default defineComponent({
  name: "History",
  components : { OrdersInProgress, CompletedOrders},
  setup() {
    //const http: HttpPlugin = inject('http');
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
