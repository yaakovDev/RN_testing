import { Temporal } from '@js-temporal/polyfill'


//Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate
//Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate
//Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate Temporal.PlainDate

// export const dayMonth = ({day,month,year}) => { 
//   let date = Temporal.PlainDate.from({year,month,day,calendar: 'hebrew'}); 
//   return `${date.day.gim()}-${date.hebDayOfWeekName()}(${date.hebDayOfWeekNum()})`
// }


Temporal.PlainDate.prototype.monthYearFormat = function() {
  return `${this.hebMonthName()} ${this.year.dateGim()}`
}

Temporal.PlainDate.prototype.dayMonthFormat = function() {
  return `${this.day.dateGim()} ${this.hebMonthName()}`
}

Temporal.PlainDate.prototype.plainDmyFormat = function() {
  let ret = `${this.day.dateGim()} ${this.hebMonthName()} ${(this.year-5000).dateGim()}`
  return ret.replace(/['"]/g, '')
}

Temporal.PlainDate.prototype.dmyFormat = function() {
  return `${this.day.dateGim()} ${this.hebMonthName()} ${(this.year).dateGim()}`
}


const hebDaysOfWeek = ['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת','ראשון']
Temporal.PlainDate.prototype.hebDayOfWeekName = function () {
  return hebDaysOfWeek[this.dayOfWeek]//[1]=monday,[7]=sunday
}

Temporal.PlainDate.prototype.hebDayOfWeekNum = function () {
  //original value:1=monday,...,7=sunday
  if ( this.dayOfWeek==7) 
    return 1 //sunday
  else
    return this.dayOfWeek+1//monday-saturday
}

const hebMonthsNames = [[''],['תשרי'],['חשון','חשוון'],['כסלו'],['טבת'],['שבט'],['אדר','אדר-א','אדר-ב'],['ניסן'], ['אייר','איר'],['סיון'],['תמוז'],['אב'],['אלול']]
Temporal.PlainDate.prototype.hebMonthName = function () {
  let month = this.month
  if(!this.inLeapYear)
    return hebMonthsNames[month][0]
    

  let suffix = ''
  if ( month == 6) 
   suffix = '-א'
  else if ( month == 7) 
    suffix = '-ב'
  if (month>=7) month--

  return hebMonthsNames[month][0] + suffix
}

//check if valid temporal date
Temporal.PlainDate.prototype.isValidDate = function() {
  return this.year>=5000 && this.year<=5999 && this.month>=1 && this.month<=13 && this.day>=1 && this.day<=31
}


//Number Number Number Number Number Number Number Number Number Number Number 
//Number Number Number Number Number Number Number Number Number Number Number 
//Number Number Number Number Number Number Number Number Number Number Number 

const alphaBiet = [ 
  {letter:'ץ',code:900},{letter:'ף',code:800},{letter:'ן',code:700},{letter:'ם',code:600},{letter:'ך',code:500},
  {letter:'ת',code:400}, {letter:'ש',code:300} , {letter:'ר',code:200}, {letter:'ק',code:100}, {letter:'צ',code:90}, {letter:'פ',code:80}, {letter:'ע',code:70}, {letter:'ס',code:60}, {letter:'נ',code:50}, {letter:'מ',code:40}, {letter:'ל',code:30}, {letter:'כ',code:20}, {letter:'י',code:10}, {letter:'ט',code:9}, {letter:'ח',code:8}, {letter:'ז',code:7}, {letter:'ו',code:6}, {letter:'ה',code:5}, {letter:'ד',code:4}, {letter:'ג',code:3}, {letter:'ב',code:2}, {letter:'א',code:1} ];

Number.prototype.gim = function (manTsaPach=false) {
  let gim = ''
  let num = this.valueOf()
  alphaBiet.slice(manTsaPach ? 0 : 5).forEach(l => {
    while ( num >= l.code) {
        gim+=l.letter
        num-=l.code
        }
    })
  return gim
}

Number.prototype.hebDayOfWeek = function () {
  return hebDaysOfWeek[this.valueOf()-1]
}

const onaDaysOfWeek = [
'שבת לילה','ראשון בוקר',
'ראשון לילה','שני בוקר',
'שני לילה','שלישי בוקר',
'שלישי לילה','רביעי בוקר',
'רביעי לילה','חמישי בוקר',
'חמישי לילה','שישי בוקר',
'שישי לילה','שבת בוקר',
'שבת לילה','ראשון בוקר']
Number.prototype.hebOnnaOfWeekName = function () {
  return onaDaysOfWeek[this.valueOf()]
}


Number.prototype.dateGim = function () {
  let thousands=0
  let num = this.valueOf()
  if ( num>=1000) {
    thousands = parseInt(num/1000)
    num=num%1000
    }

  let numGim = num.gim();
  if ( num > 31) {
    const lastChar = numGim.slice(-1)
    numGim = numGim.slice(0, -1); //remove last char
    numGim = `${numGim}"${lastChar}`
    }
  numGim = numGim.replace(/יה/i, "טו").replace(/יו/i, "טז")

  if(thousands>0)
    return `${thousands.gim()}'${numGim}`
  else
    return `${numGim}'`
}

//String String String String String String String String String String 
//String String String String String String String String String String 
//String String String String String String String String String String 

String.prototype.toNum = function() {
  let gim = 0
  let str = this.valueOf()
  try {
  str.replace(/[^א-ת]/gi,'').split('').forEach(c => gim+=alphaBiet.find(l => l.letter == c).code)
  }
  catch(e) {
    console.log(`str-->${str}`);
    console.log(e)
  }
  return gim
}

String.prototype.monthNum = function(isLeapYear = false) {
  let str = this.valueOf()
  let _index=-1;
  hebMonthsNames.forEach((el,index) => {
    if (_index==-1 ) {
       const subIndex = el.findIndex( item => (item==str) )
       if ( subIndex==0 || subIndex==1) {
          _index=index
          if (isLeapYear && _index>6) _index++
          }
      else if ( subIndex==2) {//adar-b
          _index=index 
          if (isLeapYear && _index==6) _index++
          }
      }
    })

  
  
  return (_index<0) ? -1 : _index
}


//General General General General General General General General General 
//General General General General General General General General General 
//General General General General General General General General General 

  //check if object is of Temporal.PlainDate type
export const isDate = (obj) => {
  return obj instanceof Temporal.PlainDate
}


export const newTDate = ({d,m,y} = {d:null,m:null,y:null}) => { 
  if(isValidHebDate({d,m,y})) 
    return Temporal.PlainDate.from({day:d,month:m,year:y,calendar:'hebrew'})
  else
    return null
//new Temporal.Now.plainDate({calendar:'hebrew'}))    
}

export const randomDate = (from, to) => {
  let start = newTDate(from)
  let end = newTDate(to)
  if (start && end) {
    const diff = end.since(start,{ largestUnit: "days" })
    const rand = Math.floor(Math.random() * (diff.days + 1))
    return start.add({days:rand})
  }
  else
    return null
}

export const currentTDate = () => {
  return new Temporal.Now.plainDate({calendar:'hebrew'})
}

export const currentDate_dmy = () => {
  const t = new Temporal.Now.plainDate({calendar:'hebrew'})
  return {d:t.day,m:t.month,y:t.year}
}

// validate date range
export const isValidHebDate = ({d,m,y}) => {
  if ( !d || !m || !y ) 
    return false
  return (y>=5000 && y<=5999 && m>=1 && m<=13 && d>=1 && d<=30)
}

export const isValidHebDateStr = (dateStr) => {
    const res = _isValidHebDateStr(dateStr)
    // if ( !res.isValid) {
    //   console.dir(res)
    //   debugger
    //   }
    return res
  }

const _isValidHebDateStr = (dateStr) => {
  let [day,month,year,rest] = dateStr.replace(/\s+/g, ' ').trim(' ').split(' ')
  
  //validation1
  if (!day || !month || !year || rest )
    return {isValid:false,date:null}

  //validation2
  if (day.length!=1 && day.length!=2 ||
      month.monthNum()==-1 || 
      year.length<3 || year.length>4 || year.toNum()<700 || year.toNum()>850
      ) 
    return {isValid:false,date:null}

  //validation3
  const hebLetters = RegExp("^[א-ת\-]+$")
  if ( !hebLetters.test(day) || !hebLetters.test(month) || !hebLetters.test(year) )
    return {isValid:false,date:null}

  //validation4
  const yy = year.toNum()+5000
  const isLeapYear = newTDate({d:1,m:1,y:yy}).inLeapYear
  const {d,m,y} = {d:day.toNum(),m:month.monthNum(isLeapYear),y:yy}
  if ( !isValidHebDate({d,m,y}) )
    return {isValid:false,date:null}

  //validation5
  const newDate = newTDate({d,m,y})
  const extraValid = (d==newDate.day && m==newDate.month && y==newDate.year)
  if ( !newDate || !extraValid) 
    return {isValid:false,date:null}

  return {isValid:true,date:newDate}
}

export default { gim: Number.prototype.gim }



