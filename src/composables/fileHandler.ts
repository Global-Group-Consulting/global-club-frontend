import { isPlatform } from '@ionic/vue'
import { PreviewAnyFile } from '@awesome-cordova-plugins/preview-any-file'
import { inject } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export function useFileHandler () {
  const http = inject('http') as HttpPlugin
  
  /**
   * Given a file url, open it in a new tab if in the browser,
   * otherwise open it with the cordova plugin
   *
   * @param fileUrl
   * @param event
   */
  async function openInNewTab (fileUrl: string, event?: any) {
    if (!fileUrl) {
      return
    }
    
    // if is in mobile, work with cordova plugin
    if (isPlatform('cordova')) {
      event.preventDefault()
      
      await http.loading.show()
      
      try {
        await PreviewAnyFile.previewPath(fileUrl).subscribe((value) => {
          http.loading.hide()
        })
      } catch (e) {
        console.error(e)
      } finally {
        await http.loading.hide()
      }
    }
    
    // otherwise don't to anything so that the browser will open the file
  }
  
  return {
    openInNewTab
  }
}
