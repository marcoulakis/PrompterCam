import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../languages';
import {useNavigation} from '@react-navigation/native';

const Main = () => {

  const navigation = useNavigation();

  const language = (chosenLanguage) => {
    AsyncStorage.setItem('@teleprompter:language', chosenLanguage)
    i18next.changeLanguage(chosenLanguage)
    navigation.navigate("Home")
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Your Language</Text>
        <Text style={styles.title}>-----------------------</Text>
        <Text style={styles.title}>Escolha Seu Idioma</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => language("en")} style={styles.button}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => language("pt")}  style={styles.button}>
          <Text style={styles.buttonText}>Português</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 30,
    color: '#000000aa',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#00000080',
    marginBottom: 5,
    marginTop: 10,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 40,
  }
})