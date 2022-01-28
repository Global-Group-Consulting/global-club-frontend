<template>
  <IonPage>
    <TopToolbar>News & Eeventi</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <ion-card v-for="news of newsList" :key="news._id" class="mb-5">
          <img :src="news.coverImg"
               style="width: 100%; max-height: 350px; object-fit: cover; object-position: center"/>
          <ion-card-header class="ion-text-start">
            <!--            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>-->
            <ion-card-title>{{ news.title }}</ion-card-title>
          </ion-card-header>

          <ion-card-content v-html="news.content">

          </ion-card-content>
        </ion-card>

      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import {HttpPlugin} from "@/plugins/HttpPlugin";
import {onIonViewWillEnter} from "@ionic/vue";

export default defineComponent({
  name: "News",
  components: {
    TopToolbar,
  },
  setup() {
    const http = inject("http") as HttpPlugin;
    const newsList = ref([]);


    onIonViewWillEnter(async () => {
      newsList.value = await http.api.news.read();
    })

    return {newsList}
  },

});
</script>

<style>

</style>
