import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';


const StartJourney = () => {
  const navigation = useNavigation();

  return (
    <View>
<View style={styles.boxContain}>
       <View style={styles.box}>
            <View style={styles.inner}>
            <Image source={require('./location.png')} style={styles.image} />            
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
              <Text>Nugegoda, Sri Lanka</Text>            
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
            <Image source={require('./location.png')} style={styles.image} />            
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
              <Text>Colombo, Sri Lanka</Text>            
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
            <Image source={require('./distance.png')} style={styles.image} />            
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.inner}>
            <Image source={require('./duration.png')} style={styles.image} />            

            </View>
          </View>
          <View style={styles.box}>
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
          </View>
          
        </View>


        <View style={styles.btnContain}>
        <TouchableOpacity
        onPress={() => navigation.navigate('Features')}
        >

          <View style={tw`w-20 h-20 items-center justify-center rounded-full bg-black shadow-2xl`}>
              <Text style={tw`text-gray-50 text-2xl font-semibold `}>Let's Start</Text>                
          </View>
          </TouchableOpacity>

        </View>

        </View>


  )
}

export default StartJourney



  const styles = StyleSheet.create({
    boxContain: {
       width: '100%',
       height: '60%',
       backgroundColor: 'white',
       flexDirection: 'row',
       flexWrap: 'wrap',
    },
    box1: {
       width: '50%',
       height: '50%',
       backgroundColor: 'white',
       padding: 10,
       
    },
    box: {
      width: '50%',
      height: '25%',
      backgroundColor: 'white',
      padding: 10,
      marginTop: 10,
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
      fontSize: 20,
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
