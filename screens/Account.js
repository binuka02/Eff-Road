import { StyleSheet, Text, View,  SafeAreaView, Image, Modal, Pressable, Alert } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Field from '../components/authentication/Field';
import { useEffect } from 'react';
import axios from 'axios';
import {API_URL} from '@env'


// const Account = () => {
  
// }

const SeperatorStyle = {
  height: 2,
  backgroundColor: '#e2e2e2',
  width: '80%',
  alignSelf: 'center',
  marginBottom: 50
}

const Seperator = () => <View style={SeperatorStyle} />


const Seperator2Style = {
  height: 2,
  backgroundColor: '#e2e2e2',
  width: '80%',
  alignSelf: 'center',
  marginBottom: 20,
  marginTop:20
}

const Seperator2 = () => <View style={Seperator2Style} />


export default function Account({navigation}){

  const logout = async()=>{
    await AsyncStorage.removeItem("user")
    navigation.navigate('Login')
  }

  const update = async()=>{
    if(state.password !== state.confirmPassword){
      alert("Passwords do not match")
      return
    }

    if(state.firstName==="" || state.lastName=== "" || state.username==="" || state.email===""  ){
      alert("Please fill out all fields")
      return
    }
    const response = await axios.patch(API_URL+"/auth/update",{
      ...state
    })

    const user = response.data

    await AsyncStorage.setItem('user', JSON.stringify(user))
    setUser(user)

  }

  const [user,setUser] = useState(null)

  useEffect(()=>{
    AsyncStorage.getItem('user').then((user)=>{
      setUser(JSON.parse(user))
      setState({...state,...JSON.parse(user),password:""})
    })
  },[])

const [visible, setVisible] = useState(false);
const show = () => setVisible(true);
const hide = () => setVisible(false);

const [state,setState] = React.useState({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  username: "",
  confirmPassword: ""
    })
  return (
    <SafeAreaView style={{flex:1,  backgroundColor:'white'}}>
  

    {user &&(
      <>
    <View style={styles.boxContain}>
       <View style={styles.box1}>
        <View style={tw` my-auto mx-auto`}>
            
            <Image source={require('../assets/profileicon.png')} style={tw`h-24 w-24 shadow-2xl`} />            
            </View>

          </View>
          <View style={styles.box2}>
        <View style={tw` my-auto mx-auto`}>
            
              <Text style={tw`text-2xl font-bold `}>{user.firstName + " "+user.lastName}</Text>
          

            <TouchableOpacity
            onPress={show}
            >
              <Image source={require('../assets/editprofile.png')} style={tw`h-6 w-6 shadow-2xl`}  />
            </TouchableOpacity>


          <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={hide}
          >
            <Pressable style={styles.inner} onPress={hide}/>
            <View style={styles.window}>

        <View style={tw`mt-4 right-4 absolute`}>
          <TouchableOpacity
          onPress={hide}
          >
            <Image source={require('../assets/close.png')} style={tw`h-4 w-4 shadow-2xl`}  />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 50,
            marginBottom: 40,
          }}>
          Edit Profile
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

          <Seperator2/>

          <Text style={tw`text-lg font-semibold text-gray-400 `}>Change Password</Text>
          <Field placeholder="Password" secureTextEntry={true} value={state.password} onChangeText={
            (text) => setState({...state, password: text})
          }/>
          <Field placeholder="Confirm Password" secureTextEntry={true} value={state.confirmPassword} onChangeText={
            (text) => setState({...state, confirmPassword: text})
          }/>
          
          <TouchableOpacity
          onPress={()=>{update();hide()}}
          
          >
            <Text style={tw`text-lg font-semibold text-gray-600 mt-10`}>Save</Text>
          </TouchableOpacity>

            </View>
          </Modal>


          </View>
          </View>  
    
    </View>

    <Seperator />

    <View style={tw` flex-1`}>
      <View style={tw` ml-8`}>
        <Text style={tw`text-lg font-semibold `}>Username</Text>
        <Text style={tw`text-sm  text-gray-500`}>{user.username}</Text>
      </View>
      <View style={tw` ml-8 mt-4`}>
        <Text style={tw`text-lg font-semibold `}>First Name</Text>
        <Text style={tw`text-sm  text-gray-500`}>{user.firstName}</Text>
      </View>
      <View style={tw` ml-8 mt-4`}>
        <Text style={tw`text-lg font-semibold `}>Last Name</Text>
        <Text style={tw`text-sm  text-gray-500`}>{user.lastName}</Text>
      </View>
      <View style={tw` ml-8 mt-4`}>
        <Text style={tw`text-lg font-semibold `}>Email</Text>
        <Text style={tw`text-sm  text-gray-500`}>{user.email}</Text>
      </View>

      <TouchableOpacity
      onPress={()=>{
        navigation.navigate('JourneyHistory')  
      }}
      >
      <View style={tw`ml-8 mt-24 mx-auto bg-gray-400 w-3/4 items-center rounded-2xl p-1 `}>
        <Text style={tw`text-lg font-semibold text-white`}>View History</Text>
      </View>
      </TouchableOpacity>
      
      <TouchableOpacity
      onPress={logout}

      >
      <View style={tw`ml-8 mt-2 mx-auto bg-white p-1 w-3/4 items-center rounded-2xl  border border-gray-400`}>
        <Text style={tw`text-base font-semibold text-gray-400`}>Signout</Text>
      </View>
      </TouchableOpacity>

    </View>
      </>
    )
    }
   
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
  boxContain: {
     width: '80%',
     height: '10%',
     backgroundColor: 'white',
     flexDirection: 'row',
     marginTop: 100,
     alignSelf: 'center',
  },

  box1: {
    width: '30%',
    height: '30%',
    backgroundColor: 'white',
 },
 box2: {
  width: '70%',
  height: '30%',
  backgroundColor: 'white',
},

inner: {
  height:100,
  backgroundColor: 'rgba(0,0,0,0.5)',
  opacity:0.5,
},

window: {
  flex:1,
  backgroundColor: 'white',
  alignItems: 'center',
  
}
 });