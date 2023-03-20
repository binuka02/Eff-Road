import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// const Account = () => {
  
// }

export default function Account({navigation}){
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text
      onPress={() => navigation.navigate('Account')}
      style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, marginTop: 10}}
      >Account</Text>
    </View>
  )
}

