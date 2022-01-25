import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useEffect, useState} from 'react';
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import  * as ImagePicker from 'expo-image-picker'
import  * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const CameraScreen = () => {

  const [cameraIsPermitted, setCameraIsPermitted ] = useState(false)
  const [audioIsPermitted, setAudioIsPermitted ] = useState(false)
  const [galleryIsPermitted, setGalleryIsPermitted ] = useState(false)

  const [galleryItems, setGalleryItems ] = useState([])

  const [cameraRef, setCameraRef] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
  const [cameraFlashMode, setCameraFlashMode] = useState(Camera.Constants.FlashMode.off)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [flashIcons, setFlashIcons] = useState("flash-off")

 
  cameraType
  const isFocused = useIsFocused()

  useEffect(() => {
    (async() => {
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
      aspect: [16, 9]
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
    <View style={styles.container}>
      {isFocused ? 
        <Camera
          ref={ref => setCameraRef(ref)}
          style={styles.camera}
          ratio={'16:9'}
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
      <View style={styles.bottomToolBarContainer}>
        <View style={styles.container}></View>
        <View style={styles.recordButtonContainer}>
          <TouchableOpacity 
            disabled={!isCameraReady} 
            style={styles.recordButtonOutline}
            onLongPress={() => recordVideo()}
            onPressOut={() => stopVideo()}
          >
            <View
              style={styles.recordButton}
            />
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
  camera: {
    flex: 1,
    backgroundColor: "#000000",
    aspectRatio: 9 / 16
  },
  bottomToolBarContainer:{
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',  
    marginBottom: 30,
    alignItems: 'center'
  },
  topToolBarContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    flexDirection: 'row',  
    marginTop: 40,
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
