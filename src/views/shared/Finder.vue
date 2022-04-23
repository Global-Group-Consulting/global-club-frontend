<template>
  <IonPage>
    <TopToolbar>Redirect in corso...</TopToolbar>

    <IonContent>
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
  name: 'Finder',
  setup () {
    const store = useStore(storeKey)
    const userIsAdmin = store.getters['auth/isAdmin']
    const route = useRoute()
    const router = useRouter()

    onIonViewWillEnter(() => {
      const query = route.query

      if (query.order) {
        router.replace({
          name: `${userIsAdmin ? 'admin' : 'private'}.orders.details`,
          params: { 'id': query.order as string },
          query: route.query
        })
      } else if (query.product) {
        router.replace({
          name: `${userIsAdmin ? 'admin' : 'private'}.products.details`,
          params: { 'id': query.product as string },
          query: route.query
        })
      } else {
        router.replace({ name: 'public.notFound' })
      }
    })

    return {}
  }
})
</script>

<style scoped>

</style>
