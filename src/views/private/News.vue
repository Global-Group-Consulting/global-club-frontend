<template>
  <IonPage>
    <TopToolbar>News & Eventi</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <no-data v-if="newsList.length === 0"></no-data>
        <template v-else>
          <ion-card v-for="news of newsList" :key="news._id" class="mb-5">
            <a :href="news.coverImg" @click="previewFile(news.coverImg, $event)"
               target="_blank">
              <img :src="news.coverImg"
                   style="width: 100%; object-fit: contain; object-position: center"
              />
            </a>

            <ion-card-header class="ion-text-start">
              <!--            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>-->
              <ion-card-title>{{ news.title }}</ion-card-title>
            </ion-card-header>

            <ion-card-content v-html="news.content">

            </ion-card-content>
          </ion-card>
        </template>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {defineComponent, inject, ref} from "vue";
import TopToolbar from '@/components/toolbars/TopToolbar.vue';
import {HttpPlugin} from "@/plugins/HttpPlugin";
import {isPlatform, onIonViewWillEnter} from "@ionic/vue";
import NoData from "@/components/NoData.vue";
import {Attachment} from "@/@types/Attachment";
import {formatImgUrl} from "@/@utilities/images";
import {PreviewAnyFile} from "@awesome-cordova-plugins/preview-any-file";

export default defineComponent({
  name: "News",
  components: {
    NoData,
    TopToolbar,
  },
  setup() {
    const http = inject("http") as HttpPlugin;
    const newsList = ref([]);

    async function previewFile(file: string, event) {
      if (isPlatform("cordova")) {
        event.preventDefault();

        await http.loading.show();

        try {
          await PreviewAnyFile.previewPath(file).subscribe((value) => {
            http.loading.hide();
          });
        } catch (e) {
          console.error(e);
        } finally {
          await http.loading.hide();
        }
      }
    }

    onIonViewWillEnter(async () => {
      newsList.value = await http.api.news.read();
    })

    return {
      newsList,
      previewFile
    }
  },

});
</script>

<style>

</style>
