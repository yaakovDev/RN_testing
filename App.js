import React,{useState,useCallback,useMemo} from 'react';
import {LandingPage} from './src/pages/LandingPage'
import {HebDateSpinner} from './src/components/HebDateSpinner'


import {
  Keyboard,
  Button,Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,SectionList,FlatList, TextInput,
  TouchableWithoutFeedback
} from 'react-native';

const DismissKeyboard = ({children}) => { 
  return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
      {children}
  </TouchableWithoutFeedback>
 }
 

const App = () => {

 const [flatData,setFlatData] = useState(Array.from({ length: 100 }).map((_, i) => ({name:`item ${i}`}) ));
 const [date, setDate] = useState(new Date())

 const onViewableItemsChangedHandler = useCallback(({viewableItems,changed}) => {
  console.log("Visible items are", viewableItems);
  console.log("iteration", changed);
  },[])

  const viewabilityConfiguration  = useMemo(() => (
    {
    waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 100
  }) ,[])





  
 const renderScrollView = () => { 
  return <ScrollView>
    {Array.from({ length: 100 }).map((_, i) => (
    <View key={i} style={styles.welcome}>
      <Text style={styles.welcome} >Item {i}</Text>
    </View>
    )) }
  </ScrollView>
  }

const renderFlatView = (_data) => { 
   return <FlatList
      data={_data}
      renderItem={_renderItem}
      onViewableItemsChanged={onViewableItemsChangedHandler}
      viewabilityConfig={viewabilityConfiguration}
      keyExtractor={(_,index) => index.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}      
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
    return  <Text style={styles.item} >{item.name}</Text>
  }



    // return (<LandingPage/>)

    // <DismissKeyboard>
      // <LandingPage />
    // </DismissKeyboard>
    
  
    // <View style={styles.container}>
    //   <Button title='Button1'/>
    //   <TextInput style={styles.commonInput} keyboardType='email-address'/>
    //     {renderSectionList()}
    //  {renderFlatView()}
    //     {renderScrollView()}
    //    <Button title='Button2'/>
    //  </View>


    return <HebDateSpinner/>
    // return <View style={{flex:1,width:200}}>
    //   <Text>Flat list</Text>
    //   {renderFlatView(flatData)}
    //   </View>
    
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
   },
  flatlist_container: {
    //  flex: 1,
    // flexDirection:'column',
    height:150,
    // width:60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    backgroundColor: 'gray',
    paddingHorizontal:0,
  },  
  item: {
    width:150,
    height:40,
    fontSize:30,
    textAlign: 'center',
    backgroundColor: 'cyan',
    color:'black',
    marginBottom:1
  },
  flatButton: {
    color:'black',
    backgroundColor: 'cyan',
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
