import {
    StyleSheet,
    Text,
    View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
  } from 'react-native';
import React from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

  
  
  function NavBar({ navigation }) {
    
      return (
          <View style={styles.footer}>
            <IconButton  onPress={() => navigation.navigate('HomePage')} icon={props => <Icon  name="home" {...props} color="#FEFEFE"/>} />
            <IconButton  onPress={() => navigation.navigate('My_Tasks')} icon={props => <Icon  name="checkbox-marked-circle-outline" {...props} color="#FEFEFE"/>} />
            <IconButton  onPress={() => navigation.navigate('My_Boards')} icon={props => <Icon  name="trello" {...props} color="#FEFEFE"/>} />
            <IconButton style={styles.btn}  onPress={() => navigation.navigate('AddBoard')} icon={props => <Icon  name="plus" {...props} color="#FEFEFE"/>} />
        
          </View>
      );
  
  }
  
  const styles = StyleSheet.create({


        btn:{
            backgroundColor: '#EB5093',
            height: 44,
            width: 44,
            borderRadius: 50,
        },
        
        footer:{
            alignContent: "center"
,           marginTop: 750,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 357,
            backgroundColor: '#fff',
            paddingTop: 8,
            paddingRight: 17,
            height: 60,
            marginLeft: 17,
            borderRadius: 30,
            backgroundColor: '#1C1C1C'
                
                
        
        },
        
  })
  
  export default NavBar