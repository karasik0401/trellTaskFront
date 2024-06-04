import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    FlatList,TextInput
  } from "react-native";
  import React, { useState, useEffect }  from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  import { useIsFocused } from '@react-navigation/native';
  import { REACT_APP_API_URL } from '../../config';

  const API_URL = "http://192.168.1.118:8000";
  

  
  function AddChapter({ onSave }) {
    const [userData, setUserData] = React.useState({});
    
      const handleSubmit = () => {
        console.log(userData)
        onSave(userData.name)
      };
    

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };
  
    
  
    const renderChapter = (e, name) => {
      return (
        <View
          style={styles.container}>
          
            <View style={{ margin: 0 }}>
              <TextInput
                style={styles.Login}
                onChange={e => onChangeInput(e, "name")}
                placeholder="Новый список "
                type="text"
                placeholderTextColor="#828282"
                id = {1}
                />
            </View>
            {/* <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textStyle}>Добавить</Text>
          </Pressable> */}
        </View>
      );
    };
  
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Новый список</Text>
        <View style={styles.line}></View>

          {renderChapter(userData)}

        </View>
      </View>
      
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.textStyle}>Добавить</Text>
                </Pressable>

        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: '100%',
    },
    body: {
      height: 50,
    },
  
    item:{
      fontSize: 16
    },
  
    card: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
      width: '100%'
    },
    line: {
      height: 1,
      backgroundColor: "#A3A6AA",
      marginBottom: 16,
      width: 312,
      alignSelf: 'center'
    },
    title: {
      fontSize: 18,
      alignSelf: "center",
      marginBottom: 16,
      marginTop: -16,
      color: "#A3A6AA"
    },
    modalView: {
      marginTop: 250,
      marginHorizontal: 40,
      backgroundColor: "white",
      borderRadius: 20,
      paddingTop: 35,
      paddingBottom: 16,
      paddingHorizontal: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonClose: {
      backgroundColor: "#fff",
    },
    textStyle: {
      color: "#333",
      fontWeight: "bold",
      textAlign: "center",
    },
    button: {
      borderRadius: 20,
      paddingVertical: 16,
      marginHorizontal: 40,
      marginTop: 24,
    },
  });
  
  export default AddChapter;
  