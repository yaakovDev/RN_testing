import AsyncStorage from '@react-native-async-storage/async-storage'

export const localStorage = {

  async store(key,obj) {
    try {
      const jsonValue = JSON.stringify(obj)
      await AsyncStorage.setItem(key, jsonValue)
      return true
    } catch (e) {
      console.log(`localStorage storeObj failed`);
    }
    return false
  },

  async get(key) {
    let ret=null
    try {
      ret = await AsyncStorage.getItem(key)
      ret = (ret) ? JSON.parse(ret) : null
    } catch(e) {
      console.log(`localStorage getObj failed`);
    }
    return ret
  },
  async remove(key){
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.log(`localStorage remove failed`);
    }
  }

}//end of localStorage scope

