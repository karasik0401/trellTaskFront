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

import { REACT_APP_API_URL } from '@env';

const API_URL = REACT_APP_API_URL;


function AddFriends({ boardId }) {
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
        .then(checkResponse)
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
              <Pressable onPress={() => handleChange(item.id)}>
                <MaterialCommunityIcons
                  name={board.participants.includes(item.id)? "close-circle" : "plus-circle-outline"}
                  size={28}
                  color="#EB5093"
                />
              </Pressable>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добавить участников доски</Text>
      <View style={styles.line}></View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {renderFlatList(users, board)}
      </ScrollView>
      <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.textStyle}>Сохранить</Text>
              </Pressable>
      <View></View>
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
});

export default AddFriends;
