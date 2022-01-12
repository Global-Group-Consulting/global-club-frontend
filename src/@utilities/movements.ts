
export function formatSemesterId (semesterId: string): string {
  let toReturn = "";
  
  if (!semesterId) {
    return toReturn;
  }
  
  const year = +semesterId.split("_")[0]
  const smtr = +semesterId.split("_")[1]
  
  if (isNaN(year) || isNaN(smtr)) {
    return toReturn
  }
  
  const month = smtr === 1 ? 0 : 6;
  const startDate = new Date(year, month)
  const endDate = new Date(year, month + 6);
  
  if (month === 6) {
    endDate.setMonth(0)
    endDate.setFullYear(year + 1)
  }
  
  endDate.setDate(endDate.getDate() - 1)
  
  toReturn = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
  
  return toReturn
}
