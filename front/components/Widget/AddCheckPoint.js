import {
    StyleSheet,
    Text,
    View,
    Pressable,
    ScrollView,
    FlatList,TextInput
  } from "react-native";
  import React from "react";
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  

  
  function AddCheckPoint({ onSave }) {

    const [userData, setUserData] = React.useState({});


    const handleSubmit = () => {
      onSave(userData.key)
    };
    

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };
  
    
  
    const renderPoint = (e, name) => {
      return (
        <View
          style={styles.container}>
          
            <View style={{ margin: 0 }}>
              <TextInput
                style={styles.Login}
                onChange={e => onChangeInput(e, "key")}
                placeholder="Введите новый элемент чек-листа"
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
        <Text style={styles.title}>Новый элемент чек-листа</Text>
        <View style={styles.line}></View>

          {renderPoint(userData)}

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
  
  export default AddCheckPoint;
  