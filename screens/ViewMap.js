import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import * as Location from 'expo-location';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { selectDestination, selectOrigin,setOrigin } from '../slices/navSlice';
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

const ViewMap = () => {
    const destination = useSelector(selectDestination);
    const origin = useSelector(selectOrigin);
    const mapRef = useRef(null);
    const originRef = useRef(null);

    const [featureLocations,setFeatureLocations] = useState(null);

    // useEffect(()=>{
    //     if(!origin || !destination) return;

    //     mapRef.current.fitToSuppliedMarkers(['Origin', 'Destination'], {
    //         edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    //     });
    // }, [origin, destination])

    //Correct//

    useEffect(()=>{
        console.log('====================================');
        console.log(featureLocations);
        console.log('====================================');
    },[featureLocations])

    const getCurrentLocation = async()=>{
        setFeatureLocations([])
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if(granted){
            const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
            setCurrentLocation({
              latitude,
              longitude,
            })
        }
    }



    React.useLayoutEffect(() => {
        getLocationPermission();
        getCurrentLocation()
        getFeatureLocations()
        

    }, []);

    React.useLayoutEffect(() => {
        socket.on("clearLocation",({id})=>{
        console.log(id);
        const locations = featureLocations.filter((location)=>{
            console.log("location id",location.id===id);
            return location.id !== id
        });
        // console.log("newLocations after delete",locations);
        setFeatureLocations(locations);
        })

       

        
        return () => {
            socket.off("clearLocation");
        }
    }, [featureLocations]);

    useEffect(() => {
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
        setFeatureLocations([...newLocations]);
    })

    return ()=>{
       socket.off("locationAdded")
    }
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

    const [currentLocation, setCurrentLocation] = useState(null);

//     useEffect(() => {
  
//         const unsubscribe =  setInterval(() => {
//             (async () => {
              
//               let { status } = await Location.requestForegroundPermissionsAsync();
//               if (status == 'granted') {
//                 console.log('Permission granted');
//               }
//               else{
//                 console.log('Permission denied');
//               }
        
//               const currentLocation = await Location.getCurrentPositionAsync({});
//               setCurrentLocation({
//                 ...origin,
//                 lat: currentLocation.coords.latitude,
//                 lng: currentLocation.coords.longitude,
//               });

        
    
//               setOrigin({...origin,location:{
//                   lat: currentLocation.coords.latitude,
//                   lng: currentLocation.coords.longitude
//                 }});
//                 originRef.current?.animateMarkerToCoordinate({
//                     latitude: currentLocation.coords.latitude,
//                     longitude: currentLocation.coords.longitude,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 },7000);
//                 // originRef.current?.redraw();
//             })();
            
//         }, 10000);
//         console.log(originRef.current);
//     return () => clearInterval(unsubscribe);    
// }, [originRef]);


return (
    <View style={tw`flex-1 bg-white`}>

<View style={tw`mt-12 items-center justify-center`}>
        <Text style={tw`text-xl font-semibold shadow-2xl`}>Map View</Text>
        <Text style={tw`text-xs text-gray-500 mt-4 text-center`}>Here is the map which is showing the dropped pins by other EffRoad users to report traffic related incidents like 'Accidents', 'Road Closures', 'Traffics', 'Roadside Helps' & 'Police Inspectors'. You can also contribute to this when you using our navigation map..</Text>
        </View>

{/* <Seperator/> */}
    {!currentLocation && <ActivityIndicator
    size={50}
    color="#EF5350"
    style={
      {
        flex:1,
        backgroundColor: 'white',
      }
    }
    />}
    {currentLocation &&
      ( 

        
      <MapView
    ref={mapRef}
        style={tw`flex-1 mt-8 mb-8`}
        mapType="mutedStandard"
        initialRegion={{
            // latitude: 6.8625,
            // longitude: 79.8855,
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    >
       

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
      )
    }
    
    </View>

  );
  
};


export default ViewMap;
