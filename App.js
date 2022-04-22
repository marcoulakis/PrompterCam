// console.disableYellowBox = true
import React, { Component, useEffect, useState }from 'react';
import  Routes  from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App () {
  return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
  );
}