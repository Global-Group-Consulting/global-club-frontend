export function formatImgUrl (imgId: string) {
  const baseUrl = process.env.VUE_APP_BASE_URL;
  
  if (!imgId) {
    return "/assets/icons/image.svg"
  }
  
  return baseUrl + '/api/files/' + imgId + '/show';
}
