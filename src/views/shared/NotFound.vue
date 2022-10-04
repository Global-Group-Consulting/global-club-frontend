<template>
  <IonPage>
    <TopToolbar>Ooops...</TopToolbar>

    <IonContent>
      <ion-grid>
        <p>Sembra che la pagina che state cercando non esiste.</p>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeKey } from '@/store'
import { useStore } from 'vuex'
import { onIonViewWillEnter } from '@ionic/vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'NotFound',
  setup () {
    const store = useStore(storeKey)
    const userIsAdmin = store.getters['auth/isAdmin']
    const route = useRoute()
    const router = useRouter()


    return {}
  }
})
</script>

<style scoped>

</style>
