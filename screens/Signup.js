import React from 'react';
import {View, Text, Alert, Touchable, TouchableOpacity, Image,KeyboardAvoidingView} from 'react-native';
import LandingBackground from '../components/authentication/LandingBackground';
import Buttons from '../components/authentication/Buttons';
import Field from '../components/authentication/Field';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';


const Signup = props => {
  const [state,setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    confirmPassword: ""
      })

      const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
    
      const registerUser = async () => {
        if(state.password !== state.confirmPassword){
          Alert.alert('Passwords doest not match!', 'Make sure passwords are match ');
          return;
        }
        else if(state.firstName==="" || state.lastName=== "" || state.username==="" || state.email===""  || state.password === "" || state.confirmPassword === ""){
          Alert.alert('Missing Fields!', 'Be sure all fields are filled');
          return;
        }

        else if ( !validateEmail(state.email)){
          Alert.alert('Invalid Email!', 'Be sure entered email is correct');
          return;
        }

        try {
          const response = await axios.post(API_URL+"/auth/signup",{
            firstName: state.firstName,
            lastName: state.lastName,
            username: state.username,
            email: state.email,
            password: state.password
          })
    
    
          console.log(response.data);
          const user = response.data
          AsyncStorage.setItem('user', JSON.stringify(user))
          props.navigation.navigate("Main")
        } catch (error) {
          console.log(error);
          Alert.alert('Error!', "Oops, something went wrong. Please try again later.");
          return;
        }
    
    
      }
  return (
        
    <KeyboardAvoidingView
    behavior='position'
    >
        <View
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            paddingTop: 50,
            alignItems: 'center',
          }}>

        <Image 
          source={require("../assets/signup.jpg")}
          style={tw`w-72 h-44`}
        />

            <Text style={{fontSize: 40, color:'#090A2E', fontWeight: 'bold'}}>
          Welcome 
        </Text>
        <Text
          style={{
            color: 'grey',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>

        

          <Field placeholder="First Name" value={state.firstName} onChangeText={
            (text) => setState({...state, firstName: text})
          }/>
          <Field placeholder="Last Name" value={state.lastName} onChangeText={
            (text) => setState({...state, lastName: text})
          }/>
          <Field placeholder="Username" value={state.username} onChangeText={
            (text) => setState({...state, username: text})
          }/>
          <Field placeholder="Email" keyboardType={'email-address'} value={state.email} onChangeText={
            (text) => setState({...state, email: text})
          }/>
          <Field placeholder="Password" secureTextEntry={true} value={state.password} onChangeText={
            (text) => setState({...state, password: text})
          }/>
          <Field placeholder="Confirm Password" secureTextEntry={true} value={state.confirmPassword} onChangeText={
            (text) => setState({...state, confirmPassword: text})
          }/>

          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
            <Text style={{color: 'grey', fontSize: 16, textAlign:'center'}}>
              By signing in, you agree to our{' '}
            </Text>
           
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
                 <Text style={{color: '#090A2E', fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions {" "}
            </Text>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: '#090A2E', fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View> */}

          <TouchableOpacity
            style={tw`bg-red-500 text-white rounded-2xl py-2 px-36 shadow-2xl mt-8`}
            onPress={() => registerUser()}
          >
            <Text style={tw`text-white text-lg font-semibold`}>Signup</Text>
          </TouchableOpacity>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
               marginTop:20
            }}>
            <Text style={{fontSize: 15, fontWeight: 'semibold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
                        <Text style={tw`text-red-500 font-bold text-sm`}>Login</Text>

            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
  );
};

export default Signup;