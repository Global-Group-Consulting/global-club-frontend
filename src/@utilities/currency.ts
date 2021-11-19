export function formatCurrency (value: number) {
  if (value === undefined) {
    return null
  }
  
  return new Intl.NumberFormat("it-IT", {
    style: 'currency',
    currency: "EUR"
  }).format(value)
}
