import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

const HomeScreen = () => {
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
        <Text style={[tw`text-red-500 p-10`,styles.header]}>HomeScreen</Text>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header:{
        fontWeight: "bold",
    }
});