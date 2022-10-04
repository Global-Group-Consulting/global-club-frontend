export function formatLocaleDate (date: Date, noTime = false) {
  if (!date) {
    return ''
  }
  
  return new Intl.DateTimeFormat('it', {
    dateStyle: 'short',
    timeStyle: noTime ? undefined : 'short'
  }).format(new Date(date))
}

export function formatLocaleDateLong (date: Date | string, options?: Intl.DateTimeFormatOptions) {
  if (!date) {
    return ''
  }
  
  return new Intl.DateTimeFormat('it', options ?? {
    dateStyle: 'long'
    // timeStyle: "long",
  }).format(new Date(date))
}
