export function formatLocaleDate (date: Date) {
  if (!date) {
    return ""
  }
  
  return new Intl.DateTimeFormat('it', {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(date))
}
