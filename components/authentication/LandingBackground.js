import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import React from 'react'

const LandingBackground = ({children}) => {
  return (
    <View>
      <ImageBackground source={require("./snapedit_1679204004691.jpg")} style={{height:'100%'}}/>
        <View style={{position:"absolute"}}>
            {children}
        </View>
    </View>
  )
}

export default LandingBackground

const styles = StyleSheet.create({})