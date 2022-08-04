//import { Temporal } from '@js-temporal/polyfill'
import  '../logics/hebDates'

export const hodesh = (seeingDate) => {
  if (!seeingDate)
      return {hodesh:'invalid input',dayOfWeek:'' }

  const hodesh = seeingDate.add({months:1})
  if ( hodesh.day!=seeingDate.day)
    return {hodesh:'אין תאריך חודש',dayOfWeek:'' }
  else
    return {hodesh:hodesh.dmyFormat(),dayOfWeek:hodesh.hebDayOfWeekName() }
}

export const bienonit = (seeingDate) => { 
  if (!seeingDate)
      return {bienonit:'invalid input',dayOfWeek:''}

  return {bienonit:seeingDate.add({days:30-1}).dmyFormat(),dayOfWeek:seeingDate.hebDayOfWeekName() }
}


export const haflaga = (seeingDate,prevSeeingDate) => { 
  if (!seeingDate || !prevSeeingDate)
      return {haflaga:'invalid input',dayOfWeek:''}

  const haflagaDiff = seeingDate.since(prevSeeingDate,{ largestUnit: "days" }).days
  if ( haflagaDiff<=0) {
    return { haflaga:'לא תקין',dayOfWeek:'',haflagaDays:0}  
  }
  const haflaga = (haflagaDiff) ? seeingDate.add({days:haflagaDiff}) : null
  const haflagaDays = haflagaDiff+1
  return { haflaga:haflaga.dmyFormat(),haflagaDays,dayOfWeek:haflaga.hebDayOfWeekName()}
}