import React,{useCallback,useEffect,useRef,useState} from 'react';
import {Text,View,FlatList,StyleSheet,scrollToIndex} from 'react-native';
import '../logics/hebDates'

const _ITEM_HIGHT = 100;
const _EXTRA_MARGIN = 10;
const _days = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל',''].map( i=> ({name:i}))
const _months = ['','תשרי','חשון','כסלו','טבת','שבט','אדר','ניסן','אייר','סיון','תמוז','אב','אלול',''].map( i=> ({name:i}))
const _years = [...Array(120).keys()].map( (_,index)=> ({name:(770+index).gim()}))

const OneSpinner = ({data,width,index}) => {

  const [selectedIndex,setSelectedIndex] = useState(index)
  const listRef = useRef()

  useEffect(() => {
    if(index)
      listRef.current.scrollToIndex({animated:true,index,viewPosition:-1})
  },[])


  const onScroll = useCallback((event) => {
    const index = event.nativeEvent.contentOffset.y / (_ITEM_HIGHT);
    const roundIndex = Math.round(index);
    setSelectedIndex(roundIndex)
  }, []); 

  const getItemLayout = (data, index) => (
      { length: _ITEM_HIGHT, offset: _ITEM_HIGHT * index, index })
    
  const renderItem = useCallback(({item}) => {
        return <Text style={{...styles.flat_item,width}}>{item.name}</Text>
  },[])
    
    return <FlatList
       data={data}
       renderItem={renderItem}
       getItemLayout={getItemLayout}
       keyExtractor={(_,index) => index.toString()}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}      
       snapToAlignment="start"
       decelerationRate={"normal"}
       snapToInterval={_ITEM_HIGHT}       
       onScroll={onScroll}
       ref={listRef}
      //  onViewableItemsChanged={onViewableItemsChangedHandler}
      //  viewabilityConfig={viewabilityConfiguration }
     />
}


export const HebDateSpinner = () => {

/*
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
*/    
   
  const renderSpinners = () => { 
    
    return (
      <>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={120} data={_years} index={12}/>
        </View>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={120} data={_months} index={12}/>
        </View>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={80} data={_days} index={4}/>
        </View>
      </>
    );
   }
 
  return <View style={{...styles.col_container,
    position:'absolute',
    width:320,
    height:3*_ITEM_HIGHT
    }}>
    
    <View style={{...styles.row_container,flex:1}}>{renderSpinners()}</View>

      <View style={{
          position:'absolute',
          // flex:1,
          backgroundColor:'white',
          height:(_ITEM_HIGHT-_EXTRA_MARGIN), 
          width:'100%',
          opacity:.5
          }}>
      </View>    

      <View style={{
          position:'absolute',
          top:(3*_ITEM_HIGHT-_ITEM_HIGHT+_EXTRA_MARGIN),
          // flex:1,
          backgroundColor:'white',
          height:_ITEM_HIGHT-_EXTRA_MARGIN, 
          width:'100%',
          opacity:.4
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
     //flex: 1,
    // flexDirection:'column',
    height:'100%',
    // width:60,
    // flexDirection: 'column-reverse',
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    backgroundColor: 'gray',
    // borderColor:'black',
    // borderWidth:2
    // paddingHorizontal:0,
  },  
  flat_item: {
    height:_ITEM_HIGHT,
    fontSize:40,
    textAlign: 'center',
    paddingTop:20,
    // borderColor:'black',
    // borderWidth:1,
  },
});
