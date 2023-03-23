import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Field = (nv) => {
  return (
    <TextInput
    {...nv}
    style={{borderRadius: 100, color: '#3b3b3b', paddingHorizontal: 10, width: '78%', height:40 ,backgroundColor: 'rgb(220,220, 220)', marginVertical: 10, paddingLeft:20, fontSize: 14, }}
    placeholderTextColor='#7a7a7a'>
    </TextInput>
);  
};

export default Field

const styles = StyleSheet.create({})