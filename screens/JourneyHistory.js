import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '@env'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native'

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
        <FlatList
        data={journeys}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
            <View>
          <Text>Origin:{item.origin}</Text>
          <Text>Destination:{item.destination}</Text>
          <Text>Time:{item.timestamp}</Text>
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
        marginTop: StatusBar.currentHeight || 20
    }
})