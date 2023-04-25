import { onIonViewWillEnter } from '@ionic/vue'
import { onMounted, onUnmounted } from 'vue'

export default function useDataFetcher (fetchFn: () => Promise<any>) {
  let mounted = false
  
  onIonViewWillEnter(async () => {
    console.log('WILL ENTER', mounted)
    if (!mounted) return
    
    await fetchFn()
  })
  
  onMounted(async () => {
    await fetchFn()
    
    mounted = true
    
    console.log('MOUNTED', mounted)
  })
  
  onUnmounted(() => {
    mounted = false
  })
  
  return {}
}
