<template>
  <ion-page>
    <IonContent>
      <LogoToolbar/>

      <ion-grid fixed>
        <div class="mb-5">
          <ion-text color="medium"><h6 class="ion-text-left mb-0">
            Bentornat{{ user.gender === 'f' ? "a" : 'o' }},</h6></ion-text>

          <div class="d-flex ion-justify-content-between ion-align-items-center">
            <h4 class="mt-2  mb-0"> {{ $store.getters["auth/fullName"] }} </h4>
          </div>
        </div>

        <OnlineSoon></OnlineSoon>
        <!--      Dashboard ADMIN component

              4 box con brite premium, basic e non iscritti (no fast)

              box con statistiche prodotti

              ordini in corso o in attesa


              FILTRI PRODOTTI -
              !!!!! Aggiungere località (città, provincia e regione)


              !! funzionalità cambio tipo contratto-->

      </ion-grid>

    </IonContent>
  </ion-page>
</template>

<script lang="ts">
import OnlineSoon from "@/components/OnlineSoon.vue";
import LogoToolbar from "@/components/toolbars/LogoToolbar.vue";
import {computed, ComputedRef, defineComponent} from "vue";
import {useStore} from "vuex";
import {storeKey} from "@/store";
import {User} from "@/@types/User";

export default defineComponent({
  name: "DashboardPage",
  components: {OnlineSoon, LogoToolbar},
  setup() {
    const store = useStore(storeKey)
    const user: ComputedRef<User> = computed(() => store.getters["auth/user"]);

    return {
      user
    }
  }
})

</script>

<style scoped>

</style>
