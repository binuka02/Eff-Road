import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import RiderScreen from './screens/RiderScreen';
import ViewMap from './screens/ViewMap';
import Login from './screens/Login';
import Signup from './screens/Signup';
import store from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
// import {createStackNavigator} from 'react-navigation-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Account from './screens/Account';




export default function App() {
  const Stack = createNativeStackNavigator();
  //Screen names
const homeName = "Home";
const ViewMap1 = "Map";
const Account1 = "Account";

const Tab = createBottomTabNavigator();

  const TabNavigation = () => {
    return (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#18181a',
            position: 'absolute',
            paddingBottom: 5,
            paddingTop: 5,
        },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === ViewMap1) {
              iconName = focused ? 'map' : 'map-outline';

            } else if (rn === Account1) {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={ViewMap1} component={ViewMap} />
        <Tab.Screen name={Account1} component={Account} />

      </Tab.Navigator>
    )
  }
    return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
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
            {/* <Stack.Screen
              name="ViewMap"
              component={ViewMap}
              options={{ headerShown: false }}
            /> */}
             <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
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
