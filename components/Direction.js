import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setOrigin } from '../slices/navSlice'
import { useDispatch } from "react-redux";
import { selectOrigin, selectDestination } from '../slices/navSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { getAddress } from '../util/location'
import * as Location from 'expo-location';
import { KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SeperatorStyle = {
  height: 1,
  backgroundColor: '#e2e2e2',
  width: '90%',
  alignSelf: 'center',
  marginBottom: 20
}

const Seperator = () => <View style={SeperatorStyle} />

const Direction = () => {

  const [currentLocation, setCurrentLocation] = React.useState('');
  const ref = useRef(null);
  const [user,setUser] = React.useState(null);

  useEffect(() => {
    const init = async()=>{
      const userJson = await AsyncStorage.getItem('user');
      let user = null;
      if(userJson){
        user = JSON.parse(userJson);
        setUser(user);
      }
    }

    init()
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
    const data = await getAddress(
      current.latitude,
      current.longitude
    )

    dispatch(setOrigin({
          location: {
            lat: current.latitude,
            lng: current.longitude,
          },
          description:data
        }));

    

    navigation.navigate('Start')
    // getAddress(g
    //   current.latitude,
    //   current.longitude
    // ).then((data) => {
    //   setCurrentLocation(data);
    //   console.log(data);
    //   ref.current?.setAddressText(data);
    //   dispatch(setOrigin({
    //     location: {
    //       lat: current.latitude,
    //       lng: current.longitude,
    //     },
    //     description: data.description,
    //   }));
      
    //   navigation.navigate('Start')
    // });
    // origin.latitude = current.latitude;
    // origin.longitude = current.longitude;
}

  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1 rounded-2xl`}>
      <KeyboardAvoidingView>
        {user && <Text style={tw`text-center py-2 text-xl font-semibold mt-0`}>Hi, {user.firstName +" " +user.lastName}!👋</Text>}
        {/* <Text>{destination(0)}</Text> */}
        <Seperator/>
          
          <View>
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder="Tell me where from"
              styles={{
                container:{
                    flex:0,
                    marginLeft:10,
                    marginRight:10,
                    
                },
                textInput:{
                    fontSize:18,
                    textAlign:'center',
                },
                
            }}
              fetchDetails={true}
              returnKeyType={'search'}
              minLength={2}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en',
              }}
              location={origin}
              onPress={(data, details = null) => {
                dispatch(setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                }),
                
                navigation.navigate('Start')

                );
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
          {/* <View style={[ButtonStyle.container]}>
            <TouchableOpacity style={[tw`${!origin && "opacity-20"}`,ButtonStyle.button]}>
              <Text style={[ButtonStyle.text]}>Direction</Text>
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity
          onPress={getLocationPermission}
          >
            <Text style={tw`text-gray-400 font-semibold mx-auto text-sm`}>Current Location</Text>
          </TouchableOpacity>
        
        

        

        
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Direction


// const BoxStyle = StyleSheet.create({
//     container: {
//       paddingTop: 10,
//       backgroundColor: 'white',
//       paddingTop: 20,
//       flex: 0,
//     },
//     textInput: {
//       backgroundColor: '#ebebeb',
//       borderRadius: 0,
//       fontSize: 18,
//     },
//     textInputContainer: {
//       paddingHorizontal: 20,
//       paddingBottom: 0,
//     },
//   })


//   const ButtonStyle = StyleSheet.create({
//     container: {
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     button: {
//       marginTop: 20,
//       width: 130,
//       height: 40,
//       borderRadius: 15,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 2,
//       borderColor: '#090A2E',
//       opacity: 0.95,
//       backgroundColor: '#090A2E'
//     },
//     text: {
//       fontSize: 17,
//       color: 'white',
//       fontWeight: 'bold',
//     },
//   });

