import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect }  from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';

import { REACT_APP_API_URL } from '../../config';

const API_URL = "http://192.168.1.125:8000";


function AddFriends({ boardId, creatorId, onSave }) {
  const [board, setBoard] = useState({ participants: [] });
  const [users, setUsers] = useState([])

  const handleChange = (id) => {
    let tempParticipants = [...board.participants];

    const index = tempParticipants.indexOf(id);
    if (index !== -1) {
      tempParticipants.splice(index, 1);
    } else {
      tempParticipants.push(id);
    }
    setBoard({participants: tempParticipants});
  };

  const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };

  const ChengeBoard = (participants) => {
    return fetch(`${API_URL}/api/boards/${boardId}/`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify({ participants }),
    })
        .then(checkResponse).catch((res) => console.log(res))
    };

  const fetchBoardData = async() => {
    try {
      const response = await fetch(`${API_URL}/api/boards/${boardId}/for_update/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const json = await response.json();
      setBoard({ participants: json.participants });
    }
    catch (error) {
      console.log(error);
      }
  };

  const handleSubmit = () => {
    ChengeBoard(board.participants)
    .then((res) => {
      if (res) {
      }
    })
    .catch((err) => {
      Alert.alert(err[0][0]);
      }
    );
    onSave();
  };

  const fetchUsersData = async() => {
    try {
      const response = await fetch(`${API_URL}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const json = await response.json();
      const newList = []
      json.forEach(user => {
        if (user.is_following){
          newList.push(user)
        }
      });
      const responseMe = await fetch(`${API_URL}/api/users/me/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
      const jsonMe = await responseMe.json();
      newList.push(jsonMe)
      setUsers(newList);
    }
    catch (error) {
      console.log(error);
      }
  };

  

  const isFocused = useIsFocused();
  useEffect(() => {
    const token = auth_token;
    if (token) {
      fetchUsersData();
      fetchBoardData();
    }
    
  }, [isFocused]);

  const renderFlatList = (renderData, board) => {
    console.log(board, renderData)
    return (
      <FlatList
  style={styles.container}
  data={renderData}
  renderItem={({ item }) => (
    <View style={{ margin: 0 }}>
      <View style={styles.card}>
        <Text style={styles.item}>{item.username}</Text>
        <View>
          {creatorId === item.id ? (
            <Text>Создатель</Text>
          ) : (
            <Pressable onPress={() => handleChange(item.id)}>
              <MaterialCommunityIcons
                name={board.participants.includes(item.id) ? "close-circle" : "plus-circle-outline"}
                size={28}
                color="#EB5093"
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  )}
/>
    );
  };

  return (
    <View style={styles.centeredView}>
          <View style={styles.modalView}>
    <View style={styles.container}>
      <Text style={styles.title}>Добавить участников доски</Text>
      <View style={styles.line}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {renderFlatList(users, board)}
      </ScrollView>
      </View>
    </View>
    <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.textStyle}>Готово</Text>
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
    height: 200,
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

export default AddFriends;
