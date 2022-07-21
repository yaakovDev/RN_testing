import React,{useState} from 'react';
import {LandingPage} from './src/pages/LandingPage'

import {
  Button,
  StyleSheet,
  Text,
  View,SafeAreaView ,
  ScrollView,SectionList,FlatList, TextInput
} from 'react-native';


const App = () => {

 const [flatData,setFlatData] = useState(Array.from({ length: 100 }).map((_, i) => {name:`item ${i}`} ));
  
 const renderScrollView = () => { 
  return <ScrollView>
    {Array.from({ length: 100 }).map((_, i) => (
    <View key={i} style={styles.welcome}>
      <Text style={styles.welcome} >Item {i}</Text>
    </View>
    )) }
  </ScrollView>
  }

const renderFlatView = () => { 
   return <FlatList
      data={flatData}
      renderItem={_renderItem}
      keyExtractor={(_,index) => index.toString()}
    />
  }


const renderSectionList = () => { 
  return <SectionList
    sections={flatData}
    renderItem={_renderItem}
    keyExtractor={(_,index) => index.toString()}
    />
 }

const _renderItem = ({item,index}) => {  
    return <View style={styles.welcome}>
      <Text style={styles.welcome} >Item {index}</Text>
    </View>
  }



  return (<LandingPage/>)
    
  
    // <View style={styles.container}>
    //   <Button title='Button1'/>
    //   <TextInput style={styles.commonInput} keyboardType='email-address'/>
      
    //     {renderSectionList()}
    //     {renderFlatView()}
    //     {renderScrollView()}
    //    <Button title='Button2'/>
    //  </View>
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: 'cyan',
    margin: 10,
  },
  flatButton: {
    color:'black',
    backgroundColor: 'cyan',
    marginTop: 10,
  },
  commonInput: {
    width:200,
    backgroundColor: 'white',
    borderWidth:1,
    borderRadius:5,
    fontSize:20
  }
});

export default App;
