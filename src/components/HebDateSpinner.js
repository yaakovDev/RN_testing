import React,{useCallback,useMemo} from 'react';
import {  Text,  View, FlatList,StyleSheet} from 'react-native';


const daysOfMonth = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל',''].map( i=> ({name:i}))
const hebrewMonths = ['','תשרי','חשון','כסלו','טבת','שבט','אדר','ניסן','אייר','סיון','תמוז','אב','אלול',''].map( i=> ({name:i}))

export const HebDateSpinner = () => {

  const onViewableItemsChangedHandler = useCallback(({viewableItems,changed}) => {
    console.log("Visible items are", viewableItems);
    console.log("iteration", changed);
  },[])

  const viewabilityConfiguration  = useMemo(() => ({waitForInteraction: false,
    viewAreaCoveragePercentThreshold: 50,
    minimumViewTime: 100}) ,[])
  

  const renderFlatView = (data) => { 
    return <FlatList
       data={data}
       renderItem={({item,index}) => <Text style={styles.item}>{item.name}</Text>}
       onViewableItemsChanged={onViewableItemsChangedHandler}
       viewabilityConfig={viewabilityConfiguration }
       keyExtractor={(_,index) => index.toString()}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}      
     />
   }
   
  const renderSpinners = () => { 
    
    return (
      <>
        <View style={{...styles.flatlist_container, width: 120}}>
          {renderFlatView(hebrewMonths)}
        </View>
        <View style={styles.flatlist_container}>
          {renderFlatView(daysOfMonth)}
        </View>
      </>
    );
   }
 
  return <View style={{...styles.col_container,
    position:'absolute',
    width:250,
    height:150,
    // borderColor:'black',
    // borderWidth:2
    }}>
    
    <View style={{...styles.row_container,flex:1}}>{renderSpinners()}</View>

      <View style={{
          position:'absolute',
          // flex:1,
          backgroundColor:'white',
          height:45, 
          width:'100%',
          opacity:.5
          }}>
      </View>    

      <View style={{
          position:'absolute',
          top:105,
          // flex:1,
          backgroundColor:'white',
          height:45, 
          width:'100%',
          opacity:.5
          }}>
      </View>


    </View>

}

const styles = StyleSheet.create({
  col_container: {
    flex: 1,
    flexDirection: 'column',
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   },
  flatlist_container: {
     flex: 1,
    // flexDirection:'column',
    height:'100%',
    // width:60,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    backgroundColor: 'gray',
    // paddingHorizontal:0,
  },  
  item: {
    width:90,
    height:50,
    fontSize:30,
    textAlign: 'center',
    // backgroundColor: 'cyan',
    marginBottom:1
  },
});
