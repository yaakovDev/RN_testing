import { Temporal } from '@js-temporal/polyfill'

export const hodesh = (seeingDate) => {
  if (!seeingDate)
      return 'invalid input'

  const hodesh = seeingDate.add({months:1})
  if ( hodesh.day!=seeingDate.day)
    return 'אין תאריך חודש'
  else
    return hodesh.dmyFormat()
}

export const bienonit = (seeingDate) => { 
  if (!seeingDate)
      return 'invalid input'

  return seeingDate.add({days:30-1}).dmyFormat()//-1 to add the 'seeing' day
}


export const haflaga = (seeingDate,prevSeeingDate) => { 
  if (!seeingDate || !prevSeeingDate)
    return 'invalid input'

  const haflagaDiff = seeingDate.since(prevSeeingDate,{ largestUnit: "days" }).days
  if ( haflagaDiff<=0) {
    return { haflaga:'לא תקין',haflagaDays:0}  
  }
  const haflaga = (haflagaDiff) ? seeingDate.add({days:haflagaDiff}) : null
  const haflagaDays = haflagaDiff+1
  return { haflaga:haflaga.dmyFormat(),haflagaDays}
}