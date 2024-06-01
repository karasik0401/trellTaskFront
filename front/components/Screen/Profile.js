import { StatusBar } from 'expo-status-bar';
import { IconButton, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from 'react';
import { useHistory } from "react-dom";
import * as ImagePicker from "expo-image-picker";
import {useIsFocused} from "@react-navigation/native";
import {REACT_APP_API_URL} from "@env";

const API_URL = REACT_APP_API_URL

import { StyleSheet, Text, Image, View, ScrollView, Button,Pressable, Alert, SafeAreaView, } from 'react-native';
import { ChengeUser, getUser } from '../api';



function Profile({ navigation }) {
      
    const [userState, setUserState] = React.useState({});
    const [image, setImage] = useState(null);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
    
      if (!result.canceled) {
        setImage(result);
        handleSubmit(result)
        }
    };
    
    // const checkResponse = (res) => {
    //   if (res.ok) {
    //     return (res.json());
    //   }
    //   return res.json().then((err) => Promise.reject(err));
    // };

    // const ChengeUser = (data) => {
    //   console.log(data, "меняем")
    //   return fetch(`${API_URL}/api/users/${userState.id}/`, {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //       authorization: `Token ${auth_token}`,
    //     },
    //     body: data
    //   }).then(checkResponse)
    // };

    const handleSubmit = (result) => {
      let formData = new FormData();
      if (result){
        console.assert(image)
          formData.append('photo', {
          uri: result.assets[0].uri.replace('file://', ''),
          type: result.assets[0].type,
          name: result.assets[0].fileName
      })
      }
      ChengeUser(formData)
      .then((res) => {
        if (res) {
        }
      })
      .catch((err) => {
          if(err.username){
              Alert.alert(err.username[0]);
          }
          if(err.email){
              Alert.alert(err.email[0]);
          }
        console.log(err)
        
        }
      );
    };

    // const getUser = () => {
    //     return fetch(`${API_URL}/api/users/me/`, {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: `Token ${auth_token}`,
    //       },
    //     }).then(checkResponse)
    //     .then((res) => setUserState(res))
    //   };
    const isFocused = useIsFocused();
    React.useEffect(() => {
        const token = auth_token;
        if (token) {
          getUser().then((res) => setUserState(res));
        }
    }, [image, isFocused]);

    

    

  return (

    <View style={styles.container}>
        

        <Image style={styles.photo}/>

        <View style={styles.rec_one}>
        <Image source={image ? { uri: image.assets[0].uri } : (userState.photo? { uri: userState.photo }: require('../../img/Profile.png'))} style={styles.img} />
          <Text style={styles.login}>{userState.username}</Text>

          <Text style={styles.email}>{userState.id}</Text>

          <View style={styles.rec_t}>
            <Pressable style={styles.btn} onPress={pickImage}>
            <Text style={styles.btn_text}>Редактировать</Text>
            </Pressable>

            <Pressable style={styles.btn} onPress={() => navigation.navigate('FriendsPage')}>
            <Text style={styles.btn_text}>Друзья</Text>
            </Pressable>
        </View>

            <Pressable style={styles.btn_exit} onPress={() => navigation.navigate('Sign_in')}>
            <Text style={styles.btn_text_exit}>Выйти</Text>
            </Pressable>
        </View>
        
        
 

        

        
        
 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#CDDCA1',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  }, 
  body:{
    zIndex: 1,
    
  },
  rec_one:{
    height: 648+9,
    width:'100%',
    marginTop: 196,
    backgroundColor:"#1C1C1C",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  btn_exit:{
    marginTop: 283,
    alignSelf: "center",

  },

  btn_text_exit:{
    fontSize: 18,
    color:"#EB5093"
  },

  rec_t:{
    alignSelf: 'center',
    display: 'flex',
    alignContent: 'flex-start',
    height: 75,
    width: 287,
    marginTop: 47,

  },
  img:{
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: "#fff",
    marginTop: -117,
    alignSelf: "center"
  },

  login:{
    marginTop: 28,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 31,
    marginBottom:8,
    color:"#FEFEFE",
    alignSelf: "center"
  },
  email:{
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 21,
    color: '#A3A6AA',
    alignSelf: "center"
  },

 

  icon:{
    alignSelf: 'center',
    marginLeft: 2,
    marginBottom: 2,
    transform: [{ rotate: '-90deg'}]
},
  btn: {
    marginBottom: 27,
  },
  btn_text:{
    fontSize: 20,
    color: '#F2F3F3',
    paddingBottom: 5,
  },
  
})

export default Profile