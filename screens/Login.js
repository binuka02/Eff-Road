import { StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import LandingBackground from '../components/authentication/LandingBackground'
import Buttons from '../components/authentication/Buttons';
import Field from '../components/authentication/Field';
import axios from 'axios'
import {API_URL} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';
// import Spinner from 'react-native-loading-spinner-overlay';

const Login = (nv) => {


  const [state,setState] = React.useState({
email: "",
password: ""
  });

  const [isLoading,setIsLoading] = useState(false)


  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const resetPassword = async()=>{
    if (state.email === "") {
      Alert.alert('Missing Fields!', 'Be sure to enter the email');
      return;
    }

    else if ( !validateEmail(state.email)){
      Alert.alert('Invalid Email!', 'Be sure entered email is correct');
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.post(API_URL+"/auth/reset-password",{
        email: state.email
      })
      Alert.alert('Success', 'Email has been sent');
      setIsLoading(false)
    }
    catch(error){
      Alert.alert('Error', error.response.data.error);
      console.log(error);
    }
  }
  

  const loginUser = async () => {

    if (state.email === "" || state.password === "") {
      Alert.alert('Missing Fields!', 'Be sure all fields are filled');
      return;
    }

    else if ( !validateEmail(state.email)){
      Alert.alert('Invalid Email!', 'Be sure entered email is correct');
      return;
    }

    try {
      setIsLoading(true)
      const response = await axios.post(API_URL+"/auth/login",{
        email: state.email,
        password: state.password
      })
      setIsLoading(false)


      console.log(response.data);
      const user = response.data
      await AsyncStorage.setItem('user', JSON.stringify(user))
      nv.navigation.navigate("Main")
    } catch (error) {
      console.log(error);
      Alert.alert('Incorrect Email or Password!', "The email & password entered doesn't match. Please try again.");
      return;
    }
    

  }
  return (
    <>
    
   
    <KeyboardAvoidingView
    behavior='position'
  
    style={{flex:1, backgroundColor:'white'}}
    >


    {<View
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          paddingTop: 50,
          alignItems: 'center',
        }}>

        <Image 
          source={require("../assets/login.jpg")}
          style={tw`w-72 h-72`}
        />
        {isLoading && <ActivityIndicator
    size={50}
    color="#EF5350"
    style={
      {
        backgroundColor: 'white'
      }
    }
    />}

        <Text style={{fontSize: 40, color:'#090A2E', fontWeight: 'bold', marginTop:40}}>
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

        <TouchableOpacity onPress={resetPassword}>
          <Text style={tw`text-red-400 font-semibold text-xs`}>Forgot Password?</Text>
        </TouchableOpacity>

        <View
          style={{alignItems: 'flex-end', width: '78%', paddingRight: 16}}>
          {/* <Text style={{color: '#090A2E', fontWeight: 'bold', fontSize: 16}}>
            Forgot Password ?
          </Text> */}
        </View>

        

        <TouchableOpacity
          style={tw`bg-red-500 text-white rounded-2xl py-2 px-36 shadow-2xl mt-16`}
          onPress={() => {
            loginUser();
          }}
          >
          <Text style={tw`text-white text-lg font-semibold`}>Login</Text>
        </TouchableOpacity>

        <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center", marginTop:20}}>
          <Text style={{ fontSize: 15, fontWeight:"bold" }}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => nv.navigation.navigate("Signup")}>
          <Text style={tw`text-red-500 font-semibold text-sm`}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>}
          </KeyboardAvoidingView>
          </>
);
};


export default Login

const styles = StyleSheet.create({})