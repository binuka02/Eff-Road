import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useRef } from 'react';
import { useState, useEffect } from 'react';

const carImage = require('./car-icon.jpg');

// const [distanceDuration, setDistanceDuration] = useState({});

const Maps = () => {
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const mapRef = useRef(null);

    useEffect(()=>{
        if(!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['Origin', 'Destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination])

    //Correct//

    React.useEffect(() => {
        getLocationPermission();
    }, []);

    async function getLocationPermission(){
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            alert('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        }
        // origin.latitude = current.latitude;
        // origin.longitude = current.longitude;
    }

    //Wrong//

    // const [currentLocation, setCurrentLocation] = useState(null);

    // useEffect(() => {
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

    //       console.log(currentLocation);
    //       selectOrigin(currentLocation);
    //     })();
    //   }, []);


  return (
    
    <MapView
    ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
            // latitude: 6.8625,
            // longitude: 79.8855,
            latitude: destination.location.lat,
            longitude: destination.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }}
    >
        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={5}
                strokeColor="black"
                // onReady={result => {
                //     setDistanceDuration({
                //       distance: result.distance,
                //       duration: result.duration,
                //     });
                //   }}
            />
        )}



        {destination?.location && (
            <Marker
            strokeColor="black"
                draggable
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="Destination"
                description={destination.description}
                identifier="Destination"
            />
        )}

        {origin?.location && (
            <Marker
                image={carImage}
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="Origin"
            />
        )}

        
    </MapView>
    

  );
  
};


export default Maps;
