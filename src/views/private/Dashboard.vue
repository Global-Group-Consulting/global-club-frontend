<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>
      <div class="search-container">
        <ion-searchbar
          placeholder="Cosa desideri cercare?"
          animated="true"
          autocomplete="on"
          inputmode="search"
        >
        </ion-searchbar>
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
          @didDismiss="setOpen(false)"
        >
          <Popover></Popover>
        </ion-popover>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Popover from "./popover.vue";
/* import TopToolbar from "@/components/toolbars/TopToolbar.vue"; */

export default defineComponent({
  name: "Dashboard",
  components: { Popover },
  setup() {
    const isOpenRef = ref(false);
    const event = ref();
    const setOpen = (state: boolean, ev?: Event) => {
      event.value = ev;
      isOpenRef.value = state;
    };
    return { isOpenRef, setOpen, event };
  },
});

/* export default defineComponent({
  name: "Dashboard",
  /*  components: { TopToolbar }, */
/* }); */
</script>

<style>
.searchbar-input {
  max-width: 30rem;
  --background: white;
  --border-radius: 15px;
}

.searchbar-input.sc-ion-searchbar-md {
  color: #ada9a4;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 15px;
  max-width: 31rem;
}
</style>
