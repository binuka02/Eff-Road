import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";

const HomeScreen = () => {
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