import { formatLocaleDate } from '@/@utilities/dates'

export function useFormatters () {
  function stripTags (text?: string) {
    if (!text)
      return ''
    
    return text.replace(/(<([^>]+)>)/gi, '').trim()
  }
  
  function truncate (text?: string, length = 80) {
    if (!text)
      return ''
    
    const stripped = stripTags(text)
    const truncated = stripped.substring(0, length)
    
    if (stripped.length > length) {
      return truncated + '...'
    }
    
    return truncated
  }
  
  return {
    stripTags,
    truncate,
    formatLocaleDate
  }
}
