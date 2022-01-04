export function formatLocaleDate (date: Date) {
  if (!date) {
    return ""
  }
  
  return new Intl.DateTimeFormat('it', {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date))
}

export function formatLocaleDateLong (date: Date) {
  if (!date) {
    return ""
  }
  
  return new Intl.DateTimeFormat('it', {
    dateStyle: "long",
    // timeStyle: "long",
  }).format(new Date(date))
}
