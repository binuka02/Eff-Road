import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import RiderScreen from "../screens/RiderScreen";
import { useSelector } from 'react-redux';
import { selectDestination } from '../slices/navSlice';

const pages = [
    {
        id: "123",
        title: "Ride",
        screen: "RiderScreen",
    },

];

// const pages2 = [

//     {
//         id: "456",
//         title: "ViewMap",
//         image: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
//         screen: "ViewMap",
//     },
//     {
//         id: "789",
//         title: "Account",
//         image: "https://cdn-icons-png.flaticon.com/512/61/61205.png",
//         screen: "Account",
//     },
// ];



const NavOptions = () => {
    const navigation = useNavigation();
    const destination = useSelector(selectDestination);


    return(
       
        // <View style={tw`z-50 relative mx-auto bottom-4 w-20 h-20 border-l-2 border-r-2 border-t-4 border-black rounded-full items-center justify-center mt-8`}>
        
                    <TouchableOpacity 
                    
                    onPress={() => navigation.navigate("RiderScreen")}
                    // style={tw`p-2  pb-12 pt-4 bg-gray-200 m-2 w-48 rounded-lg`}
                    style={tw`items-center `}
                    disabled={!destination}
                    >    
                    
                        {/* <View style={tw`${!destination && "opacity-20"}`}> */}
                        <View style={tw` w-16 h-16 items-center justify-center rounded-full bg-gray-700 shadow-2xl mt-8`}>
                            <Text style={tw`text-gray-200 text-3xl font-semibold shadow-2xl`}>Go</Text>                
                        </View>
                    </TouchableOpacity>
                
    
        // </View>
    );
};

export default NavOptions;