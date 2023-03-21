import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Maps from '../components/Maps';
import {createStackNavigator} from '@react-navigation/stack';
import Direction from '../components/Direction';
import Start from '../components/StartJourney';
import Features from '../components/Features';

const RiderScreen = () => {

    const Stack = createStackNavigator();
  return (
 
    <View>
        <View style={tw`h-2/3`}>
            <Maps/>
        </View>
        <View style={tw`h-1/3`}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Direction"
                    component={Direction}
                    options={{ 
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Start"
                    component={Start}
                    options={{ 
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="Features"
                    component={Features}
                    options={{ 
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </View>
        
    </View>

    
  );
};

export default RiderScreen;

const styles = StyleSheet.create({});