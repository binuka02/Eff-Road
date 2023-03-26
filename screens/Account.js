import { StyleSheet, Text, View,  SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';


// const Account = () => {
  
// }

const SeperatorStyle = {
  height: 2,
  backgroundColor: '#e2e2e2',
  width: '80%',
  alignSelf: 'center',
  marginBottom: 50
}

const Seperator = () => <View style={SeperatorStyle} />

export default function Account({navigation}){

  const logout = async()=>{
    await AsyncStorage.clear()
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={{flex:1,  backgroundColor:'white'}}>
  


    <View style={styles.boxContain}>
       <View style={styles.box1}>
        <View style={tw` my-auto mx-auto`}>
            <Image source={require('../assets/profileicon.png')} style={tw`h-24 w-24 shadow-2xl`} />            
            </View>

          </View>
          <View style={styles.box2}>
        <View style={tw` my-auto mx-auto`}>
            
              <Text style={tw`text-2xl font-semibold`}>Binuka Silva</Text>
            <TouchableOpacity
            onPress={logout}
            >
              <Text style={tw`text-sm text-gray-500`}>Signout</Text>
            </TouchableOpacity>
          </View>
          </View>  
    
    </View>

    <Seperator />

    <View style={tw` flex-1`}>
      <View style={tw`absolute ml-8`}>
        <Text style={tw`text-lg font-semibold `}>First Name</Text>
        <Text style={tw`text-sm  text-gray-500`}>Binuka</Text>
      </View>
      <View style={tw`absolute ml-8`}>
        <Text style={tw`text-lg font-semibold `}>First Name</Text>
        <Text style={tw`text-sm  text-red-500`}>Binuka</Text>
      </View>
    </View>
   

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
  boxContain: {
     width: '80%',
     height: '10%',
     backgroundColor: 'white',
     flexDirection: 'row',
     marginTop: 100,
     alignSelf: 'center',
  },

  box1: {
    width: '30%',
    height: '30%',
    backgroundColor: 'white',
 },
 box2: {
  width: '70%',
  height: '30%',
  backgroundColor: 'white',
},


 });