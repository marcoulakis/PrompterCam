// console.disableYellowBox = true
import React, { Component, useEffect, useState }from 'react';
import  Routes  from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import i18next from './src/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App () {

  const [isOpen, setIsOpen] = useState(true)

  useEffect( () => {
    getIsOpen()
  }, []);

  async function getIsOpen() {
    const isTrue = await AsyncStorage.getItem("@teleprompter:language");
    console.log("is true  ", isTrue  )
    if(isTrue === "en" || isTrue === "pt"){
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
    console.log("IS OPEN ", isOpen)
  }
  
  return (
      <NavigationContainer>
        <Routes isOpen={isOpen}/>
      </NavigationContainer>
  );
}