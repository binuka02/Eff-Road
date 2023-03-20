import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { setOrigin } from '../slices/navSlice'
import { useDispatch } from "react-redux";
import { selectOrigin, selectDestination } from '../slices/navSlice'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Features = () => {



  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center py-2 text-xl font-semibold mt-0`}>Hi, Binuka Silva!👋</Text>
        {/* <Text>{destination(0)}</Text> */}
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete
              placeholder="Tell me where from"
              styles={{
                container:{
                    flex:0,
                    marginLeft:10,
                    marginRight:10,
                    marginTop:15,
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
        
        </View>
    </SafeAreaView>
  )
}


export default Features

const BoxStyle = StyleSheet.create({
    container: {
      paddingTop: 10,
      backgroundColor: 'white',
      paddingTop: 20,
      flex: 0,
    },
    textInput: {
      backgroundColor: '#ebebeb',
      borderRadius: 0,
      fontSize: 18,
    },
    textInputContainer: {
      paddingHorizontal: 20,
      paddingBottom: 0,
    },
  })


  const ButtonStyle = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 20,
      width: 130,
      height: 40,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#090A2E',
      opacity: 0.95,
      backgroundColor: '#090A2E'
    },
    text: {
      fontSize: 17,
      color: 'white',
      fontWeight: 'bold',
    },
  });