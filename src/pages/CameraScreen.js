import { StyleSheet, Text, TouchableOpacity, View, Image, Linking, Dimensions, SafeAreaView } from 'react-native';
import React, { useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import  * as ImagePicker from 'expo-image-picker';
import  * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import * as ScreenOrientation from "expo-screen-orientation";
import PrompterContainer from "./PrompterContainer"
import { useTranslation } from 'react-i18next';


const CameraScreen = (props) => {

  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();  
    }
  }

  const {t, i18n} = useTranslation();

  const MainColor = props.route.params.color;

  const [ cameraIsPermitted, setCameraIsPermitted ] = useState(false)
  const [ audioIsPermitted, setAudioIsPermitted ] = useState(false)
  const [ galleryIsPermitted, setGalleryIsPermitted ] = useState(false)
  const [ galleryItems, setGalleryItems ] = useState([])
  const [ height, setHeight ] = useState(9)
  const [ width, setWidth ] = useState(16)
  const [ cameraRef, setCameraRef ] = useState(null)
  const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back)
  const [ cameraFlashMode, setCameraFlashMode ] = useState(Camera.Constants.FlashMode.off)
  const [ isCameraReady, setIsCameraReady ] = useState(false);
  const [ flashIcons, setFlashIcons ] = useState("flash-off");
  const [ lockIcon, setLockIcon ] = useState("screen-rotation");
  const [ recordIcon, setRecordIcon ] = useState("no")

 
  
  const isFocused = useIsFocused()

  const lockAndUnlockScreen = () => {
    if(lockIcon === "screen-lock-rotation"){
      setLockIcon("screen-rotation")
      ScreenOrientation.unlockAsync()
    }else{
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
      setLockIcon("screen-lock-rotation")
    }
  } 

  useEffect(() => {
    (
      async() => {
      lockAndUnlockScreen();

      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setCameraIsPermitted(cameraStatus.status == 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setAudioIsPermitted(audioStatus.status == 'granted');      

      await refreshGallery();
    })()
  }, [])

  const refreshGallery = async () => {
    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setGalleryIsPermitted(galleryStatus.status == 'granted');
    
    if(galleryStatus.status == 'granted'){

      const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video']})
      setGalleryItems(userGalleryMedia.assets);
    }
  }
  if(!cameraIsPermitted || !audioIsPermitted || !galleryIsPermitted){
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#000000"}}>
        <TouchableOpacity onPress={openAppSettings} style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.permissionsTitle}>{t("translation.permissions-title")}</Text>
          <Text style={styles.permissionsSubtitle}>{t("translation.permissions-subtitle")}</Text>
            <Text style={styles.permissionsItems}>
              {
                !cameraIsPermitted && t("translation.camera-permissions")
              }
              {
                !audioIsPermitted && t("translation.microphone-permissions")
              }
              {
                !galleryIsPermitted && t("translation.gallery-permissions")
              }
              
            </Text>
          <Text style={styles.goToSettings}>{t("translation.go-to-settings")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const recordSwitch = async () => {
    if(recordIcon === "no"){
      setRecordIcon("stop")
      recordVideo();
    }else{
      setRecordIcon("no")
      stopVideo();
    }
  }
  const recordVideo = async () =>{
    if(cameraRef){
      try {
          const options = {quality: Camera.Constants.VideoQuality['720']};
          const videoRecordPromise = cameraRef.recordAsync(options);
          if(videoRecordPromise){
            const data = await videoRecordPromise;
            const source = data.uri;
            console.log(source);
            const save = await MediaLibrary.saveToLibraryAsync(source);
            refreshGallery();
          }
      } catch (error) {
        console.warn(error);
      }
    }
  }

  const stopVideo = async () => {
    if(cameraRef){
      cameraRef.stopRecording();
    }
  }

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, 
      allowsEditing: true,
      aspect: [height, width]
    })
    if(!result.cancelled){
      //TODO: Pass uri of video
    }
  }

  const flashSwitch = () => {
    if(cameraFlashMode == Camera.Constants.FlashMode.off){
      setCameraFlashMode(Camera.Constants.FlashMode.torch);
      setFlashIcons("flash-on")
    }else if(cameraFlashMode == Camera.Constants.FlashMode.torch){
      //   setCameraFlashMode(Camera.Constants.FlashMode.auto);
      //   setFlashIcons("flash-auto")
      // }else if(cameraFlashMode == Camera.Constants.FlashMode.auto){
      setCameraFlashMode(Camera.Constants.FlashMode.off);
      setFlashIcons("flash-off")
    }
  }

  const cameraSwitch = () => {
    if(cameraType == Camera.Constants.Type.back){
      setCameraType(Camera.Constants.Type.front);
      setCameraFlashMode(Camera.Constants.FlashMode.off);
      setFlashIcons("flash-off")
    }else if(cameraType == Camera.Constants.Type.front){
      setCameraType(Camera.Constants.Type.back);
    }
  }


  const listner = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync()

    if(orientation === 1 || orientation === 2){
      setHeight(9)
      setWidth(16)
    }else{
      setHeight(16)
      setWidth(9)
    }
  }

    ScreenOrientation.addOrientationChangeListener(listner)
  // need to rebuild the camera layout
  return (
    <View style={styles.container}>
      {isFocused ? 
        <Camera
          ref={ref => setCameraRef(ref)}
          style={{    flex: 1, position: 'absolute', width : '100%', height : '100%',
            backgroundColor: "#ffff",
            aspectRatio: height / width}}
          ratio={height.toString() + ':' + width.toString()}
          type={cameraType}
          flashMode={cameraFlashMode}
          onCameraReady={() => setIsCameraReady(true)}
        /> 
      : null}
      <SafeAreaView style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around'}}> 
       <View style={styles.topToolBarContainer}>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}> 
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => cameraSwitch()}
              accessibilityLabel={t("translation.flip")}
            >
              <Icon
                name={"flip-camera-ios"}
                type='material'
                color={MainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => lockAndUnlockScreen()}
              accessibilityLabel={lockIcon === "screen-rotation" ? t("translation.screen-rotate-on") : t("translation.screen-rotate-off")}
            >
              <Icon
                name={lockIcon}
                type='material'
                color={MainColor}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              accessibilityLabel={flashIcons === "flash-on" ? t("translation.flash-on") : t("translation.flash-off")}
              style={styles.iconButton}
              onPress={() => flashSwitch()}
              disabled={cameraType == Camera.Constants.Type.front}
            >
              <Icon
                name={flashIcons}
                type='material'
                color={MainColor}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <PrompterContainer text={props.route.params.text} color={MainColor} scrollSpeed={props.route.params.scrollSpeed} fontSize={props.route.params.fontSize} style={{
          position: 'relative',
          flex: 1,
          flexDirection: 'column',
        }}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          
          <View style={styles.container}></View>
          <View style={styles.recordButtonContainer}>
            <TouchableOpacity 
              disabled={!isCameraReady} 
              style={styles.recordButtonOutline}
              onPress={() => recordSwitch()}
              accessibilityLabel={recordIcon === "no" ? t("translation.record") : t("translation.stop")}
            >
              {   
                recordIcon === "no" ? 
                <View
                  style={styles.recordButton}
                />
                :
                <Icon
                name={recordIcon}
                type='material'
                color='#FF4040'
                size={50}
                />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.galleryItemContainer}>
            <TouchableOpacity 
              style={styles.galleryItem}
              onPress={() => pickFromGallery()}
              accessibilityLabel={t("translation.gallery")}
            >
              {galleryItems[0] == undefined ?
                <></>
                : 
                <Image style={styles.galleryItemPhoto} source={{uri: galleryItems[0].uri}}/>
              }
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bottomToolBarContainer:{
    position: 'relative',
    flexDirection: 'row',  
    alignItems: 'center'
  },
  topToolBarContainer: {
    position: 'relative',
    flexDirection: 'row',  
    alignItems: 'center',
    marginHorizontal: 30,
  },
  recordButtonContainer:{
    marginHorizontal: 30,
    alignItems: 'center',
  },
  recordButton:{
    borderRadius: 100,
    height: 70,
    width: 70,
    backgroundColor: '#FF4040',
  },
  recordButtonOutline: {
    borderWidth: 10,
    borderColor: '#FF404056',
    borderRadius: 100,
    height: 85,
    width: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryItemContainer: {
    flex: 1,
    marginVertical:14,

  },
  permissionsTitle: {
    textAlign: 'center',
    fontSize: 34, 
    color: '#ffffff',
    fontWeight: 'bold',
  },
  permissionsSubtitle:{
    textAlign: 'center',
    fontSize: 18, 
    color: '#ffffff',
    marginBottom: 30,
  },
  permissionsItems: {
    textAlign: 'center',
    fontSize: 20, 
    color: '#ffffff',
    marginHorizontal: 30,
  },
  goToSettings: {
    textAlign: 'center',
    fontSize: 20, 
    color: '#ffffff',
    fontWeight: 'bold'
  },
  galleryItem:{
    borderWidth:2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    height: 60,
    width: 60,
  },
  galleryItemPhoto:{
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center'
  }
});
