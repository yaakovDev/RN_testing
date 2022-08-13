import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeObj = async (key,obj) => {
  try {
    const jsonValue = JSON.stringify(obj)
    await AsyncStorage.setItem(key, jsonValue)
    return true
  } catch (e) {
    console.log(`localStorage storeObj failed`);
  }
  return false
}


export const getObj = async (key) => {
  let ret=null
  try {
    ret = await AsyncStorage.getItem(key)
    ret = (ret) ? JSON.parse(ret) : null
  } catch(e) {
    console.log(`localStorage getObj failed`);
  }
  return ret
}

/*

const storeValue = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}


const getValue = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // error reading value
  }
}
*/