import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import { selectOrigin, selectDestination } from '../slices/navSlice'






  

const StartJourney = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <View style={styles.container}>
<View style={styles.boxContain}>
       <View style={styles.box}>
        <View style={tw` my-auto mx-auto`}>
            <Image source={require('../assets/originDestination.png')} style={tw`h-12 w-12 shadow-2xl`} />            
            </View>
          </View>
          <View style={styles.box}>
            <View style={tw` my-auto`}>
              <Text style={tw`font-semibold `}>Colombo, Sri Lanka</Text> 
              <Text style={tw`font-semibold`}>Colombo, Sri Lanka</Text>            
           
            </View>
          </View>
          {/* <View style={styles.box}>
            <View style={styles.inner}>
            <Image source={require('../assets/pin.png')} style={tw`h-8 w-8 shadow-2xl`} />            
            </View>
          </View>
          <View style={styles.box}>
          <View style={tw` my-auto`}>
              <Text style={tw`font-semibold`}>Colombo, Sri Lanka</Text>            
            </View>
          </View> */}
          <View style={styles.box1}>
            <View style={tw`  mx-auto pt-4 h-12 items-center`}>
            <Image source={require('../assets/distance.png')} style={tw`h-14 w-14 shadow-2xl`} />
            <Text style={styles.txt}>Distance</Text>
              <Text>8.5 km</Text>            
            </View>
          </View>
          <View style={styles.box1}>
          <View style={tw` my-auto mx-auto pt-4 h-12 items-center `}>
          <TouchableOpacity
        onPress={() => navigation.navigate('Features')}
        >

          <View style={tw`w-20 h-20 items-center justify-center rounded-full bg-black shadow-2xl`}>
              <Text style={tw`text-gray-300 text-2xl font-semibold `}>Start</Text>                
          </View>
          </TouchableOpacity>    
            </View>
          </View>
          <View style={styles.box1}>
          <View style={tw` mx-auto pt-4 h-12 items-center`}>
            <Image source={require('../assets/duration.png')} style={tw`h-14 w-14 shadow-2xl`}/>            
            <Text style={styles.txt}>Duration</Text>
              <Text>15 min</Text>    
            </View>
          </View>
          {/* <View style={styles.box}>
            <View style={styles.inner}>
            <Text style={styles.txt}>Distance</Text>
              <Text>8.5 km</Text>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
            <Text style={styles.txt}>Duration</Text>
              <Text>15 min</Text>            
            </View>
          </View> */}
          
        </View>


        {/* <View style={styles.btnContain}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Features')}
        >

          <View style={tw`w-20 h-20 items-center justify-center rounded-full bg-black shadow-2xl`}>
              <Text style={tw`text-gray-50 text-2xl font-semibold `}>Let's Start</Text>                
          </View>
          </TouchableOpacity>

        </View> */}

        </View>


  )
}

export default StartJourney



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
      shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
  
  },
    boxContain: {
       width: '80%',
       height: '80%',
       backgroundColor: 'white',
       flexDirection: 'row',
       flexWrap: 'wrap',
    },
    box1: {
       width: '33.33%',
       height: '40%',
       backgroundColor: 'white',
       padding: 10,
       
    },
    box: {
      width: '50%',
      height: '30%',
      backgroundColor: 'white',
   },
  
   inner:{
     flex:1,
     backgroundColor: 'white',
     justifyContent: 'center', 
     alignItems: 'center', 
   } ,
   image:{
  
    width: 50,
    height: 50,
    resizeMode: 'contain',
    flexDirection: 'row',
    justifyContent: 'flex-end'
   },
  
   txt:{
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
   },
  
  btnContain: {
    width: '100%',
    height: '30%',
    marginTop: 40,
    marginBottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
   });
