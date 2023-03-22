import React from 'react';
import {View, Text, Touchable, TouchableOpacity} from 'react-native';
import LandingBackground from '../components/authentication/LandingBackground';
import Buttons from '../components/authentication/Buttons';
import Field from '../components/authentication/Field';

const Signup = props => {
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

          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field placeholder="Username" />
          <Field placeholder="Email" keyboardType={'email-address'}/>
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />

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
            Press={() => {
              alert('Accoutn created');
              props.navigation.navigate('Login');
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