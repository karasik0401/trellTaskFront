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
        <View style={styles.container}>
          
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
            </View> 
            

      );
    };
  
    return (
      <View>
      <View style={styles.modalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Новый элемент чек-листа</Text>
        <View style={styles.line}></View>

          {renderPoint(userData)}

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
      height: 30,
    },
  
    item:{
      fontSize: 16
    },
    Login:{
      // marginBottom: 8,
      // paddingHorizontal: 8,
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
  
  export default AddCheckPoint;
  