import {
    StyleSheet,
    Text,
    View, ScrollView, Image, FlatList, Alert, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, SafeAreaView
  } from 'react-native';
import { Feather, Entypo } from "@expo/vector-icons";
import React, {useState, useEffect} from 'react';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import NavBar from '../Widget/NavBar';
import CardBoard_List from '../Widget/CardBoard_List';
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { getUsersBoards } from '../api';

const API_URL = REACT_APP_API_URL;
  
  
  function My_Boards({ navigation }) {
  const [boardList, setBoardList] = useState([]);

  const fetchBoardData = async() => {
    try {
      const response = await getUsersBoards()
      // fetch(`${API_URL}/api/boards/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Token ${auth_token}`,
      //   },
      // });
      const json = await response.json();
      setBoardList(json);
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
    }, [isFocused]);
    
    
      return (
          <View style={styles.container}>

            <View style={styles.header}>
                  <IconButton style={styles.icon_header}  icon={props => <Icon   name="trello" {...props} color="#FEFEFE"/>} />
                  <Text style={styles.title}>Мои доски</Text>               
            </View>

            <SafeAreaView >
            <Feather
                name="search"
                size={20}
                color='#ccc'
                style={{ marginLeft: 30,
                marginBottom: -35,
                marginTop: 16,
                zIndex: 1, }}
                />
                <TextInput placeholder='Поиск' clearButtonMode='always'
                        style={styles.search}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
            </SafeAreaView>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.bigscroll}>
            <FlatList  style={styles.list}
                  data={boardList}
                  кey={(item) => item}
                  renderItem={({item}) => (
                  <TouchableOpacity onPress={() => navigation.navigate("BoardPage")}>
                    <CardBoard_List board={item}/>
                  </TouchableOpacity>)}/>

            </ScrollView>

           

              
            
            <View style={{position: 'absolute',
            height: 80,}}>
            <NavBar navigation={navigation}/>
            </View>
            

            
          </View>
      );
  
  }
  
  const styles = StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#1c1c1c'
    
      
        },
        search:{
            width:354,
            height:32,
            borderWidth:2,
            borderColor: '#ccc',
            borderRadius:16,
            marginTop:8,
            marginBottom: 8,
            alignSelf:"center",
            backgroundColor: "#fff",
            paddingLeft: 35,
        
          },

        header:{
          display: "flex",
          flexDirection: "row",
          marginTop: 60,
          justifyContent: 'flex-start',
          verticalAlign: "middle",
          width: 393,
          height: 40,
          paddingHorizontal: 16,
          marginBottom: 8,
        },
  
        header_row:{
          display: 'flex',
          flexDirection: 'row',
        },
        column:{
            display:"flex",
            flexDirection:"column",
            alignSelf:"center"

        },

        icon_header:{
          width: 40,
          height: 40,
          marginRight: 14, 
  
        },
  
        title:{
          fontSize: 24,
          fontWeight: 600,
          color: '#FEFEFE',
          marginLeft: -10,
          marginTop: 5,
        },


        

        
  })
  
  export default My_Boards