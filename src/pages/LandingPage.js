import React,{useState,useRef,useEffect, useLayoutEffect} from 'react';

import {
  Button,
  StyleSheet,
  Text,
  View,SafeAreaView ,
  ScrollView,SectionList,FlatList, TextInput
} from 'react-native';


export const LandingPage = () => {
  const [name, onChangeName] = useState("john doe");
  const textRef = useRef()

  
  useEffect(() => {
    // textRef.current.setNativeProps({
    //   text:'moshe1'
    // });    
    console.log(name);
  }, [name])
  
  

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.header}>כותרת</Text>
      
      <View style={{...styles.revHorizontalContainer,marginTop:5}}>
        <Text style={{fontSize:30,marginLeft:20,borderWidth:0,color:'black'}}>שם</Text>
        <TextInput style={styles.hebrewInput} ref={textRef}  placeholder='שם' onChangeText={onChangeName}/>
      </View>
      
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize:50,
  },
  revHorizontalContainer: {
    flexDirection:'row-reverse',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header:{
    textAlign:'center',
    backgroundColor: 'cyan',
    color:'black',
    fontSize: 50,
  },
  hebrewInput: {
    width:300,
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:5,
    fontSize:20,
    textAlign: 'right'
  }
})