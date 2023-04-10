import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { selectOrigin, selectDestination, toggleStartClicked } from '../slices/navSlice'
import axios from 'axios';
import { API_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDistanceDuration } from '../util/location';
import { useState } from 'react';







  

const StartJourney = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [user,setUser] = React.useState(null);
  const [distance,setDistance] = useState("")
  const [duration,setDuration] = useState("")
 const dispatch = useDispatch();

  console.log(origin);

  useEffect(() => {
    const init = async()=>{
      const userJson = await AsyncStorage.getItem('user');
      let user = null;
      if(userJson){
        user = JSON.parse(userJson);
        setUser(user);
      }
      
    }

    init()

   
  }, []);

  useEffect(() => {
    const init = async()=>{
      const data = await getDistanceDuration(origin.location,destination.location)
      setDistance(data.distance)
      setDuration(data.duration)

    }
    if(origin && destination)
    init()
  

  }, [origin,destination])
  


  const SeperatorStyle = {
    height: 1,
    backgroundColor: '#e2e2e2',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 5
  }
  
  const Seperator = () => <View style={SeperatorStyle} />
  
  
  

  return (
    <View style={styles.container}>
<View style={styles.boxContain}>
       <View style={styles.boxA}>
        <View style={tw` my-auto mx-auto`}>
            <Image source={require('../assets/originDestination.png')} style={tw`h-14 w-14 shadow-2xl`} />            
            </View>
          </View>
          <View style={styles.boxB}>
            <View style={tw` my-auto`}>
              <Text style={tw`font-semibold `}>{origin?.description}</Text> 
              <Seperator/>
              <Text style={tw`font-semibold`}>{destination?.description}</Text>            
           
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
              <Text>{distance}</Text>            
            </View>
          </View>
          <View style={styles.box1}>
          <View style={tw` my-auto mx-auto pt-4 h-12 items-center `}>
          <TouchableOpacity
        onPress={() => {navigation.navigate('Features');

        dispatch(toggleStartClicked())
      axios.post(API_URL+"/originDestination",{
        origin: origin?.description,
        destination: destination?.description,
        userId: user?.id
      })
      }}
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
              <Text>{duration}</Text>    
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
   boxA: {
    width: '30%',
    height: '30%',
    backgroundColor: 'white',
 },
 boxB: {
  width: '70%',
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
