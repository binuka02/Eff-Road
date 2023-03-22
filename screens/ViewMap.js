//Correct

// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import * as Location from 'expo-location';
// import MapView from 'react-native-maps';
// import { Marker } from 'react-native-maps';
 
// export default function App() {
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
      
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status == 'granted') {
//         console.log('Permission granted');
//       }
//       else{
//         console.log('Permission denied');
//       }

//       const currentLocation = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(currentLocation);
//     })();
//   }, []);

//   return (
//     <View>
//       <Text>{JSON.stringify(currentLocation)}</Text>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({}); 


//////////////////


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

// const App = () => {
//   const [location, setLocation] = useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   useEffect(() => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//     );
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker
//           coordinate={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//           }}
//           title="Current Location"
//         />
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: 400,
//     width: 400,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });

// export default App;

///////////////


import { ImageBackground, StyleSheet, Text, View, TouchableOpacity,Image,SafeAreaView } from 'react-native'
import React from 'react'
// import { AlanView } from '@alan-ai/alan-sdk-react-native';
import LandingBackground from '../components/authentication/LandingBackground';
import { Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Buttons from '../components/authentication/Buttons';

const ViewMap = (nv) => {
  return (
    // <LandingBackground>
    //   <View style={{marginVertical:50, textAlign:'center'}}>
    //     <Text style={{color:'#090A2E', fontSize:64, }}>EffRoad</Text>
    //     <Buttons txtcolor='white' bgcolor='black' btnlbl="Login" press={()=>nv.navigation.navigate("Login")}/>
    //     <Buttons txtcolor='black' bgcolor='white' btnlbl="Signup"  press={()=>nv.navigation.navigate("Signup")}/>
    //   </View>
    // </LandingBackground>
    <SafeAreaView>

          <View style={tw`flex-row px-6 mt-10 items-center`}>
                <View style={tw`w-16 h-16 bg-black rounded-full items-center justify-center`}>
                    <Text style={tw`text-blue-300 text-4xl font-semibold`}>Eff</Text>
                </View>
                
                    <Text style={tw`text-black text-3xl font-semibold`}>Road</Text>
                
            </View>

            <View style={tw`px-6 mt-10`}>
                <Text style={tw`text-black text-4xl font-bold`}>Simplify your journey</Text>
                
                {/* <Text style={tw`text-lg mt-5 font-bold`}>Welcome</Text> */}
                <Text>The smarter way to navigate. Our app offers real-time updates, turn-by-turn directions, and a range of features to help you get to your destination with ease. With our customizable map views, voice-activated commands, and hands-free operation, you can focus on the road ahead and leave the rest to us.</Text>
            </View>

          {/* <View style={tw` w-64 h-64 bg-blue-300 rounded-full absolute top-52 -right-28 opacity-50`}></View>
            <View style={tw`w-64 h-64 bg-red-300 rounded-full absolute top-80 -left-20 opacity-50`}></View> */}
<TouchableOpacity
            onPress={()=>nv.navigation.navigate("Login")}
            >
            <View style={tw`mx-auto w-52 h-10 items-center justify-center bg-black mt-8 shadow-2xl rounded-lg`}>
             <Text style={tw`text-gray-50 text-xl font-semibold `}>Log in to EffRoad</Text>                
            </View>
            </TouchableOpacity>
            <View style={tw` mx-auto relative items-center justify-center mt-16`}>
            
                <Image
                // animation="fadeIn"
                // easing="ease-out"
                    source={require("./frontmap.png")}
                    style={tw`w-96 h-72`}
                />
            
            
          </View>
          
    </SafeAreaView>
  )
}

export default ViewMap

const styles = StyleSheet.create({})