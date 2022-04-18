import AsyncStorage from '@react-native-async-storage/async-storage';

const scriptsKey = 'scripts';
export const fontSizeKey = 'fontSize';
export const scrollingSpeedKey = 'scrollingSpeed';

export const getAllScripts = async () => {
  try {
    const scriptsJSON = await AsyncStorage.getItem(scriptsKey);
    let scripts = [];
    if (scriptsJSON !== null) {
      scripts = JSON.parse(scriptsJSON);
    }
    return scripts;
  } catch (e) {}
};

export const addScript = async (value) => {
  try {
    const scripts = await getAllScripts();
    scripts.push(value);
    await AsyncStorage.setItem(scriptsKey, JSON.stringify(scripts));
    return scripts;
  } catch (e) {}
};

export const removeScript = async (index) => {
  try {
    const scripts = await getAllScripts();
    scripts.splice(index, 1);
    await AsyncStorage.setItem(scriptsKey, JSON.stringify(scripts));
    return scripts;
  } catch (e) {}
};

export const getValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {}
};

export const setValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};