import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { getNearbyPlace } from '../util/location';

const Emergency = ({route}) => {
    const navigation = useNavigation();

    const nearHospitals = () => {
      const url = `https://www.google.com/maps/search/hospital/@${route.params.origin.latitude},${route.params.origin.longitude},13z?hl=en`;
      Linking.openURL(url);

    };

    const nearGarages= () => {
      const url = `https://www.google.com/maps/search/garage/@${route.params.origin.latitude},${route.params.origin.longitude},13z?hl=en`;
      Linking.openURL(url);

    };

    const [nearbyHospital,setNearbyHospital] = useState(null)
    const [nearbyGarage,setNearbyGarage] = useState(null)

    useEffect(()=>{
      console.log(route.params)
      const init = async()=>{
        const data = await getNearbyPlace("hospital",route.params.origin)
        setNearbyHospital(data)
        const dataPolice = await getNearbyPlace("garage",route.params.origin)
        setNearbyGarage(dataPolice)

      }

      init();
    },[])

  return (
    <View style={styles.container}>
                <Text style={tw`mt-10 font-bold text-xl`}>Nearest</Text>

        <View style={styles.boxContain}>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>
                    <Text style={tw`font-semibold text-lg`}>Hospital</Text> 
                </View>
            </View>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>
                <Text style={tw`font-semibold text-lg`}>Garage</Text> 

                </View>
            </View>
            <View style={styles.box2}>
                <View style={tw` my-auto mx-auto items-center`}>
                  <Text style={tw`text-sm`}>{nearbyHospital?.place}</Text>
                  <Text>{"\n"}Tel: {nearbyHospital?.phNo}</Text>                    
                </View>
            </View>
            <View style={styles.box2}>
                <View style={tw` my-auto mx-auto items-center`}>
                <Text>{nearbyGarage?.place}</Text>
                    {!nearbyGarage?.place && <Text>No any nearby Garages..</Text>}
                    <Text>{"\n"}Tel: {nearbyGarage?.phNo}</Text>                
                  </View>
            </View>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>

                    <TouchableOpacity
                    onPress={nearHospitals}
                    style={tw`my-auto mx-auto items-center`}

                    >
                      <Text style={tw`text-red-400 text-xs font-semibold`}>View More </Text>
                      {/* <Text style={tw`text-red-400 text-xs font-semibold`}>Hospitals</Text> */}

                    </TouchableOpacity>
                   
                </View>
            </View>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>

                <TouchableOpacity
                    onPress={nearGarages}
                    style={tw`my-auto mx-auto items-center`}
                    >
                      <Text style={tw`text-red-400 text-xs font-semibold`}>View More </Text>
                      {/* <Text style={tw`text-red-400 text-xs font-semibold`}>Garages</Text> */}

                    </TouchableOpacity>    
                    
                </View>
            </View>
        </View>
        <TouchableOpacity
        style={tw`absolute bottom-8 left-4 `}
        onPress={() => navigation.navigate('Features')}
        >
            <Text style={tw` font-semibold text-sm absolute text-gray-700`}>Back</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Emergency

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
      marginTop:30,
       width: '80%',
       height: '80%',
       backgroundColor: 'white',
       flexDirection: 'row',
       flexWrap: 'wrap',
    },

    box: {
      width: '50%',
      height: '15%',
      backgroundColor: 'white',
   },

   box2: {
    width: '50%',
    height: '40%',
    backgroundColor: 'white',
 },
  
   inner:{
     flex:1,
     backgroundColor: 'white',
     justifyContent: 'center', 
     alignItems: 'center', 
   } ,


   camera:{
    flex:1,
    width:'80%',
    height:'80%',
    justifyContent:'flex-end',
    alignItems:'center',
    
   },

   text:{
        color:'white'

   }
  

  
  
   });






