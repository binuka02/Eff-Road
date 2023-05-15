import { StyleSheet, Text, Alert, View, Dimensions, Button, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios'
import { API_URL } from '@env';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { featureLocationsData } from '../slices/navSlice';
import { Camera, CameraType } from 'expo-camera';
import * as Speech from 'expo-speech';

const Features = () => {

  // Model Calling
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [spokenClassName, setSpokenClassName] = useState('');

  //Getting Camera Permission
  useEffect(() => {
    console.log("Camera Opened")
    async function getPermission() {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      if (granted) {
        requestPermission(granted);
      }
    }
    getPermission();
  }, []);

  //Handling the detecting road sign image
  const handleCapture = async () => {
    if (permission) {
      try {
        const image = await captureImage();
        await sendImageToBackend(image.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to capture or send the image.');
      }
    } else {
      requestPermission();
    }
  };

  //Capturing the road sign
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      return { uri: photo.uri };
    }
    return null;
  };

  //Sending captured image to backend
  const sendImageToBackend = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      //API Calling
      const response = await fetch(
        'http://192.168.1.3:5000/detect-road-sign',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )

      const { class_name } = await response.json();

      console.log(class_name);

      //Voice Output
      setSpokenClassName(class_name);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to communicate with the backend.');
    }
  };

  useEffect(() => {
    if (spokenClassName) {
      Speech.speak(spokenClassName);
    }
  },)










    const navigation = useNavigation();
    const featureLocations = useSelector(featureLocationsData)


    const [mapRegion, setMapRegion] = useState({
        latitude: 6.8649,
        longitude: 79.8997,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [mapLoaded, setMapLoaded] = useState(false);
    const [currentLocation,setCurrentLocation] = useState(null)
    const [user,setUser] = useState(null)

    const [openCamera,setOpenCamera] = useState(false)
    const [roadsideHelpClicked,setRoadsideHelpClicked] = useState(false) 

    const handleMapLayout = () => {
        setMapLoaded(true);
    };

    //Get current location access
    useEffect(()=>{
       
        const init = async()=>{
            const userJson = await AsyncStorage.getItem("user");
            setUser(JSON.parse(userJson))
            const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        }
        init()
    },[])

    //Roadside help pin only can drop once at a time
    useEffect(()=>{
        if(!user) return;
        setRoadsideHelpClicked(false);
        featureLocations.forEach((location)=>{
            if(location.feature==='RoadsideHelp' && location.userId===user.id){
                setRoadsideHelpClicked(true)
            }
        })
    },[featureLocations,user])
    
    //Get current location and dropping pins
  const userLocation = async (feature) => {
    const userJson = await AsyncStorage.getItem('user')
    let user;
    if(userJson){
        user = JSON.parse(userJson)
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }

    const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,

    })
    
await axios.post(API_URL+"/location",{
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    feature
},{
    headers:{
        'Authorization': 'Bearer '+user.token //Middleware
    }
})
    // if(mapLoaded){
    // setMapRegion({
    //     latitude: location.coords.latitude,
    //     longitude: location.coords.longitude,
    //     latitudeDelta: 0.0922,
    //     longitudeDelta: 0.0421,
    // });
    // }
    // console.log(location.coords.latitude, location.coords.longitude);
    }

   

    
  return (
    <View style={styles.container}>

        {/* Situaress Awereness pins panel */}
        

        <Text style={tw`mt-2 font-bold text-lg`}>Let Other's Know..</Text> 

        <View style={styles.boxContainOuter}>
        <View style={styles.boxContain}>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={()=>userLocation("Police")}
                        title="Police"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-gray-200 `}>
                            <Image 
                                source={require("../assets/featureImages/police.png")}
                                style={tw`w-10 h-10`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>Police Inspector</Text>

                    </TouchableOpacity>            
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Emergency',{origin:currentLocation})}
                        title="Emergency"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-red-100 `}>
                            <Image 
                                source={require("../assets/featureImages/emergency.png")}
                                style={tw`w-8 h-8`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold text-red-600`}>Emergency</Text>

                    </TouchableOpacity>            
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={()=>userLocation("Accident")}
                        title="Accident"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-gray-200 `}>
                            <Image 
                                source={require("../assets/featureImages/accident.png")}
                                style={tw`w-10 h-10`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>Accident</Text>

                    </TouchableOpacity>            
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={()=>userLocation("RoadClosure")}
                        title="RoadClosure"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-gray-200 `}>
                            <Image 
                                source={require("../assets/featureImages/road-closure.png")}
                                style={tw`w-10 h-10`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>Road Closure</Text>

                    </TouchableOpacity>            
                </View>
            </View><View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={()=>userLocation("Traffic")}
                        title="Traffic"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-gray-200 `}>
                            <Image 
                                source={require("../assets/featureImages/traffic.png")}
                                style={tw`w-12 h-12`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>Traffic</Text>

                    </TouchableOpacity>            
                </View>
            </View>
           <View style={styles.box}>
                <View style={styles.inner}>
                    <TouchableOpacity 
                        onPress={()=>userLocation("RoadsideHelp")}
                        title="RoadsideHelp"
                        style={tw`items-center `}
                    >    
                        <View style={tw` w-14 h-14 items-center justify-center rounded-full bg-gray-200`}>
                            <Image 
                                source={require("../assets/featureImages/roadside-help.png")}
                                style={tw`w-10 h-10`}
                            />
                        </View>
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>
                           {roadsideHelpClicked ? "Remove":"Roadside Help"}
                        </Text>
                    </TouchableOpacity>            
                </View>
            </View>
            


           
          
        </View>

        

        
       
        {/* <Camera/> */}

        <View style={styles.boxContain2}>
            <View style={styles.box2}>
                <View style={styles.inner2}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={tw`text-sm bg-red-500 px-6 py-1 rounded-full text-gray-200 font-semibold shadow-2xl`}>End Journey</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.inner2}>
                    <TouchableOpacity
                        onPress={()=>{
                            setOpenCamera(!openCamera)
                        }}
                    >
                        <Text style={tw`text-sm bg-blue-400 px-6 py-1 rounded-full text-gray-200 font-semibold shadow-2xl`}>
                            {openCamera ? "Close Camera" : "Open Camera"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </View>

        <View style={styles.boxContain3}>
        {/* {capturedImage && <Image source={{ uri: capturedImage }} style={{ width: 200, height: 200 }} />} */}
            <TouchableOpacity
            onPress={handleCapture}
            >
                <View style={tw`bg-white pl-10 pr-10`}>
                    <Text></Text>
                </View>
            </TouchableOpacity>
        {openCamera && currentLocation && <Camera style={styles.camera} currentLocation={currentLocation} type={type} ref={cameraRef} useCamera2Api={true}/>}
    

        </View>
        {/* {openCamera && currentLocation && <Camera currentLocation={currentLocation}/>} */}

    </View>
    

  )
}

export default Features


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
       flexWrap: 'wrap',
    },
    camera: {
        flex: 1,
        width: '100%',  
    },
    boxContain: {
       width: '100%',
       height: '70%',
       backgroundColor: 'white',
       flexDirection: 'row',
       flexWrap: 'wrap',
       marginTop: 5,
    },

    boxContainOuter: {
        width: '70%',
        height: '95%',
        backgroundColor: 'white',
     },

    boxContain3: {
        width: '25%',
        height: '80%',
        backgroundColor: 'white',
        alignItems: 'center', 
        justifyContent:'center', 
        paddingBottom:45
     },

    box: {
      width: '32%',
      height: '40%',
      backgroundColor: 'white',
      marginTop: 10,
   },
  
   inner:{
     flex:1,
     backgroundColor: 'white',
     justifyContent: 'center', 
     alignItems: 'center', 
   } ,

   boxContain2: {
    width: '95%',
    height: '10%',
    backgroundColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    alignItems: 'center'
 },

 box2: {
   width: '50%',
   backgroundColor: 'white',
   
},

inner2:{
  flex:1,
  backgroundColor: 'white',
  justifyContent: 'center', 
  alignItems: 'center', 
} ,

  
   });
