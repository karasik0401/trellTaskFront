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
  import { REACT_APP_API_URL } from '@env';

  const API_URL = REACT_APP_API_URL;
  

  
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
            <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.textStyle}>Добавить</Text>
          </Pressable>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Новый список</Text>
        <View style={styles.line}></View>

          {renderChapter(userData)}

        <View></View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      width: '100%',
      height: 40,
    },
    body: {
      height: 30,
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
  });
  
  export default AddChapter;
  