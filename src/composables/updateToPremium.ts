import { inject } from 'vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { useRouter } from 'vue-router'

export function useUpdateToPremium () {
  const store = useStore(storeKey)
  const alerts = inject('alerts') as AlertsPlugin
  const http = inject('http') as HttpPlugin
  const router = useRouter()
  
  async function changePack () {
    const answer = await alerts.ask({
      header: 'Passa a premium!',
      message: 'Gentile utente, state per richiedere il passaggio al Pack Premium. Se desiderate continuare, vi preghiamo di cliccare su \'OK\'.'
    })
    
    if (!answer.resp) {
      router.replace('/dashboard')
      return
    }
    
    const result = await http.api.users.updatePack(store.getters['auth/user']._id)
    
    if (result) {
      await store.dispatch('auth/updateUser', {
        clubPackChangeOrder: result.clubPackChangeOrder
      })
    }
  
    router.replace('/dashboard')
  }
  
  return {
    changePack
  }
}
