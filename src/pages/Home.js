import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import {ScriptListItem} from '../components/ScriptListItem';
import {
  addScript,
  getAllScripts,
  removeScript,
  getValue,
  setValue,
  fontSizeKey,
  scrollingSpeedKey,
} from '../helpers';
import { TriangleColorPicker, fromHsv } from 'react-native-color-picker'
import { useTranslation } from 'react-i18next';


const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#818181',
      }}
    />
  );
};

const Home= () => {
  const {t, i18n} = useTranslation();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [inputString, setInputString] = useState('');
  const [scripts, setScripts] = useState([]);

  const [fontSize, setFontSize] = useState(30);
  const [scrollSpeed, setScrollSpeed] = useState(30);
  const [color, setColor] = useState("#FFFFFF");


  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (Platform.OS === 'ios') {
      navigation.setOptions({
        headerRight: () => (
          <Button
            color="#ffffff"
            onPress={() => setAddModalVisible(true)}
            title={t("translation.add")}
          />
        ),
        headerLeft: () => (
          <Button
            color="#ffffff"
            onPress={() => setSettingsModalVisible(true)}
            title={t("translation.settings")}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setSettingsModalVisible(true)}>
              <Text style={styles.headerButtonText}>{t("translation.settings")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => setAddModalVisible(true)}>
              <Text style={styles.headerButtonText}>{t("translation.add")}</Text>
            </TouchableOpacity>
          </View>
        ),
      });
    }
  }, [navigation]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedScripts = await getAllScripts();
      setScripts(fetchedScripts);

      const defaultFontSize = await getValue(fontSizeKey);
      if (defaultFontSize !== null) {
        setFontSize(parseInt(defaultFontSize, 10));
      }
      const defaultScrollingSpeed = await getValue(scrollingSpeedKey);
      if (defaultScrollingSpeed !== null) {
        setScrollSpeed(parseInt(defaultScrollingSpeed, 10));
      }

    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const updatedScripts = await addScript(inputString);
    setScripts(updatedScripts);
    setAddModalVisible(false);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  const handleCloseSettings = async () => {
    await setValue(fontSizeKey, fontSize.toString());
    await setValue(scrollingSpeedKey, scrollSpeed.toString());
    setSettingsModalVisible(false);
  };

  const openScript = (script) => {
    navigation.navigate('CameraScreen', {text: script, scrollSpeed: scrollSpeed, fontSize: fontSize, color: color});
  };

  const renderItem = ({item, index}) => {
    const length = 100;
    const trimmedString =
      item.length > length ? `${item.substring(0, length - 3)}...` : item;

    return (
      <ScriptListItem
        title={trimmedString}
        onPress={() => openScript(item)}
        handleDelete={async () => {
          const updatedScripts = await removeScript(index);
          setScripts(updatedScripts);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <StatusBar
        animated={true}
        barStyle={"light-content"}
      />
      <Modal
        animationType="slide"
        transparent
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(!addModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalTextInput}
              multiline
              textAlignVertical="top"
              onChangeText={(value) => setInputString(value)}
            />
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={handleCancel}>
                <Text style={styles.textStyle}>{t("translation.cancel")}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonSave]}
                onPress={handleSave}>
                <Text style={styles.textStyle}>{t("translation.save")}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={settingsModalVisible}
        onRequestClose={() => {
          setSettingsModalVisible(!addModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.settingsSection}>
              <Text
                style={styles.settingsText}>{`${t("translation.text-size")}: ${fontSize}`}</Text>
              <View style={styles.sliderView}>
                <Text style={{fontSize: 10, marginRight: 10, color: "#ffffff", fontWeight:'bold'}}>A</Text>
                <Slider
                  style={{width: 250, height: 40}}
                  minimumValue={20}
                  maximumValue={100}
                  minimumTrackTintColor="#818181"
                  maximumTrackTintColor="#ffffff"
                  onValueChange={value => setFontSize(value)}
                  step={1}
                  value={fontSize}
                />
                <Text style={{fontSize: 25, marginLeft: 10, color: "#ffffff", fontWeight:'bold'}}>A</Text>
              </View>
            </View>

            <View >
              <Text
                style={
                  styles.settingsText
                }>{`${t("translation.color")}: ${color}`}</Text>
                <View style={{height: 200, width: "100%", flexDirection: 'row'}}>
                    <TriangleColorPicker
                        onColorChange={color => setColor(fromHsv(color))}
                        style={{flex: 1}}
                        defaultColor={color}
                        hideSliders={true}
                        hideControls={true}
                    />
                    <View style={{flex: 1, borderRadius: 40, backgroundColor: color, borderColor: "#ffffff", borderWidth:3, marginVertical: 30, marginLeft:15}}>
                    </View>
              </View>
            </View>
            
            <View style={styles.settingsSection}>
              <Text
                style={
                  styles.settingsText
                }>{`${t("translation.scroll-speed")}: ${scrollSpeed}`}</Text>
              <View style={styles.sliderView}>
                <Text style={{fontSize: 25, marginRight: 10}}>🐢</Text>
                <Slider
                  style={{width: 250, height: 40}}
                  minimumValue={2}
                  maximumValue={100}
                  minimumTrackTintColor="#818181"
                  maximumTrackTintColor="#ffffff"
                  onValueChange={value => setScrollSpeed(value)}
                  step={1}
                  value={scrollSpeed}
                />
                <Text style={{fontSize: 25, marginLeft: 10}}>🐇</Text>
              </View>
            </View>

            <Pressable
              style={[styles.button, styles.buttonSave]}
              onPress={handleCloseSettings}>
              <Text style={styles.textStyle}>{t("translation.save-and-close")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList
        data={scripts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `key${index}`}
        ItemSeparatorComponent={FlatListItemSeparator}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: '#000000',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: 200,
    },
    modalView: {
      margin: 10,
      marginTop: 100,
      backgroundColor: '#161618',
      borderRadius: 5,
      padding: 15,
      alignItems: 'center',
      shadowColor: '#fff',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    button: {
      borderRadius: 5,
      padding: 10,
      elevation: 2,
      height: 40,
    },
    buttonSave: {
      backgroundColor: '#34c759',
    },
    buttonCancel: {
      backgroundColor: '#ff3b30',
    },
    textStyle: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalTextInput: {
      marginBottom: 15,
      padding: 10,
      height: 150,
      width: 300,
      margin: 12,
      borderWidth: 3,
      borderRadius: 25,
      borderColor: '#818181',
      color: '#ffffff',
    },
    settingsText: {
      textAlign: 'center',
      fontSize: 18,
      color: '#ffffff',
    },
    settingsSection: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    sliderView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      alignItems: 'center',
      color: '#ffffff',
      padding: 10,
    },
    headerButtonText: {color: '#ffffff', fontSize: 18, fontWeight: '800'},
});
