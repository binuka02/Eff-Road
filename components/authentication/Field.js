import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Field = (nv) => {
  return (
    <TextInput
    {...nv}
    style={{borderRadius: 100, color: '#b3b3b3', paddingHorizontal: 10, width: '78%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
    placeholderTextColor='#b3b3b3'></TextInput>
);  
};

export default Field

const styles = StyleSheet.create({})