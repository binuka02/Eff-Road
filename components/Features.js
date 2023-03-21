import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';


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
    
  const userLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
    }
    const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    if(mapLoaded){
    setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    }
    console.log(location.coords.latitude, location.coords.longitude);
    }

    const kohuwalaLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        const location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    
        if(mapLoaded){
        setMapRegion({
            latitude: 6.8301,
            longitude: 79.8801,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            
        });
        console.log("6.8301, 79.8801");
        }
        
        }

    useEffect(() => {
        userLocation();
        kohuwalaLocation();
    }, [])

  return (
    <View style={styles.container}>
        <MapView style={styles.map}
        region={mapRegion}
        onLayout={handleMapLayout}>
            <Marker coordinate={mapRegion} />
        </MapView>
        <Button title="Get Current Location" onPress={userLocation} />
        <Button title="Kohuwala" onPress={kohuwalaLocation} />
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