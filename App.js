import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import RiderScreen from './screens/RiderScreen';
import ViewMap from './screens/ViewMap';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Account from './screens/Account';
import JourneyHistory from './screens/JourneyHistory';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
// import {Icons} from 'react-native-ico-material-design';
import tw from 'tailwind-react-native-classnames';




export default function App() {
  const Stack = createNativeStackNavigator();
  //Screen names
const homeName = "Home";
const ViewMap1 = "Map";
const Account1 = "Account";
const JourneyHistory1 = "JourneyHistory"

const Tab = createBottomTabNavigator();
const [initialRoute, setInitialRoute] = useState('Login')
  useEffect(()=>{
    const init = async()=>{
      await AsyncStorage.getItem('user').then((user)=>{
        if(user){
          setInitialRoute('Main')
          console.log('User is logged in');
        }
      })
    }

    init()


  },[])

  const TabNavigation = () => {
    return (
      <View style={styles.container}>

      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#e8e8e8',
            flexDirection: 'row',
            width: '90%',
            borderRadius: 25,
            // marginTop:10,
            marginBottom:20,
            paddingLeft:50,
            paddingRight:50
        },
        tabBarShowLabel: false,
        
        
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? '#EF5350': 'grey';
              size = focused ? 30 : 25;
              
            } else if (rn === ViewMap1) {
              iconName = focused ? 'map' : 'map-outline';
              color = focused ? '#EF5350': 'grey';
              size = focused ? 30 : 25;

            } else if (rn === JourneyHistory1) {
              iconName = focused ? 'car-sport' : 'car-sport-outline';
              color = focused ? '#EF5350': 'grey';
              size = focused ? 33 : 28;


            } else if (rn === Account1) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              color = focused ? '#EF5350': 'grey';
              size = focused ? 35 : 30;

            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color}
            style={tw`p-2`}
            />;
          },
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={ViewMap1} component={ViewMap} />
        <Tab.Screen name={JourneyHistory1} component={JourneyHistory}/>
        <Tab.Screen name={Account1} component={Account} />


      </Tab.Navigator>
      </View>

    )
  }
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName={initialRoute} >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            /> */}
            <Stack.Screen
              name="Main"
              component={TabNavigation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RiderScreen"
              component={RiderScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ViewMap"
              component={ViewMap}
              // options={{ headerShown: false }}
            />
             <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="JourneyHistory"
              component={JourneyHistory}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
