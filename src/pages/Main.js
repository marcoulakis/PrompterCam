import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView} from 'react-native'
import React, {useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from '../languages';
import {useNavigation} from '@react-navigation/native';
import image from '../../assets/splash.png';
import usa from '../../assets/usa.png';
import br from '../../assets/br.png';


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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Your Language</Text>
        <View style={{flex: 1, marginVertical: 5, borderColor: '#818181', borderWidth: 1, borderRadius: 0, width: "70%"}} />
        <Text style={styles.title}>Escolha Seu Idioma</Text>
      </View>
      <View style={styles.languageContainer}>
        <TouchableOpacity onPress={() => language("en")} style={styles.button}>
          <Image source={usa} style={styles.languageImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => language("pt")}  style={styles.button}>
          <Image source={br} style={styles.languageImage}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageContainer: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: "space-around",
    backgroundColor: '#212124',
    alignItems: 'space-around',
    paddingVertical: 20,
    borderRadius: 50,
  },
  titleContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    marginBottom: 50,
  },
  languageImage:{
    width: 130,
    height: 130,
  },
  title: {
    fontSize: 30,
    color: '#ffff',
  },
  button: {
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 40,
  }
})