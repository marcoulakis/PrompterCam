import React from 'react';
import { MainPages, FirstTimePages } from './auth.routes';
import i18next from '../languages';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {
  const [language, setLanguage ] = useState(undefined)
  const getLanguage = async () => {
    setLanguage(await AsyncStorage.getItem("@teleprompter:language"))
  }
  getLanguage();
  if(language != undefined) {
    i18next.changeLanguage(language)
    return <MainPages />
  }else{
    return <FirstTimePages />
  }
}

export default Routes;