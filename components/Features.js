import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios'
import { API_URL } from '@env';  

const Features = () => {


    const [mapRegion, setMapRegion] = useState({
        latitude: 6.8649,
        longitude: 79.8997,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [mapLoaded, setMapLoaded] = useState(false);

    const handleMapLayout = () => {
        setMapLoaded(true);
    };
    
  const userLocation = async (feature) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
await axios.post(API_URL+"/location",{
    lat: location.coords.latitude,
    lng: location.coords.longitude,
    feature
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

        
                    {/* <TouchableOpacity 
                    
                    onPress={() => navigation.navigate("RiderScreen")}
                    style={tw`items-center `}
                    >    
                            <View style={tw` w-20 h-20 items-center justify-center rounded-full bg-blue-200`}>
                            <Text style={tw`text-gray-50 text-4xl font-semibold`}>Go</Text>                
                        </View>
                    </TouchableOpacity> */}
        <Button title="Police"  onPress={()=>userLocation("Police")} />
        <Button title="Accident" onPress={()=>userLocation("Accident")} />
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
    },
    map: {
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        height: 150,
    },
})

