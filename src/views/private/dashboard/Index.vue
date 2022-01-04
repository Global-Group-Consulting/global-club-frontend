<template>
  <IonPage>
    <IonContent>
      <LogoToolbar/>

      <ion-grid fixed>

        <div class="mb-5">
          <ion-text color="medium"><h6 class="ion-text-left mb-0">Bentornato,</h6></ion-text>

          <div class="d-flex ion-justify-content-between">
            <div class="ion-text-left">
              <h4 class="mt-2  mb-0"> {{ $store.getters["auth/fullName"] }} </h4>
            </div>
            <div class="ion-text-right">
              <BriteValue class="mt-2 mb-0" component="h4" value="76654"></BriteValue>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <SearchBar></SearchBar>
        </div>

        <div class="mb-5">
          <UserStatistics></UserStatistics>
        </div>

        <PrivateOrdersList :statuses="pendingStatuses"
                           title="Stato ordini in corso"
                           no-data-text="Ancora nessun ordine"
        ></PrivateOrdersList>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, ComputedRef } from "vue";
  import { useStore } from "vuex";
  import { storeKey } from "@/store";
  import { User } from "@/@types/User";
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import Movement from "../../shared/Movement.vue";
  import SearchBar from '@/views/shared/SearchBar.vue';
  import BriteValue from '@/components/BriteValue.vue';
  import PrivateOrdersList from '@/components/lists/orders/PrivateOrdersList.vue';
  import LogoToolbar from '@/components/toolbars/LogoToolbar.vue';
  import UserStatistics from '@/components/UserStatistics.vue';

  export default defineComponent({
    name: "Dashboard",
    components: { UserStatistics, LogoToolbar, PrivateOrdersList, SearchBar, BriteValue, },
    setup () {
      const store = useStore(storeKey);
      const authUser: ComputedRef<User> = computed(
          () => store.getters["auth/user"]
      );
      const firstName = ref<string>(authUser?.value?.firstName);
      const pendingStatuses = [OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS];

      return {
        firstName,
        pendingStatuses
      };
    },
  });
</script>


<style>

</style>
