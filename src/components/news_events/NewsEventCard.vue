<template>
  <ion-card class="mb-5 h-100 d-flex flex-column">
    <span class="card-image-bg" :style="`background-image: url('${entry.coverImg}')`"></span>

    <a :href="entry.coverImg" class="card-image-link"
       v-if="entry.coverImg"
       @click="previewFile(entry.coverImg, $event)"
       target="_blank">

      <img :src="entry.coverImg"
           :alt="'locandina evento ' + entry.title"
           style="width: 100%; object-fit: contain; object-position: center"
           class="card-image"
      />

    </a>

    <div class="card-footer">
      <ion-card-header class="ion-text-start">
        <!--            <ion-card-subtitle>Card Subtitle</ion-card-subtitle>-->
        <ion-card-title>{{ entry.title }}</ion-card-title>
      </ion-card-header>

      <ion-card-content v-html="entry.content">

      </ion-card-content>
    </div>
  </ion-card>
</template>

<script lang="ts">

import { defineComponent, inject, PropType } from 'vue'
import { isPlatform } from '@ionic/vue'
import { PreviewAnyFile } from '@awesome-cordova-plugins/preview-any-file'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export interface NewsEvent {
  _id: string;
  title: string;
  content: string;
  coverImg?: string;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: 'NewsEventCard',
  props: {
    entry: {
      type: Object as PropType<NewsEvent>,
      required: true
    }
  },
  setup (props) {
    const http = inject('http') as HttpPlugin

    async function previewFile (file?: string, event?) {
      if (!file) {
        return
      }

      if (isPlatform('cordova')) {
        event.preventDefault()

        await http.loading.show()

        try {
          await PreviewAnyFile.previewPath(file).subscribe((value) => {
            http.loading.hide()
          })
        } catch (e) {
          console.error(e)
        } finally {
          await http.loading.hide()
        }
      }
    }

    return { previewFile }
  }
})
</script>

<style lang="scss" scoped>
.card-image-link {
  display:         inline-flex;
  flex-grow:       1;
  flex-basis:      0;
  justify-content: center;
  position:        relative;

  .card-image {
    position: relative;
    display:  block;
  }
}

.card-image-bg {
  width:               100%;
  height:              100%;
  position:            absolute;
  top:                 50%;
  left:                50%;
  background-position: center;
  background-repeat:   no-repeat;
  background-size:     cover;
  transform:           scale(1.1) translate(-50%, -50%);
  filter:              blur(10px);
  opacity: .3;
}

.card-footer {
  //background-: rgba(0, 0, 0, 0.9);
  //position:    relative;
}

</style>
