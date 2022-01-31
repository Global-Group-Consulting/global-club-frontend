<template>
  <IonPage>
    <IonContent>
      <LogoToolbar/>

      <ion-grid fixed>

        <div class="mb-5">
          <ion-text color="medium"><h6 class="ion-text-left mb-0">
            Bentornat{{ authUser.gender === 'f' ? "a" : 'o' }},</h6></ion-text>

          <div class="d-flex ion-justify-content-between ion-align-items-center">
            <div class="ion-text-left">
              <h4 class="mt-2  mb-0"> {{ $store.getters["auth/fullName"] }} </h4>
            </div>
            <div class="ion-text-right">
              <h4 class="mt-2 mb-0" style="color: var(--ion-color-primary)" v-if="userIsPremium">
                Cliente Premium
              </h4>
              <ClubButton v-else class="m-0">Passa a premium</ClubButton>
            </div>
          </div>
        </div>

        <div class="mb-5">
          <SearchBar @update:filters="onSearchUpdate"></SearchBar>
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
  import { computed, ComputedRef, defineComponent, ref } from "vue";
  import { useStore } from "vuex";
  import { storeKey } from "@/store";
  import { User } from "@/@types/User";
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import SearchBar from '@/views/shared/SearchBar.vue';
  import PrivateOrdersList from '@/components/lists/orders/PrivateOrdersList.vue';
  import LogoToolbar from '@/components/toolbars/LogoToolbar.vue';
  import UserStatistics from '@/components/UserStatistics.vue';
  import { useRouter } from 'vue-router';
  import Filters from '@/composables/filters';
  import { PackEnum } from '@/@enums/pack.enum';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    name: "Dashboard",
    components: { ClubButton, UserStatistics, LogoToolbar, PrivateOrdersList, SearchBar },
    setup () {
      const store = useStore(storeKey);
      const router = useRouter();
      const authUser: ComputedRef<User> = computed(
          () => store.getters["auth/user"]
      );
      const firstName = ref<string>(authUser?.value?.firstName);
      const pendingStatuses = [OrderStatusEnum.PENDING, OrderStatusEnum.IN_PROGRESS];
      const filtersComposable = Filters()

      const userIsPremium = computed(() => {
        return authUser.value.clubPack === PackEnum.PREMIUM;
      })

      function onSearchUpdate (filters) {
        router.push({ name: "private.products", query: filtersComposable.prepareFilters(filters) })
      }

      return {
        authUser,
        firstName,
        pendingStatuses, userIsPremium,
        onSearchUpdate
      };
    },
  });
</script>


<style>

</style>
