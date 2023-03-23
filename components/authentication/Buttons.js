import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function Buttons({btnlbl, bgcolor, txtcolor,press}){
  return (
    <TouchableOpacity
    onPress={press}
        style={{
            backgroundColor: bgcolor,
            borderRadius: 50,
            alignItems: 'center',
            width: 280,
            paddingVertical: 10,
            height: 50,
            marginTop: 7,
        }}>
        <Text style={{color: txtcolor, fontSize: 20, fontWeight:'bold'}}>{btnlbl}</Text>
    </TouchableOpacity>
  )
    }



const styles = StyleSheet.create({})