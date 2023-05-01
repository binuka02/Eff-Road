import { StyleSheet, Text, View, Dimensions, Button,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios'
import { API_URL } from '@env'; 
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import Camera from './Camera';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Features = () => {

    const navigation = useNavigation();


    const [mapRegion, setMapRegion] = useState({
        latitude: 6.8649,
        longitude: 79.8997,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [mapLoaded, setMapLoaded] = useState(false);
    const [currentLocation,setCurrentLocation] = useState(null)

    const [openCamera,setOpenCamera] = useState(false)

    const handleMapLayout = () => {
        setMapLoaded(true);
    };

    useEffect(()=>{
        const init = async()=>{
            const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        }
        init()
    },[])
    
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
        'Authorization': 'Bearer '+user.token
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
        {/* <MapView style={styles.map}
        region={mapRegion}
        onLayout={handleMapLayout}>
            <Marker coordinate={mapRegion} />
        </MapView> */}


        


        {/* <Button title="Police"  onPress={()=>userLocation("Police")} /> */}
        {/* <Button title="Accident" onPress={()=>userLocation("Accident")} /> */}

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
                        <Text style={tw`text-xs items-center justify-center font-semibold`}>Roadside Help</Text>

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
        {openCamera && currentLocation && <Camera currentLocation={currentLocation}/>}


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
        paddingBottom:25
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
