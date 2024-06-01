import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import BoardList from "../Widget/BoardList";
import AddFriends from "../Widget/AddFriends";
import AddChapter from "../Widget/AddChapter";
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { getBoard } from "../api";

const API_URL = REACT_APP_API_URL;

function BoardPage(props) {
  const {navigation} = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleChapter, setModalVisibleChapter] = useState(false);
  const [boards, setBoards] = useState({});
  const [currentChapter, setCurrentChapter] = useState(0);
  const [refresh, setRefresh] = useState(false)

  const handlePress = () => {
    setModalVisible(!modalVisible)
    setRefresh(!refresh)
  }

  const handlePressChapter = (name) => {
    setModalVisibleChapter(!modalVisibleChapter)
    postChapter(name, props.route.params)
    setRefresh(!refresh)
  }

  // const checkResponse = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((err) => Promise.reject(err));
  // };

  // const postChapter = (name) => {
  //   board = props.route.params
  //   console.log(name, board)
  //   return fetch(`${API_URL}/api/chapters/`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Token ${auth_token}`,
  //       },
  //       body: JSON.stringify({ name, board }),
  //   })
  //       .then(checkResponse)
  //   };

  const fetchBoardData = async() => {
    try {
      const response = await getBoard(props.route.params);
      // fetch(`${API_URL}/api/boards/${props.route.params}/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Token ${auth_token}`,
      //   },
      // });
      const json = await response.json();
      setBoards(json);
      if (currentChapter === 0){
        setCurrentChapter(json.chapters[0].id)
      }
    }
    catch (error) {
      console.log(error);
      }
  };

  const isFocused = useIsFocused();
      useEffect(() => {
        const token = auth_token;
        if (token) {
          fetchBoardData();
        }
    }, [refresh, isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_row}>
          <IconButton
            style={styles.icon_header}
            onPress={() => navigation.navigate("HomePage")}
            icon={(props) => (
              <Icon name="arrow-left-circle" {...props} color="#FEFEFE" />
            )}
          />
          <Text style={styles.title}>{boards.name}</Text>
        </View>

        <IconButton
          style={styles.icon_header}
          icon={(props) => (
            <Icon name="dots-vertical" {...props} color="#FEFEFE" />
          )}
        />
      </View>

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
                  data={boards.participants}
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
            <FlatList
                  data={boards.chapters}
                  кey={(item) => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                    style={currentChapter == item.id? styles.item_on: styles.item}
                    onPress={() => setCurrentChapter(item.id)}
                  >
                    <Text style={styles.title_list}>{item.name}</Text>
                  </TouchableOpacity>
                )
                }
                />
          </View>
        </ScrollView>
        {(boards.chapters && currentChapter != 0) && (
          <BoardList navigation={navigation} chapters={boards.chapters.find(chapter => chapter.id === currentChapter)}/>
        )}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddFriends boardId={props.route.params}/>
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => handlePress()}
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
            <AddChapter onSave={handlePressChapter}/>
          </View>
          
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


  icon_header: {
    width: 30,
    height: 30,
  },
});

export default BoardPage;
