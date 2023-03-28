import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@env'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'
import tw from 'tailwind-react-native-classnames';

const SeperatorStyle = {
    height: 1,
    backgroundColor: '#d1d1d1',
    width: '80%',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 7
  }
  
  const Seperator = () => <View style={SeperatorStyle} />

const JourneyHistory = () => {
    const [journeys,setJourneys] = useState([])
    useEffect(()=>{
        const getJourneys = async()=>{
            const userJson = await AsyncStorage.getItem('user')
            let user = null
            if(userJson){
                user = JSON.parse(userJson)
            }
            const response = await axios.get(API_URL+"/originDestination",{
                params:{
                    userId:user.id
                }
            })
            setJourneys(response.data)
        }
        getJourneys()

    },[])
  return (
    <View style={styles.container}>
        <View style={tw`mt-12`}>
        <Text style={tw`text-2xl font-semibold shadow-2xl`}>Journey History</Text>

        </View>
        <Seperator/>
        <FlatList
        data={journeys}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
        <View style={tw`mt-4  bg-gray-200 pt-2 pl-4 pr-4 pb-4 w-80 rounded-2xl shadow-sm items-center`}>
          <Text style={tw`text-base font-semibold mt-2`}>Started Time</Text>
          <Text>{item.timestamp}</Text>
          <Text style={tw`text-base font-semibold mt-2`}>Origin</Text>
          <Text>{item.origin}</Text>
          <Text style={tw`text-base font-semibold mt-2`}>Destination</Text>
          <Text>{item.destination}</Text>

        </View>

        )}
        />


    </View>
  )
}

export default JourneyHistory

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight || 30,
        backgroundColor:'white',
        textAlign:'center',
        alignItems:'center',
        paddingBottom:20
    }
})