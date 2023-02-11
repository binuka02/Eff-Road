import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { setDestination, setOrigin } from "../slices/navSlice";


const HomeScreen = () => {
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
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
                    placeholder="Where From?"
                    styles={{
                        container:{
                            flex:0,
                        },
                        textInput:{
                            fontSize:18,
                        },
                    }}
                    onPress={(data, details = null) => {
                        // console.log(data, details);
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,       
                            })
                        );
                        dispatch(setDestination(null));
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
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header:{
        fontWeight: "bold",
    }
});



//090A2E