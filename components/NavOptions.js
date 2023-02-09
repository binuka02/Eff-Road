import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import RiderScreen from "../screens/RiderScreen";


const pages = [
    {
        id: "123",
        title: "Rider",
        image: "https://links.papareact.com/3pn",
        screen: "RiderScreen",
    },
    {
        id: "456",
        title: "Passenger",
        image: "https://links.papareact.com/28w",
        screen: "PassengerScreen",
    },
];



const NavOptions = () => {
    const navigation = useNavigation();

    return(
        <FlatList
            data={pages}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
                <TouchableOpacity 
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                    <View>
                        <Image
                            source={{uri: item.image}}
                            style={{width:120, height:120, resizeMode:"contain"}}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                            name="arrowright" 
                            color="white" 
                            type="antdesign"
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}/>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default NavOptions;