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
import { mapRegion} from '../components/Features';
import {socket } from '../socket';  
import axios from 'axios';
import { API_URL } from '@env';

const carImage = require('../assets/car-icon.jpg');

const mapImages ={
    Accident : require('../assets/featureImages/accident.png'),
    Police : require('../assets/featureImages/police.png'),


}



// const [distanceDuration, setDistanceDuration] = useState({});

const Maps = () => {
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const mapRef = useRef(null);
    const [featureLocations,setFeatureLocations] = useState([]);

    useEffect(()=>{
        if(!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['Origin', 'Destination'], {
            edgePadding: { top: 150, right: 150, bottom: 150, left: 150 },
        });
    }, [origin, destination])

    //Correct//



    React.useEffect(() => {
        getLocationPermission();
        getFeatureLocations()
        socket.on("locationAdded",(data)=>{
            console.log(data)
            const newLocations = featureLocations || [];
            const newData = {
                lat: data.lat,
                lng: data.lng,
                feature: data.feature
            }
            newLocations.push(newData); //rwact useState not working
            console.log(newLocations)
            setFeatureLocations(newLocations);
        })
        socket.on("clearLocations",()=>{
           setFeatureLocations([]);
        })
        
        // return () => {
        //     socket.off("locationAdded");
        //     socket.off("clearLocations");
        // }
    }, []);

    useEffect(() => {
        console.log("location",featureLocations);
    }, [featureLocations]);

    async function getFeatureLocations(){
        const response = await axios.get(`${API_URL}/location`);
       
        setFeatureLocations(response.data);

    }

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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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

        {featureLocations.map((location,index) => {
            console.log('====================================');
            console.log(location.feature);
            const feature = location.feature
            let image=""
            if(feature === "Accident"){
                image = mapImages.Accident
            }
            else if(feature === "Police"){
                image = mapImages.Police
            }
            console.log('====================================');
            return (
                <Marker
                image={image}
                    identifier={location.feature}

                    key={index}
                    coordinate={{
                        latitude:parseFloat(location.lat),
                        longitude:parseFloat(location.lng),
                    }}
                    title={location.feature}
                   
                />
            )
        })}


        

        
    </MapView>
    

  );
  
};


export default Maps;
