/*
export function generateTableData (data) {
  const toReturn: any[] = []
  
  const totalRows = 24 + ((data.length - 1) * 6)
  const totalCols = data.length + 1
  
  const indexes = {
    0: 0
  }
  
  // prepare indexes
  for (let i = 1; i < totalCols; i++) {
    indexes[i] = i - 1
  }
  
  for (let i = 0; i < totalRows; i++) {
    const row: any[] = []
    
    for (let j = 0; j < totalCols; j++) {
      if (j === 0) {
        if (i % 6 === 0) {
          row.push(generateMainCol(data[indexes[j]]))
          
          indexes[j]++
        } else {
          row.push(null)
        }
      } else {
        const offset = 6 * (j - 1)
        
        if (i >= offset && i < offset + 24) {
          row.push(generateCol(data[indexes[j]]))
        } else {
          row.push(null)
        }
      }
    }
    
    toReturn.push(row)
    
  }
  
  return toReturn
}
*/

// import { DateTime } from 'luxon'

import { formatLocaleDate } from '../../@utilities/dates'

export function generateTableData (data) {
  const toReturn: any = {}
  const semesters: string[] = Object.keys(data).sort((a, b) => {
    return a.localeCompare(b)
  })
  
  const totalRows = 24 + ((semesters.length - 1) * 6)
  const totalCols = semesters.length + 1
  
  // create basic array structure
  semesters.forEach((semester, index) => {
    data[semester].forEach((movement) => {
      if (!movement.withdrawableFrom) {
        return
      }
      
      const key = formatLocaleDate(new Date(movement.withdrawableFrom), true)
      
      if (!toReturn[key]) {
        toReturn[key] = semesters.map(() => null)
      }
      
      toReturn[key][index] = movement
    })
  })
  
  let semIndex = 0
  
  return (Object.values(toReturn) as any[]).map((row, i) => {
    let toPush = null
    
    if (i % 6 === 0) {
      const semesterId = semesters[semIndex]
      
      if (semesterId) {
        toPush = data[semesterId].find((movement) => movement.movementType === 'initial_deposit')
      }
      
      semIndex++
    }
    
    row.unshift(toPush ?? null)
    
    return row
  })
}

function generateMainCol (semester) {
  if (!semester) {
    return null
  }
  
  return semester.initialAmount
}

function generateCol (semester) {
  if (!semester) {
    return null
  }
  
  return semester.earned
}
