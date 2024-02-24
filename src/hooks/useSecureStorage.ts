import * as SecureStore from "expo-secure-store"; 

export default function useSecureStorage(key: string) {

  const storeData = async (value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("Error while storing data to AsyncStorage: " + error);
    }
  };

  const getData = async () => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      console.error("Error while reading data from AsyncStorage: " + error);
    }
  };

  return {getData, storeData};
}