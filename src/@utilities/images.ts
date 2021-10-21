import { ProductCategory } from '@/@types/ProductCategory';

export function formatImgUrl (imgId: string) {
  const baseUrl = process.env.VUE_APP_BASE_URL;
  
  if (!imgId) {
    return "/assets/img_placeholder.png"
  }
  
  return baseUrl + '/api/files/' + imgId + '/show';
}
