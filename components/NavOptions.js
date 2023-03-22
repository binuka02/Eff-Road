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
       
        //     <FlatList
        //     data={pages}
        //     horizontal
        //     keyExtractor={(item) => item.id}
        //     renderItem={({item}) => (
        //         <TouchableOpacity 
        //         onPress={() => navigation.navigate(item.screen)}
        //         style={tw`p-2 pl-5 pb-12 pt-4 bg-gray-200 m-2 w-40 rounded-lg`}
        //         disabled={!destination}
        //         >    
        //             <View style={tw`${!destination && "opacity-20"}`}>
                    
        //                 <Image
        //                     source={{uri: item.image}}
        //                     style={{width:120, height:120, resizeMode:"contain"}}
        //                 />
        //                 <Text style={tw`mt-6 text-xl font-semibold text-center`}>{item.title}</Text>
                        
        //             </View>

                   
                
        //         </TouchableOpacity>
        //     )}
        
        // />
        <View style={tw` relative mx-auto bottom-12 w-24 h-24 border-l-2 border-r-2 border-t-4 border-blue-300 rounded-full items-center justify-center `}>
        
                    <TouchableOpacity 
                    
                    onPress={() => navigation.navigate("RiderScreen")}
                    // style={tw`p-2  pb-12 pt-4 bg-gray-200 m-2 w-48 rounded-lg`}
                    style={tw`items-center `}
                    // disabled={!destination}
                    >    
                    
                        {/* <View style={tw`${!destination && "opacity-20"}`}> */}
                        <View style={tw` w-20 h-20 items-center justify-center rounded-full bg-blue-200`}>
                            <Text style={tw`text-gray-50 text-4xl font-semibold`}>Go</Text>                
                        </View>
                    </TouchableOpacity>
                
            
            {/* <View>
            {
                pages2.map((item,index) => {
                    return(
                        <TouchableOpacity 
                        key={index}
                        onPress={() => navigation.navigate(item.screen)}
                        style={tw`p-2 pb-12 pt-10 bg-gray-200 m-2 w-36 h-36 rounded-lg `}
                    
                        >    
                            <View>
                            
                                <Image
                                    source={{uri: item.image}}
                                    style={{width:80, height:60, resizeMode:"contain",alignSelf:'center',justifyContent:"center"} }
                                />
                                
                            </View>

                        
                    
                        </TouchableOpacity>
                    )
                })
            }
            </View> */}
        </View>
    );
};

export default NavOptions;