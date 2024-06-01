import {
    StyleSheet,
    Text,
    View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity
  } from 'react-native';
  import React from 'react';
  import { Stack, IconButton } from "@react-native-material/core";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";

  PRIORITY = {
    0: "#7BB558",
    1: "#ED863B",
    2: "#E55050"
}
  
  
  function CardTask_board({ route, task }) {
    
      return (
          <View style={styles.container} >
            
            <View style={styles.header}>
                <Text style={styles.title}>{task.name}</Text>
                <View style={task.done ? styles.un_check: styles.check}></View>
            </View>

            
            <View style={styles.row}>
                <View style={styles.row_as}>
            {task.assignees.map(assignee => (
                <View >
                    <Image
                    key={assignee.id}
                    style={styles.img}
                    source={assignee.photo ? { uri: assignee.photo } : require('../../img/Profile.png')}
                    />
                </View>))}
                </View>

            <View style={styles.column}>
            <View style={styles.date}>
                <Text style={styles.date}>{task.deadline}</Text>
            </View>

            <View style={{
                width: 47,
                height: 10,
                backgroundColor: PRIORITY[task.priority],
                borderRadius: 15,
            }}>
                
                
            </View>
            </View>
            </View>
            
            

              
          </View>
      );
      row_as
  }
  
  const styles = StyleSheet.create({
      container: {
          display: 'flex',
          flexDirection: 'column',
          width:311,
          backgroundColor: '#252525',
          borderColor: '#828282',
          borderWidth: 1,
          borderRadius: 30,
          paddingRight: 12,
          paddingLeft: 12,
          paddingVertical: 24,

        },

        row_as:{
            display:"flex",
            flexDirection: "row",
        },

        title:{
            fontSize: 16,
            fontWeight: '500',
            color: '#FEFEFE'

        },
        header:{
            display:"flex",
            flexDirection: "row",
            justifyContent: 'space-between'
        },

        check:{
            width: 30,
            height:30,
            borderRadius: 100,
            borderWidth: 1,
            borderColor:"#FEFEFE"
        },

        un_check:{
            width: 30,
            height:30,
            borderRadius: 100,
            backgroundColor: "#7BB558"
        },

        date:{
            color: '#FEFEFE',
            fontSize: 12,
            fontWeight: 400,
        },

        line:{
            width: 47,
            height: 10,
            backgroundColor: '#E55050',
            borderRadius: 15,
        },

        img:{
            width: 24,
            height:24,
            marginRight: -12,
            borderRadius: 100,
            backgroundColor:"#fefefe"
        },

        row:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
        },

        column:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        
  })
  
  export default CardTask_board