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
  
  const API_URL = "http://192.168.1.118:8000";
  
  
  function AddFriends({participants, onSave}) {
    const [board, setBoard] = useState(participants);
    const [part, setPart] = useState([])
    const [users, setUsers] = useState([])
    
    const handleChange = (id) => {
      let tempParticipants = [...board];
  
      const index = tempParticipants.indexOf(id);
      if (index !== -1) {
        tempParticipants.splice(index, 1);

      } else {
        tempParticipants.push(id);
      }
      setPart(findMatchingIds(users, tempParticipants))
      setBoard(tempParticipants);
    };
  
    const handleSubmit = () => {
        onSave(board, part)
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

    const findMatchingIds = (list, ids) => {
        return list.filter(item => ids.includes(item.id));
      };
  
    const isFocused = useIsFocused();
    useEffect(() => {
      const token = auth_token;
      if (token) {
        fetchUsersData();
      }
      
    }, [isFocused]);
  
    const renderFlatList = (renderData, board) => {
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
                    name={board.includes(item.id)? "close-circle" : "plus-circle-outline"}
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
    button: {
        borderRadius: 20,
        paddingVertical: 16,
        marginHorizontal: 40,
        marginTop: 24,
      },
      textStyle: {
        color: "#333",
        fontWeight: "bold",
        textAlign: "center",
      },
      buttonClose: {
        backgroundColor: "#fff",
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
  });
  
  export default AddFriends;
  