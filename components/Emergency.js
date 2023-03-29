import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const Emergency = () => {
    const navigation = useNavigation();

    const nearHospitals = () => {
      const url = 'https://www.google.com/maps/search/hospital/@6.8692024,79.8845187,13z?hl=en';
      Linking.openURL(url);
    };

  return (
    <View style={styles.container}>
                <Text style={tw`mt-6 font-bold text-xl`}>Nearest</Text>

        <View style={styles.boxContain}>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>
                    <Text style={tw`font-semibold text-base`}>Hospital</Text> 
                    <Text style={tw` `}>ABC</Text> 
                    <TouchableOpacity
                    onPress={nearHospitals}
                    >
                      <Text style={tw`text-red-400 text-xs font-semibold`}>View More</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.box}>
                <View style={tw` my-auto mx-auto items-center`}>
                    <Text style={tw`font-semibold text-base`}>Garage</Text> 
                    <Text style={tw``}>XYZ</Text>        
                    <TouchableOpacity
                    
                    >
                      <Text style={tw`text-red-400 text-xs font-semibold`}>View More</Text>
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
       width: '80%',
       height: '80%',
       backgroundColor: 'white',
       flexDirection: 'row',
       flexWrap: 'wrap',
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
//    image:{
  
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     flexDirection: 'row',
//     justifyContent: 'flex-end'
//    },
  
   txt:{
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black',
   },
  
  
   });