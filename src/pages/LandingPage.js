import React,{useState,useRef,useEffect} from 'react';
import {newTDate,currentTDate,isValidHebDateStr} from '../logics/hebDates'
import {hodesh,bienonit,haflaga} from '../logics/vestDates'
import { HebDateSpinner} from '../components/HebDateSpinner'
import {Switch,Modal,StyleSheet,Text,View} from 'react-native';
import {storeObj,getObj} from '../logics/localStorage'

const Section = ({caption,text,supText,children}) => { 
  return (
  <View style={{...styles.inputContainer,marginTop:20}}>
  <Text style={styles.textCaption}>{caption}:</Text>      
  {children}
  <Text style={{fontSize:25,marginRight:20,marginTop:5,color:'black'}}>{text}</Text>
  <Text style={{fontSize:20,color:'gray'}}> {supText}</Text>
  </View>)
 }

 const DatePicker = () => { 
    return (<Modal transparent>
        <HebDateSpinner size='medium' addPadding={false}/>
        {/* <View style={{...styles.mainContainer,flexDirection:'row'}}>
          <View style={styles.datePicker}>
            <Text>My Modal</Text>
          </View>
        </View> */}
    </Modal>)
  }

export const LandingPage = () => {
  const [dateModalVisible,setDateModalVisible] = useState(false)
  const [switchVal,toggleSwitch] = useState(false)
  const [seeing,setSeeing] = useState(null)
  const [prevSeeing,setPrevSeeing] = useState()

  useEffect(() => {
    initValues = async () => {
      setSeeing(await getObj('seeingDate'))
    }
    initValues()
  }, [])
  
  const showDateModal = (event) => {  
    // console.dir(event.nativeEvent)
    //setYY(event.nativeEvent.locationX)
    setDateModalVisible(true)
  }

  const onSetSeeing = (seeing) => { 
    setSeeing(seeing)
    storeObj('seeingDate',seeing)
   }

  const getSeeingDate = () => { 
    if (!seeing) 
      return {date:null,dateStr:'loading....'}
      
    const date = newTDate(seeing)
    //const {isValid,date} = isValidHebDateStr(seeing)
    // const dateStr =  (isValid) ? date.dmyFormat() : 'תאריך לא תקין'
    return {date,dateStr:date?.dmyFormat()}
  }

  const getPrevSeeingDate = () => { 
    // const {isValid,date} = isValidHebDateStr(prevSeeing)
    // const dateStr =  (isValid) ? date.dmyFormat() : 'תאריך לא תקין'
    // return {date,dateStr}
    const date = newTDate(prevSeeing)
    //const {isValid,date} = isValidHebDateStr(seeing)
    // const dateStr =  (isValid) ? date.dmyFormat() : 'תאריך לא תקין'
    return {date,dateStr:date?.dmyFormat()}    
  }  

  return ( <>
  {/* <View style={{position: 'absolute', top: 20, left:20, right: 0, bottom: 0}}>
    <Text>Centered text</Text>
  </View> */}

  <View style={styles.mainContainer}>
    {dateModalVisible && <DatePicker/> }

    <Text style={styles.header}>סָפְרָה לָה</Text>
    
    <View style={{...styles.dataContainer}}>
      <View style={{...styles.inputContainer}}>
        <Text style={{fontSize:25,marginLeft:10,borderWidth:0,color:'black'}}>ראיה קודם </Text>
        {/* <Button title='Date' color="cyan" onPress={showDateModal}/> */}
        {/* <TextInput style={styles.hebrewInput} ref={seeingRef}  placeholder='א אדר תשפב' onChangeText={onChangePrevSeeing}/> */}
        <HebDateSpinner size='medium' addPadding={false} dmy={prevSeeing} onSpinnerChange={setPrevSeeing}/>
      </View>
     
      <View style={{...styles.inputContainer}}>
        <Text style={{fontSize:25,marginLeft:10,borderWidth:0,color:'black'}}>ראיה אחרון</Text>
        {/* <TextInput style={styles.hebrewInput}  placeholder='ג אדר-ב תשפב' onChangeText={onChangeSeeing}/> */}
        {seeing && <HebDateSpinner size='medium' addPadding={false} dmy={seeing} year_spinner={{from:5772,to:5782}} onSpinnerChange={onSetSeeing}/>}
      </View>
    </View>

    <Section caption='עונה' text={switchVal ? 'יום':'לילה' }>
    <Switch
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],marginRight:30,marginTop:10}}
        trackColor={{ false: "black", true: "#81b0ff" }}
        thumbColor={switchVal ? "#f5dd4b" : "gray"}
        onValueChange={toggleSwitch}
        value={switchVal}
      />      
    </Section>

      <View style={{flex:4}}>
        {/* <Section caption='ראיה' text={getSeeingDate().dateStr}/> */}
        <Section caption='חודש' text={hodesh(getSeeingDate().date).hodesh} supText={hodesh(getSeeingDate().date).dayOfWeek}/>
        <Section caption='בינונית' text={bienonit(getSeeingDate().date).bienonit} supText={bienonit(getSeeingDate().date).dayOfWeek}/>
        <Section caption='הפלגה' text={haflaga(getSeeingDate().date,getPrevSeeingDate().date).haflaga} supText={haflaga(getSeeingDate().date,getPrevSeeingDate().date).dayOfWeek}/>
        <Section caption='ימי הפלגה' text={haflaga(getSeeingDate().date,getPrevSeeingDate().date).haflagaDays} />
      </View> 

    </View>
    </>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
  },
  inputContainer: {
    flexDirection:'row-reverse',
    marginTop:5,
    backgroundColor: '#F5FCFF',
  },
  dataContainer: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#F5FCFF',
  },
  centerContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header:{
    textAlign:'center',
    backgroundColor: 'cyan',
    color:'black',
    fontSize: 50,
  },
  hebrewInput: {
    width:'60%',
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:5,
    fontSize:20,
    textAlign: 'right'
  },
  textCaption: {
    color:'green',
    fontSize:30,
    fontWeight:'bold'
  },
  datePicker:{
    justifyContent: 'center',
    alignItems: 'center',
    width:200,
    height:50,
    backgroundColor:'gray',
    borderColor:'black',
    borderRadius:5,
    borderWidth:1
  }
})