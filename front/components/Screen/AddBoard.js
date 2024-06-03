import {
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
    Pressable,
    TextInput,
    TouchableOpacity,
    FlatList
  } from "react-native";
  import React, { useState } from "react";
  import { Stack, IconButton } from "@react-native-material/core";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";
  import BoardList from "../Widget/BoardList";
  import AddFriends from "../Widget/AddFriendsToNewBoard";
  import AddChapter from "../Widget/AddChapter";

  const API_URL = "http://192.168.1.125:8000";
  
  function AddBoard({ navigation }) {
    const [userData, setUserData] = React.useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [part, setPart] = useState([])
    const [modalVisibleChapter, setModalVisibleChapter] = useState(false);
    const [participants, setParticipants] = useState([])

    const handleSubmitParticipants = (selectedParticipants, fullParticipants) => {
      setParticipants(selectedParticipants);
      setPart(fullParticipants)
      console.log(fullParticipants)
      setModalVisible(!modalVisible);
    }

    const checkResponse = (res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((err) => Promise.reject(err));
      };
    

    const createBoard = () => {
      let formData = new FormData();
          if (userData.name) {
            formData.append('name', userData.name)
          }
          participants.forEach(participant => {
            formData.append('participants', participant);
          });
          return fetch(`${API_URL}/api/boards/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data',
            authorization: `Token ${auth_token}`,
            },
            body: formData
        })
            .then(checkResponse).then((res) => navigation.navigate("BoardPage", res.id)).catch((res) => console.log(res))
    }

    const onChangeInput = (e, name) => {
        setUserData({
          ...userData,
          [name]: e.nativeEvent.text,
        });
        console.log(userData)
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
          onPress={() => createBoard()}
          icon={(props) => <Icon name="arrow-up" {...props} color="#FEFEFE" />}
        />
        </View>

        <TextInput
        style={styles.title}
        onChange={(e) => onChangeInput(e, "name")}
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
              <FlatList style={styles.list}
                  data={part}
                  кey={(item) => item}
                  renderItem={({item}) => (
                  <View style={styles.person}>
                    <Text style={styles.name}>{item.username}</Text>
                  </View>
                )
                }
                />

            </View>
          </ScrollView>
  
          {/* <ScrollView
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
          </ScrollView> */}
  
          {/* <BoardList navigation={navigation} /> */}
        </ScrollView>
  
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View>
              <AddFriends participants={participants} onSave={handleSubmitParticipants}/>
            </View>
        </Modal>
  
        {/* <Modal
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
        </Modal> */}
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
  