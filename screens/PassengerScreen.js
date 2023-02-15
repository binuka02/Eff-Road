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


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PassengerScreen = () => {
  return (
    <View>
      <Text>PassengerScreen</Text>
    </View>
  )
}

export default PassengerScreen

const styles = StyleSheet.create({})