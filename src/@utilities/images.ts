import {settings} from "@/config/httpPlugin";

export function formatImgUrl(imgId: string, fromFilesServer = false) {
  const baseUrl = settings.links?.baseUrl;
  const filesUrl = settings.links?.filesUrl;
  
  if (!imgId) {
    return "/assets/icons/image.svg"
  }
  
  if (fromFilesServer) {
    return filesUrl + '/api/' + imgId + '/show';
  }
  
  return baseUrl + '/api/files/' + imgId + '/show';
}

export function resolveDownloadUrl (imgId: string) {
  const baseUrl = process.env.VUE_APP_BASE_URL;
  
  if (!imgId) {
    return "/assets/icons/image.svg"
  }
  
  return baseUrl + '/api/files/' + imgId + '/download';
}
