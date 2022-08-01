import React,{useCallback,useEffect,useRef,useState} from 'react';
import {Text,View,FlatList,StyleSheet,scrollToIndex} from 'react-native';
import '../logics/hebDates'

const _days = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י','יא','יב','יג','יד','טו','טז','יז','יח','יט','כ','כא','כב','כג','כד','כה','כו','כז','כח','כט','ל',''].map( i=> ({name:i}))
const _months = ['','תשרי','חשון','כסלו','טבת','שבט','אדר','ניסן','אייר','סיון','תמוז','אב','אלול',''].map( i=> ({name:i}))
const _years = [...Array(120).keys()].map( (_,index)=> ({name:(770+index).gim()}))

const OneSpinner = ({data,width,index,_height,flat_item}) => {

  const [selectedIndex,setSelectedIndex] = useState(index)
  const listRef = useRef()

  useEffect(() => {
    if(index)
      listRef.current.scrollToIndex({animated:true,index,viewPosition:-1})
  },[])


  const onScroll = useCallback((event) => {
    const index = event.nativeEvent.contentOffset.y / _height;
    const roundIndex = Math.round(index);
    setSelectedIndex(roundIndex)
  }, []); 

  const getItemLayout = (data, index) => (
      { length: _height, offset: _height* index, index })
    
  const renderItem = useCallback(({item}) => {
        return <Text style={{...flat_item,height:_height,width}}>{item.name}</Text>
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
       snapToInterval={_height}       
       onScroll={onScroll}
       ref={listRef}
      //  onViewableItemsChanged={onViewableItemsChangedHandler}
      //  viewabilityConfig={viewabilityConfiguration }
     />
}


export const HebDateSpinner = ({size}) => {

  //let item_style
  let flat_item
  let w1,w2
  switch(size){
    case 'small':{w1=80;w2=40;flat_item=styles.small_flat_item};break;
    case 'medium':{w1=100;w2=60;flat_item=styles.medium_flat_item};break;
    case 'large':{w1=120;w2=80;flat_item=styles.large_flat_item};break;
    default: {w1=100;w2=60;flat_item=styles.medium_flat_item};break;
  }

  const renderSpinners = () => { 
    return (
      <>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={w1} data={_years} index={1} _height={flat_item._height} flat_item={flat_item}/>
        </View>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={w1} data={_months} index={1} _height={flat_item._height} flat_item={flat_item}/>
        </View>
        <View style={{...styles.flatlist_container}}>
          <OneSpinner width={w2} data={_days} index={1} _height={flat_item._height} flat_item={flat_item}/>
        </View>
      </>
    );
   }
 
  return <View style={{...styles.col_container,position:'relative',width:(w1+w1+w2),height:3*flat_item._height}}>
      <View style={{...styles.row_container,flex:1}}>
          {renderSpinners()}
      </View>
      <View style={{position:'absolute',backgroundColor:'white',height:(flat_item._height-flat_item._extraMargin),width:'100%',opacity:.4}}/>
      <View style={{position:'absolute',top:(3*flat_item._height-flat_item._height+flat_item._extraMargin),backgroundColor:'white',height:flat_item._height-flat_item._extraMargin,width:'100%',opacity:.4}}/>
    </View>
}

const styles = StyleSheet.create({
  col_container: {
    // flex: 1,
    flexDirection: 'column',
  },
  row_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
   },
  flatlist_container: {
    height:'100%',
    backgroundColor: 'gray',
  },  
  large_flat_item: {
    fontSize:40,
    textAlign: 'center',
    paddingTop:10,
    _height:100,
    _extraMargin:10
  },
  medium_flat_item: {
    fontSize:30,
    textAlign: 'center',
    paddingTop:10,
    _height:60,
    _extraMargin:5,
  },  
  small_flat_item: {
    fontSize:20,
    textAlign: 'center',
    paddingTop:5,
    _height:40,
    _extraMargin:5,
  },   
});
