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
const destinationImage = require('../assets/destination.png');
const originImage = require('../assets/origin.png');

const mapImages ={
    Police : require('../assets/featureImages/police.png'),
    Emergency : require('../assets/featureImages/emergency.png'),
    Accident : require('../assets/featureImages/accident.png'),
    RoadClosure : require('../assets/featureImages/road-closure.png'),
    Traffic : require('../assets/featureImages/traffic.png'),
    RoadsideHelp : require('../assets/featureImages/roadside-help.png'),
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
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [origin, destination])

    //Correct//



    React.useLayoutEffect(() => {
        getLocationPermission();
        getFeatureLocations()
        socket.on("locationAdded",(data)=>{
            console.log(data)
            console.log("socket new data feature locations",featureLocations);
            const newLocations = featureLocations || [];
            const newData = {
                id: data.id,
                lat: data.lat,
                lng: data.lng,
                feature: data.feature
            }
            newLocations.push(newData); //rwact useState not working
            console.log("socket new locations",newLocations)
            setFeatureLocations([]);
            setFeatureLocations([...newLocations]);
        })
        socket.on("clearLocations",({id})=>{
        //    setFeatureLocations([]);
        // console.log(id);
        // const locations = featureLocations.filter((location)=>{
        //     console.log("location id",location.id===id);
        //     return location.id !== id
        // });
        // // console.log("newLocations after delete",locations);
        // setFeatureLocations(locations);
        // })
        getFeatureLocations();
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
       setFeatureLocations([])
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
                location={origin.location}
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
            >
            <Image source={destinationImage} style={{height: 50, width: 50}}/>
            </Marker>
        )}

        

        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="Origin"
            >
                <Image source={originImage} style={{height: 50, width: 50}}/>
            </Marker>
        )}

        {featureLocations.map((location,index) => {
            const feature = location.feature
            let image=""
            if(feature === "Accident"){
                image = mapImages.Accident
            }
            else if(feature === "Police"){
                image = mapImages.Police
            }
            else if(feature === "Emergency"){
                image = mapImages.Emergency
            }
            else if(feature === "RoadsideHelp"){
                image = mapImages.RoadsideHelp
            }
            else if(feature === "RoadClosure"){
                image = mapImages.RoadClosure
            }
            else if(feature === "Traffic"){
                image = mapImages.Traffic
            }
            return (
                <Marker
                    identifier={location.feature}
                    key={index}
                    coordinate={{
                        latitude:parseFloat(location.lat),
                        longitude:parseFloat(location.lng),
                    }}
                    title={location.feature}>
                    <Image source={image} style={{width: 40, height: 40}}/>
                    </Marker>
                    
                
            )
        })}


        

        
    </MapView>
    

  );
  
};


export default Maps;
