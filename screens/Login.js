import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import LandingBackground from '../components/authentication/LandingBackground'
import Buttons from '../components/authentication/Buttons';
import Field from '../components/authentication/Field';
import axios from 'axios'
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (nv) => {

  const [state,setState] = React.useState({
email: "",
password: ""
  })

  const loginUser = async () => {
    try {
      const response = await axios.post(API_URL+"/auth/login",{
        email: state.email,
        password: state.password
      })


      console.log(response.data);
      const user = response.data
      AsyncStorage.setItem('user', JSON.stringify(user))
      nv.navigation.navigate("HomeScreen")
    } catch (error) {
      console.log(error);
      
    }


  }
  return (
    <LandingBackground>
    <View style={{alignItems: 'center', width: 460}}>
      <Text
        style={{
          color: '#090A2E',
          fontSize: 44,
          fontWeight: 'bold',
          marginVertical: 20,
        }}>
        Login
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          height: 700,
          width: 320,
          borderTopLeftRadius: 130,
          paddingTop: 100,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 40, color:'#090A2E', fontWeight: 'bold'}}>
          Welcome Back
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Login to your account
        </Text>
        <Field placeholder="Email" value={state.email} onChangeText={(value)=>{
          setState({...state, email: value})
        }}/>
        <Field placeholder="Password" secureTextEntry={true} value={state.password} onChangeText={(value)=>{
          setState({...state, password: value})
        }} />
        <View
          style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 200}}>
          <Text style={{color: '#090A2E', fontWeight: 'bold', fontSize: 16}}>
            Forgot Password ?
          </Text>
        </View>
        <Buttons textColor='white' bgColor='#090A2E' btnlbl="Login" press={() => loginUser()} />
        <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => nv.navigation.navigate("Signup")}>
          <Text style={{ color: '#090A2E', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </LandingBackground>
);
};


export default Login

const styles = StyleSheet.create({})