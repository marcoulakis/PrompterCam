import { StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../languages';
import {useNavigation} from '@react-navigation/native';
import image from '../../assets/splash.png'

const Main = () => {

  const [chosenLanguage, setChosenLanguage] = useState(undefined) 
  const navigation = useNavigation();

  const getLanguage = async () => {
    const language = await AsyncStorage.getItem("@teleprompter:language")
    if(language === "en" || language === "pt"){
    setChosenLanguage(language)
    }else{
      setChosenLanguage("undefined")
    }
  }
  const language = (chosenLanguage) => {
    AsyncStorage.setItem('@teleprompter:language', chosenLanguage)
    i18next.changeLanguage(chosenLanguage)
    navigation.navigate("Home")
  }
getLanguage();
  return (
    chosenLanguage === "undefined" ?
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
    : 
    <>
      <Image style={{height: '100%', width: '100%'}} source={image}/>
    </>
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