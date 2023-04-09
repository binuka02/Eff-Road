import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import { API_URL } from '@env'; 

export default function CameraApp({currentLocation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);
  let parsedLocation;


  useEffect(() => {
    console.log(currentLocation)
    // parsedLocation = JSON.parse(currentLocation)
    async function getPermission() {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      if (granted) {
        requestPermission(granted);
      }
    }
    getPermission();
    const interval = setInterval(() => {
      takePicture();
    }, 10000);

    return ()=>{
        clearInterval(interval)
    }
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync({
        base64: true,
        
      });
      // console.log(data);
      setImage(data.uri);
      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
    
      formData.append("location[latitude]",currentLocation.latitude)
      formData.append("location[longitude]",currentLocation.longitude)
      await axios.post(API_URL+"/upload",formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
    }
  };

  return (

      <Camera style={styles.camera} type={type} ref={cameraRef} useCamera2Api={true}>
      </Camera>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    // display: 'none',
    width: '100%',
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});