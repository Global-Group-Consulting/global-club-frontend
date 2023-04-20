import { onIonViewWillEnter } from '@ionic/vue'
import { onMounted } from 'vue'

export default function useDataFetcher (fetchFn: () => Promise<any>) {
  let mounted = false
  
  onIonViewWillEnter(async () => {
    if (!mounted) return
    
    await fetchFn()
  })
  
  onMounted(async () => {
    await fetchFn()
    
    mounted = true
  })
  
  return {}
}
