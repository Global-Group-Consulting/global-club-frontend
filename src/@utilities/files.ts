import {isPlatform} from "@ionic/vue";
import {formatImgUrl} from "@/@utilities/images";
import {PreviewAnyFile} from "@awesome-cordova-plugins/preview-any-file";
import {HttpPlugin} from "@/plugins/HttpPlugin";
import {Attachment} from "@/@types/Attachment";

export async function previewFile(event, file: Attachment, http: HttpPlugin) {
  if (isPlatform("cordova")) {
    event.preventDefault();
    
    await http.loading.show();
    const path = formatImgUrl(file.id, file.server === 'files');
    
    try {
      await PreviewAnyFile.previewPath(path, {
        name: file.fileName,
        mimeType: file.mimetype
      }).subscribe((value) => {
        
        console.log(value);
        http.loading.hide();
      });
    } catch (e) {
      console.error(e);
    } finally {
      await http.loading.hide();
    }
    
  }
}
