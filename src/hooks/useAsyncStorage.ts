import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useAsyncStorage(key: string) {

  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error while storing data to AsyncStorage: " + error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (error) {
      console.error("Error while reading data from AsyncStorage: " + error);
    }
  };

  return {getData, storeData};
}