import {
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import React, { useState } from "react";
  import { Stack, IconButton } from "@react-native-material/core";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";
  import BoardList from "../Widget/BoardList";
  import AddFriends from "../Widget/AddFriends";
  import AddChapter from "../Widget/AddChapter";
  
  function AddBoard({ navigation }) {
    const [userData, setUserData] = React.useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleChapter, setModalVisibleChapter] = useState(false);

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
      };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.header_row}>
          <IconButton
            style={styles.icon_header}
            onPress={() => navigation.navigate("HomePage")}
            icon={(props) => (
              <Icon name="arrow-left" {...props} color="#1c1c1c" />
            )}
          />

          </View>
  
          <IconButton
          style={styles.icon_header_add}
          icon={(props) => <Icon name="arrow-up" {...props} color="#FEFEFE" />}
        />
        </View>

        <TextInput
        style={styles.title}
        onChange={(e) => onChangeInput(e)}
        placeholder="Название доски"
        fontSize={24}
        type="text"
        placeholderTextColor="#828282"
        id={1}
      />
  
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.body}
          >
            <View style={styles.comand}>
              <IconButton
                style={styles.icon_comand}
                onPress={() => setModalVisible(true)}
                icon={(props) => <Icon name="plus" {...props} color="#1C1C1C" />}
              />

            </View>
          </ScrollView>
  
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.body}
          >
            <View style={styles.list}>
              <IconButton
                style={styles.icon_list}
                onPress={() => setModalVisibleChapter(true)}
                icon={(props) => <Icon name="plus" {...props} color="#FEFEFE" />}
              />
            </View>
          </ScrollView>
  
          <BoardList navigation={navigation} />
        </ScrollView>
  
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <AddFriends />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Готово</Text>
            </Pressable>
          </View>
        </Modal>
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleChapter}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalViewChapter}>
              <AddChapter />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisibleChapter(!modalVisibleChapter)}
            >
              <Text style={styles.textStyle}>Добавить</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      backgroundColor: "#1C1C1C",
    },

    icon_header: {
        width: 30,
        height: 30,
        backgroundColor: "#FEFEFE",
      },
      icon_header_add: {
        width: 30,
        height: 30,
        backgroundColor: "#EB5093",
      },
  
    icon_comand: {
      width: 30,
      height: 30,
      marginTop: 7,
      backgroundColor: "#fefefe",
    },
  
    modalViewChapter: {
      marginTop: 250,
      marginHorizontal: 40,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
  
    modalView: {
      marginTop: 200,
      marginHorizontal: 40,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
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
    button: {
      borderRadius: 20,
      paddingVertical: 16,
      marginHorizontal: 40,
      marginTop: 24,
    },
    buttonOpen: {},
    buttonClose: {
      backgroundColor: "#fff",
    },
    textStyle: {
      color: "#333",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    icon_list: {
      width: 30,
      height: 30,
      marginTop: 0,
      backgroundColor: "#EB5093",
    },
  
    img: {
      width: 30,
      height: 30,
      backgroundColor: "#fff",
      borderRadius: 100,
      marginLeft: 12,
      marginBottom: 4,
      marginTop: 4,
      marginRight: 4,
    },
    item_on: {
      display: "flex",
      flexDirection: "row",
      height: 30,
      borderRadius: 15,
      borderColor: "#EB5093",
      borderWidth: 1,
      alignContent: "center",
      marginLeft: 8,
      backgroundColor: "#EB5093",
    },
  
    title_list: {
      fontSize: 18,
      color: "#fefefe",
      marginBottom: 4,
      marginTop: 2,
      marginRight: 12,
      marginLeft: 12,
    },
  
    item: {
      display: "flex",
      flexDirection: "row",
      height: 30,
      borderRadius: 15,
      borderColor: "#EB5093",
      borderWidth: 1,
      alignContent: "center",
      marginLeft: 8,
    },
  
    list: {
      display: "flex",
      flexDirection: "row",
      marginTop: 12,
    },
  
    name: {
      fontSize: 18,
      color: "#fefefe",
      marginBottom: 8,
      marginTop: 8,
      marginRight: 12,
    },
  
    person: {
      display: "flex",
      flexDirection: "row",
      height: 40,
      borderRadius: 15,
      borderColor: "#fefefe",
      borderWidth: 1,
      alignContent: "center",
      marginLeft: 8,
    },
  
    comand: {
      display: "flex",
      flexDirection: "row",
      marginTop: 25 - 20,
    },
  
    header: {
      display: "flex",
      flexDirection: "row",
      marginTop: 60,
      justifyContent: "space-between",
      verticalAlign: "middle",
      width: 393,
      height: 40,
      paddingHorizontal: 16,
      marginBottom: 8,
    },
  
    header_row: {
      display: "flex",
      flexDirection: "row",
    },
  
    title: {
      fontSize: 24,
      fontWeight: 600,
      color: "#FEFEFE",
      marginLeft: 12,
    },
  
  });
  
  export default AddBoard;
  