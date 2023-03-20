
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React, {useLayoutEffect} from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";
// import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {

    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`flex-row px-6 mt-10 items-center`}>
                <View style={tw`w-16 h-16 bg-black rounded-full items-center justify-center`}>
                    <Text style={tw`text-blue-300 text-4xl font-semibold`}>Eff</Text>
                </View>
                
                    <Text style={tw`text-black text-3xl font-semibold`}>Road</Text>
                
            </View>

            <View style={tw`px-6 mt-6`}>
                <Text style={tw`text-4xl`}>Enjoy your journey with</Text>
                <Text style={tw`text-blue-400 text-3xl font-bold`}>Good Moments</Text>
                {/* <Text style={tw`text-lg mt-5 font-bold`}>Welcome</Text> */}
                <Text>The smarter way to navigate. Our app offers real-time updates, turn-by-turn directions, and a range of features to help you get to your destination with ease. With our customizable map views, voice-activated commands, and hands-free operation, you can focus on the road ahead and leave the rest to us.</Text>
            </View>

            <View>
            <GooglePlacesAutocomplete
                    placeholder="Tell me where to go"
                    styles={{
                        container:{
                            flex:0,
                            marginLeft:13,
                            marginTop:15,
                        },
                        textInput:{
                            fontSize:18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        // console.log(data);
                        dispatch(
                            setDestination({
                                location: details.geometry.location,
                                description: data.description,       
                            })
                        );
                        dispatch(setOrigin(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400} //IMAGINE THE TYPING ONLY AFTER STOP TYPING FOR 400MS
                />
            </View>

            <View style={tw` w-72 h-72 bg-blue-300 rounded-full absolute top-1/2 -right-36`}></View>
            <View style={tw`w-72 h-72 bg-red-300 rounded-full absolute top-3/4 -left-28`}></View>

            <View style={tw` relative items-center justify-center top-16`}>
                <Image
                // animation="fadeIn"
                // easing="ease-out"
                    source={require("./jeep.png")}
                    style={tw`w-80 h-80`}
                />
                {/* <View style={tw`absolute top-48 w-24 h-24 border-l-2 border-r-2 border-t-4 border-blue-300 rounded-full items-center justify-center`}>
                    <TouchableOpacity>
                        <View style={tw`w-20 h-20 items-center justify-center rounded-full bg-blue-300`}>
                            <Text style={tw`text-gray-50 text-4xl font-semibold`}>Go</Text>
                        </View>
                    </TouchableOpacity>

                </View> */}
            </View>
            <NavOptions/>
            
            {/* <View style={tw`p-5`}>
                <Image style={{
                    width:120,
                    height:120,
                    resizeMode:"contain",
                }}
                    source={{
                        uri:"https://iili.io/H1tNIwv.jpg",
                    }}
                />
                <GooglePlacesAutocomplete
                    placeholder="Where To?"
                    styles={{
                        container:{
                            flex:0,
                        },
                        textInput:{
                            fontSize:18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        // console.log(data);
                        dispatch(
                            setDestination({
                                location: details.geometry.location,
                                description: data.description,       
                            })
                        );
                        dispatch(setOrigin(null));
                    }}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en",
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400} //IMAGINE THE TYPING ONLY AFTER STOP TYPING FOR 400MS
                />
                <NavOptions/>
            </View> */}
        </SafeAreaView>
    );
};

export default HomeScreen;




//color code : #090A2E