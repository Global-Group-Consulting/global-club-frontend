export function formatCurrency (value: number) {
  if (value === undefined) {
    return null
  }
  
  return new Intl.NumberFormat("it-IT", {
    style: 'currency',
    currency: "EUR"
  }).format(value)
}

export function formatBrites (value: number, currPosition: "start" | "end" = "start") {
  if (value === undefined) {
    return null
  }
  const formattedValue = new Intl.NumberFormat("it-IT", {
    maximumFractionDigits: 0
  }).format(value)
  const icon = "<i class='gc-icon-brite-logo'></i>";
  const toReturn: string[] = [formattedValue]
  
  if (currPosition === "end") {
    toReturn.push(icon)
  } else {
    toReturn.unshift(icon)
  }
  
  return "<span class='ion-text-nowrap'>" + toReturn.join(" ") + "</span>"
}
