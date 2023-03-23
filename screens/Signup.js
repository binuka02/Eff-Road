import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import LandingBackground from '../components/authentication/LandingBackground';
import Buttons from '../components/authentication/Buttons';
import Field from '../components/authentication/Field';
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = props => {
  const [state,setState] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    username: "",
    confirmPassword: ""
      })
    
      const registerUser = async () => {
        if(state.password !== state.confirmPassword){
          alert("Passwords do not match")
          return
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
            fontSize: 54,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        
        <View
          style={{
            marginTop: 20,
            backgroundColor: 'white',
            height: 700,
            width: 320,
            borderTopLeftRadius: 130,
            paddingTop: 70,
            alignItems: 'center',
          }}>
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

          <View
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
          </View>
          <Buttons
            textColor="white"
            bgColor='#090A2E'
            btnlbl="Signup"
            press={() => {
              registerUser()
              props.navigation.navigate('HomeScreen');
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: '#090A2E', fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LandingBackground>
  );
};

export default Signup;