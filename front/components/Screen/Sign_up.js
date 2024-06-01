import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { StyleSheet, Text, View, TextInput,Button,Pressable, Alert, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {REACT_APP_API_URL} from "@env";
import { registerUser } from '../api';

const API_URL = REACT_APP_API_URL
console.log(API_URL)

function Sign_up({navigation}) {
  
    const [userData, setUserData] = React.useState({});
    // const checkResponse = (res) => {
    //   if (res.ok) {
    //     return (res);
    //   }
    //   return res.json().then((err) => Promise.reject(err));
    // };
  
    // const registerUser = (username, email, password, re_password) => {
    //   return fetch(`${API_URL}/api/users/`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, email, password, re_password}),
    //   }).then(checkResponse);
    // };
  
  
    const checkValid = () => {
      if (!userData.username) {
        Alert.alert("Поле с логином является обязательным");
        return false;
      }
      if (!userData.password) {
        Alert.alert("Поле с паролем является обязательным");
        return false;
      }
      if (!userData.re_password) {
        Alert.alert("Поле с повторным вводом пароля является обязательным");
        return false;
      }
      return true;
    };
  
  
    const handleSubmit = () => {
      checkValid() &&
      registerUser(userData.username, userData.email, userData.password, userData.re_password)
        .then((res) => {
          if (res.status === 201) {
            navigation.navigate('Sign_in')
          }
        })
        .catch((err) => {
          console.log(err)
          if (err.non_field_errors){
            Alert.alert(err.non_field_errors[0]);
          }
          else if (err.email){
            Alert.alert(err.email[0]);
          }
          else if (err.password){
            Alert.alert(err.password[0]);
          }
          else if (err.username){
            Alert.alert(err.username[0]);
          }
        });
  
      };
  
    
    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };
  
  return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.text}>Регистрация</Text>

          <View>
            <TextInput
              style={styles.Login}
              onChange={e => onChangeInput(e, 'username')}
              placeholder="Логин"
              placeholderTextColor="#828282"
              type="text"
              id = {1}
            />
            <TextInput
              style={styles.Mail}
              onChange={e => onChangeInput(e, 'email')}
              placeholder="Почта"
              placeholderTextColor="#828282"
              id = {2}
              type='text'
              keyboardType='email-address'
            />
            <TextInput
              style={styles.Mail}
              secureTextEntry={true}
              textContentType={'password'}
              onChange={e => onChangeInput(e, 'password')}
              placeholder="Пароль"
              placeholderTextColor="#828282"
              id = {3}
            />
            <TextInput
              style={styles.Mail}
              secureTextEntry={true}
              textContentType={'password'}
              onChange={e => onChangeInput(e, 're_password')}
              placeholder="Пароль еще раз"
              placeholderTextColor="#828282"
              id = {4}
            />
            <View style={styles.btnContainer}>
              <Pressable style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btn_text}>Зарегистрироваться</Text>
              </Pressable>

              <View style={styles.lines}>
                <View style={styles.left_lines}></View>
                <Text style={styles.and}>или</Text>
                <View style={styles.right_lines}></View>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footer_text}>Уже есть аккаунт?</Text>
                <View style={styles.footer_btn}>
                  <Button 
                    title="Войти"
                    color="#CDDCA1"
                    size="sm"
                    onPress={() => navigation.navigate('Sign_in')}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
 

    

  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1C1C1C',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    
  },

  and:{
    color: "#828282"
  },

  text: {
    marginTop: 50,
    fontSize: 32,
    color: '#EB5093',
  },
  Login: {
    marginTop: 50,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "#252525",
    borderColor: "#828282",
    color:"#fefefe",
    padding: 10,
    borderRadius: 10,
  },
  Mail: {
    marginTop: 27,
    height: 52,
    width: 318,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "#252525",
    borderColor: "#828282",
    color:"#fefefe",
    padding: 10,
    borderRadius: 10,
  },
  btn: {
    marginTop: 27,
    alignItems: 'center',
    justifyContent: 'center',
    width: 318,
    height: 52,
    borderRadius: 15,
    backgroundColor: '#CDDCA1',
    marginLeft:12   
  },
  btn_text:{
    fontSize: 20,
    color: '#1C1C1C',
    paddingBottom: 5,
  },
  lines:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 17,
  },
  left_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginRight: 7
  },
  right_lines: {
    width: 139.01,
    height: 1,
    backgroundColor: '#A3A6AA',
    marginTop:10,
    marginLeft: 7,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 17,
  },
  footer_text:{
    fontSize: 14,
    color: '#828282',
  },
  footer_btn:{
    marginTop: -11,
    
  }

})


export default Sign_up