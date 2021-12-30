<template>
    <ion-grid class="stato-banner" v-for="item in order" :key="item._id" >
        <ion-row>
          <ion-col size="2" class="ion-text-center">
            <img src="/assets/workout-pic.png" />
          </ion-col>
          <ion-col size="8">
            <span> Ordine del {{item.createdAt}}</span><br />
            Stato: <span class="completato">{{item.status}}</span>
            <ion-progress-bar
              class="progress"
              color="primary"
              value="1"
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
import { defineComponent } from "vue";

export default defineComponent({
    name:'SharedOrder',
  //   props: {
  //       order: []
  //     },
  //   setup(props) {
  // const { order } = toRefs(props)
  // return {
  //     order
  //   };
  // },
})
</script>
<style>

</style>
