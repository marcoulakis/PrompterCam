import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState} from 'react';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import  * as ImagePicker from 'expo-image-picker';
import  * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import * as ScreenOrientation from "expo-screen-orientation";
import PrompterContainer from "./PrompterContainer"

const CameraScreen = () => {

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
      <View>
        <Text>Permissions pending</Text> 
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

  return (
    <View style={styles.container}>
      {isFocused ? 
        <Camera
          ref={ref => setCameraRef(ref)}
          style={{    flex: 1,
            backgroundColor: "#000000",
            aspectRatio: height / width}}
          ratio={height.toString() + ':' + width.toString()}
          type={cameraType}
          flashMode={cameraFlashMode}
          onCameraReady={() => setIsCameraReady(true)}
        /> 
      : null}
      <View style={styles.topToolBarContainer}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}> 
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => cameraSwitch()}
          >
            <Icon
              name={"flip-camera-ios"}
              type='material'
              color='#FFFFFF'
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => lockAndUnlockScreen()}
          >
            <Icon
              name={lockIcon}
              type='material'
              color='#FFFFFF'
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => flashSwitch()}
            disabled={cameraType == Camera.Constants.Type.front}
          >
            <Icon
              name={flashIcons}
              type='material'
              color='#FFFFFF'
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <PrompterContainer style={{
    position: 'absolute',
    flex: 1,
    top: 60,
    flexDirection: 'column',
    height: height == 9 ? '77%': "60%",
    width: '100%',
  }}/>

      <View style={styles.bottomToolBarContainer}>
        <View style={styles.container}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity 
            disabled={!isCameraReady} 
            style={styles.recordButtonOutline}
            onPress={() => recordSwitch()}
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
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',  
    marginBottom: 5,
    alignItems: 'center'
  },
  topToolBarContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',  
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  recordButtonContainer:{
    flex: 1,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryItemContainer: {
    flex: 1,
  },
  galleryItem:{
    borderWidth:2,
    borderColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    height: 50,
    width: 50,
  },
  galleryItemPhoto:{
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  iconButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    justifyContent: 'center'
  }
});
