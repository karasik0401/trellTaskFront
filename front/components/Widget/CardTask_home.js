import {
    StyleSheet,
    Text,
    View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
  } from 'react-native';
  import React from 'react';
  import { Stack, IconButton } from "@react-native-material/core";
  import Icon from "@expo/vector-icons/MaterialCommunityIcons";

PRIORITY = {
    0: "#7BB558",
    1: "#ED863B",
    2: "#E55050"
}
    
  
  function CardTask_home(task) {
    console.log(task)
    
      return (
          <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{task.task.name}</Text>
                <Text style={styles.h2}>{task.task.board_name}</Text>
            </View>

            

            <View style={styles.row}>
            <View style={styles.date}>
                <Text style={styles.date}t>{task.task.deadline}</Text>
            </View>

            <View style={{
                width: 194,
                height: 10,
                backgroundColor: PRIORITY[task.task.priority],
                borderRadius: 15,
            }}>
            </View>
            </View>
            

              
          </View>
      );
  
  }
  
  const styles = StyleSheet.create({
      container: {
          display: 'flex',
          flexDirection: 'column',
          width:342,
          backgroundColor: '#252525',
          borderColor: '#828282',
          borderWidth: 1,
          borderRadius: 30,
          paddingRight: 12,
          paddingLeft: 12,
          paddingVertical: 24,

          marginTop: 26,
        },

        title:{
            fontSize: 20,
            fontWeight: 600,
            color: '#FEFEFE'

        },

        h2:{
            color: '#828282',
            marginTop: 8,
            fontSize: 14,
            fontWeight: 400,
        },

        date:{
            color: '#FEFEFE',
            fontSize: 14,
            fontWeight: 400,
        },

        line:{
            width: 194,
            height: 10,
            backgroundColor: '#E55050',
            borderRadius: 15,
        },


        row_circl:{
            display: 'flex',
            flexDirection: 'row',
        },

        disc:{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 8,
            height: 15,
            alignItems: 'center'

        },

        icon_chb:{
            marginRight: 8,
            height: 15,
            width: 15,
        },

        txt:{
            marginRight: 8,
            color: '#1C1C1C'
        },

        circl:{
            height: 30,
            width: 30,
            borderRadius: 30,
            borderColor: "#CDDCA1",
            borderWidth: 1,
            backgroundColor: '#000000',
            marginRight: -15,
            marginTop: 20

        },

        procent:{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: '#EB5093'
        },

        circl_min:{
            height: 26,
            width: 26,
            borderRadius: 50,
            backgroundColor: '#CDDCA1',
            alignSelf: 'center',
            marginTop: 12
        },

        procent_txt:{
            alignSelf: 'center',
            marginTop: 7,
            fontSize: 10,
            fontWeight: 500,
            color: '#1C1C1C'
        },

        row:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 16,
        },
        
  })
  
  export default CardTask_home