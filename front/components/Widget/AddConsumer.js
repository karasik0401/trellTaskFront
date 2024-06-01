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
  
  
  function AddConsumer({task, onSave }) {
    console.log(task)
    const [board, setBoard] = useState({ participants: [] });
    const [assignee, setAssignees] = useState({assignees: task.assignees});
  
    const handleChange = (id) => {
      let tempParticipants = [...assignee.assignees];
      const index = tempParticipants.indexOf(id);
      if (index !== -1) {
        tempParticipants.splice(index, 1);
      } else {
        tempParticipants.push(id);
      }
      setAssignees({assignees: tempParticipants});
    };

    const handleSubmit = () => {
      onSave(assignee);
    };

    const fetchBoardData = async() => {
      try {
        const response = await fetch(`${API_URL}/api/boards/${task.board_id}/`, {
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

    const fetchAssignData = async() => {
      try {
        const response = await fetch(`${API_URL}/api/tasks/${task.id}/for_update/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Token ${auth_token}`,
          },
        });
        const json = await response.json();
        setAssignees({ assignees: json.assignees });
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
        fetchAssignData();
      }
    
  }, [isFocused]);

  
    const renderFlatList = (board, assignee) => {
      console.log(assignee)
      return (
        <View>
        <FlatList
          style={styles.container}
          data={board.participants}
          renderItem={({ item }) => (
            <View style={{ margin: 0 }}>
              <View style={styles.card}>
                <Text style={styles.item}>{item.username}</Text>
                <Pressable onPress={() => handleChange(item.id)}>
                  <MaterialCommunityIcons
                    name={assignee.assignees.includes(item.id)? "close-circle" : "plus-circle-outline"}
                    size={28}
                    color="#EB5093"
                  />
                </Pressable>
              </View>
            </View>
          )}
        />
        <Pressable
              style={[styles.button]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.textStyle}>Готово</Text>
          </Pressable>
          </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Назначить участника</Text>
        <View style={styles.line}></View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
          {renderFlatList(board, assignee)}
        </ScrollView>
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
  
  export default AddConsumer;
  