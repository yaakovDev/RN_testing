import React,{useCallback,useMemo, useRef} from 'react';
import {  Text,  View, FlatList,StyleSheet} from 'react-native';

const _ITEM_HIGHT = 70;
const daysOfMonth = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל',''].map( i=> ({name:i}))
const hebrewMonths = ['','תשרי','חשון','כסלו','טבת','שבט','אדר','ניסן','אייר','סיון','תמוז','אב','אלול',''].map( i=> ({name:i}))

export const HebDateSpinner = () => {

  const monthFListRef= useRef(null)
  const daysFListRef= useRef(null)

  const scrollToIndex = (flatListRef,index) => {
    flatListRef.current.scrollToIndex({animated: true, index: index});
  }

  const onViewableItemsChangedHandler = useCallback(({viewableItems,changed}) => {
    scrollToIndex(monthFListRef,viewableItems[0].index)
  },[])

  const viewabilityConfiguration  = useMemo(() => ({waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
    minimumViewTime: 100}) ,[])
  
  const getItemLayout = (data, index) => (
      { length: _ITEM_HIGHT, offset: _ITEM_HIGHT * index, index })
    

  const renderFlatView = (data) => { 
    return <FlatList
       //ref={flatListRef}
       data={data}
       renderItem={({item,index}) => <Text style={styles.item}>{item.name}</Text>}
      //  onViewableItemsChanged={onViewableItemsChangedHandler}
      //  viewabilityConfig={viewabilityConfiguration }
       getItemLayout={getItemLayout}
       keyExtractor={(_,index) => index.toString()}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}      
       snapToAlignment="start"
       decelerationRate={"normal"}
      snapToInterval={_ITEM_HIGHT+1}       
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
    height:3*_ITEM_HIGHT,
    // borderColor:'black',
    // borderWidth:2
    }}>
    
    <View style={{...styles.row_container,flex:1}}>{renderSpinners()}</View>

      <View style={{
          position:'absolute',
          // flex:1,
          backgroundColor:'white',
          height:(_ITEM_HIGHT-5), 
          width:'100%',
          opacity:.5
          }}>
      </View>    

      <View style={{
          position:'absolute',
          top:(3*_ITEM_HIGHT-_ITEM_HIGHT+5),
          // flex:1,
          backgroundColor:'white',
          height:_ITEM_HIGHT-5, 
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
    height:_ITEM_HIGHT,
    fontSize:40,
    textAlign: 'center',
    // backgroundColor: 'cyan',
    marginBottom:1
  },
});
