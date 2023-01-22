import { StyleSheet, Text, TouchableOpacity, View, Image, Linking, Platform, Dimensions, SafeAreaView } from 'react-native';
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
  const [ height, setHeight ] = useState(16)
  const [ width, setWidth ] = useState(9)
  const [ cameraRef, setCameraRef ] = useState(null)
  const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.back)
  const [ cameraFlashMode, setCameraFlashMode ] = useState(Camera.Constants.FlashMode.off)
  const [ isCameraReady, setIsCameraReady ] = useState(false);
  const [ flashIcons, setFlashIcons ] = useState("flash-off");
  const [ recordIcon, setRecordIcon ] = useState("no")
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ lockIcon, setLockIcon ] = useState("screen-rotation");
 
  const isFocused = useIsFocused()

  async function changeScreenOrientation() {
    if(!isLoaded){
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      await ScreenOrientation.unlockAsync()
    }
  }

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
    (async() => {
      lockAndUnlockScreen();
      // changeScreenOrientation();
      Dimensions.addEventListener('change', ({window:{width,height}})=>{
          setIsLoaded(true)
          if (width < height) {
            setHeight(16)
            setWidth(9)
          } else {
            setHeight(9)
            setWidth(16)        
          }  
        })
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

  console.log(height)
  console.log(width)

  const recordVideo = async () =>{
    if(cameraRef){
      try {
          const options = {quality: Camera.Constants.VideoQuality['720']};
          const videoRecordPromise = cameraRef.recordAsync(options);
          if(videoRecordPromise){
            const data = await videoRecordPromise;
            const source = data.uri;
            // console.log(source);
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

  return (
  <View style={{flex: 1, flexDirection: "column", backgroundColor: "#161618"}}>
  <SafeAreaView style={styles.topToolBarContainer}>
    <View style={{flex: 1, flexDirection: "row",marginTop: "1.5%", justifyContent: 'space-around'}}> 
      <View style={{height: "2%", width: 40,justifyContent: 'center'}}>
        <TouchableOpacity 
          style={{height: 40,width: 40,justifyContent: 'center'}}
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
      </View>
      <View style={{height: "2%", width: 40,justifyContent: 'center'}}>
        <TouchableOpacity 
          style={{height: 40,width: 40,justifyContent: 'center'}}
          onPress={() => lockAndUnlockScreen()}
          accessibilityLabel={t("translation.screen-rotate-on")}
        >
          <Icon
            name={lockIcon}
            type='material'
            color={MainColor}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: "2%", width: 40,justifyContent: 'center'}}>
        <TouchableOpacity 
          style={{height: 40,width: 40,justifyContent: 'center'}}
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
  </SafeAreaView>
  {isFocused ? 
  <Camera
    ref={ref => setCameraRef(ref)}
    style={{flex: 1, resizeMethod: "resize", width: height < width ? "56,25%" : "100%", height: height < width ? "100%" : "56,25%", marginHorizontal: height < width ? "21,875%" : "auto", marginVertical: "auto", backgroundColor: "#ff0"}}
    ratio={height.toString() + ':' + width.toString()}
    type={cameraType}
    flashMode={cameraFlashMode}
    onCameraReady={() => setIsCameraReady(true)}
  >
    <PrompterContainer text={props.route.params.text} color={MainColor} scrollSpeed={props.route.params.scrollSpeed} fontSize={props.route.params.fontSize} style={{
      position: 'relative',
      flex: 1,
      flexDirection: 'column',
      marginHorizontal: "2.5%"
    }}/>
  </Camera>
  : null}
  <View style={{ flexDirection: "row", justifyContent: 'space-around', marginVertical: "1%", width: "auto", height: "auto"}}>
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
    <View style={{flex: 1, marginVertical: 9,}}>
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
    // paddingRight: 20, // ipad horizontal
    marginTop: 10
  },
  recordButtonContainer:{
    // marginRight: "20%", // ipad horizontal
    alignItems: 'center',
  },
  recordButton:{
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: '#FF4040',
  },
  recordButtonOutline: {
    borderWidth: 10,
    borderColor: '#FF404056',
    borderRadius: 100,
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryItemContainer: {

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
    height: 50,
    width: 50,
    // marginHorizontal: 20 
       marginHorizontal: "25%" 
  },
  galleryItemPhoto:{
    height: 50,
    width: 50,
    borderRadius: 10,
  },

});
