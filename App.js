// console.disableYellowBox = true
import React, { Component, useEffect, useState }from 'react';
import  Routes  from './src/routes';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Linking from 'expo-linking'
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import './src/config/i18n';

const prefix = Linking.makeUrl("/");

export default function App () {
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
}