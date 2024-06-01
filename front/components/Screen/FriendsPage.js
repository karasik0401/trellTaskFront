import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import React, {useState, useEffect} from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useIsFocused } from '@react-navigation/native';
import NavBar from "../Widget/NavBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import filter from "lodash.filter";
import { REACT_APP_API_URL } from '@env';
import { GetUsersList, createFollow, deleteFollow } from "../api";

const API_URL = REACT_APP_API_URL;


function FriendsPage({ navigation }) {
  const [data, setData] = useState([{
    id:0,
    email: null,
    username: null,
    photo: null,
    is_following: false
  }]);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [query, setQuesry] = useState("");
  const [friends, setFriends] = useState([]);
  const [isChanged,  setIsChanged] = useState(null)

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchUsersData();
  }, [isFocused]);


  const fetchUsersData = async() => {
    try {
      const response = await GetUsersList();
      // fetch(`${API_URL}/api/users/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Token ${auth_token}`,
      //   },
      // });
      const json = await response.json();
      console.log(json)
      setData(json);
      setFullData(json);
    }
    catch (error) {
      console.log(error);
      }
  };

  const CreateFollow = async(following) => {
    try {
      const response = await createFollow(following);
    //   fetch(`${API_URL}/api/follow/`, {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Token ${auth_token}`,
    //     },
    //     body: JSON.stringify({ following }),
    // });
      const json = await response;
      fetchUsersData();
    }
    catch (error) {
      console.log(error);
      }
  };

  const DeleteFollow = async(following) => {
    try {
      const response = await deleteFollow(following)
    //   fetch(`${API_URL}/api/follow/${following}/delete/`, {
    //     method: 'DELETE',
    //     headers: {
    //       "Content-Type": "application/json",
    //       authorization: `Token ${auth_token}`,
    //     },
    // });
      const json = await response;
      fetchUsersData();
    }
    catch (error) {
      console.log(error);
      }
  };

  const handleSearch = (query) => {
    setsearchQuery(query);
    const filteredData = filter(fullData, (user) => {
      return contains(user, query);
    });
    setData(filteredData);
  };
  const contains = ({username, email}, query) => {
    console.log(username)
    if (username.includes(query) || email.includes(query)) {
      return true;
    }
    return false;
  }


  const handleChange = (id, is_following) => {
    if (is_following){
      DeleteFollow(id)
    } else {
      CreateFollow(id)
    }
  };


  const renderFlatList = (renderData) => {
    return (
      <FlatList
        style={styles.container}
        data={renderData}
        renderItem={({ item }) => (
          <View style={{ margin: 0 }}>
            <View style={styles.card}>
              <Text style={styles.name}>{item.username}</Text>
              <Pressable onPress={() => handleChange(item.id, item.is_following)}>
                <MaterialCommunityIcons
                  name={item.is_following ? "close-circle" : "plus-circle-outline"}
                  size={30}
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
      <View style={styles.header}>
        <IconButton
          style={styles.icon_header}
          icon={(props) => (
            <Icon name="account-group" {...props} color="#FEFEFE" />
          )}
        />
        <Text style={styles.title}>Пользователи</Text>
      </View>

      <SafeAreaView>
        <Feather
          name="search"
          size={20}
          color="#ccc"
          style={{
            marginLeft: 30,
            marginBottom: -35,
            marginTop: 16,
            zIndex: 1,
          }}
        />
        <TextInput
          placeholder="Поиск"
          clearButtonMode="always"
          style={styles.search}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery} onChangeText={(query) => handleSearch(query)}
        />
      </SafeAreaView>

      
      <View style={styles.line}></View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.bigscroll}>
        <View style={styles.column}>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            {renderFlatList(data)}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#1c1c1c",
  },

  name:{
    color:'#fff',
    fontSize: 16
  },

  person: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    width: "100%",
    marginTop: 22,
  },

  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 24,
    marginBottom: 16,
  },

  name_img: {
    display: "flex",
    flexDirection: "row",
  },

  line: {
    height: 1,
    width: 390,
    backgroundColor: "#A3A6AA",
    marginTop: 16,
  },

  min_title: {
    fontSize: 16,
    marginLeft: 36,
    marginTop: 10,
    color: "#fefefe",
  },

  big_row: {
    display: "flex",
    flexDirection: "row",
    verticalAlign: "middle",
    marginLeft: 24,
    marginTop: 24,
  },

  min_row: {
    display: "flex",
    flexDirection: "row",
  },

  img: {
    height: 40,
    width: 40,
    backgroundColor: "#000",
    borderRadius: 100,
    borderColor: "#A3A6AA",
    borderWidth: 1,
    marginRight: -20,
  },

  search: {
    width: 354,
    height: 32,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingLeft: 35,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 53,
    marginLeft: 24,
    verticalAlign: "middle",
    justifyContent: "flex-start",
  },

  header_row: {
    display: "flex",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 24,
  },

  icon_header: {
    width: 40,
    height: 40,
    marginRight: 14,
  },
  icon_persone: {
    width: 24,
    height: 24,
    backgroundColor: "#EB5093",
    marginTop: 8,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#FEFEFE",
    marginLeft: -10,
    marginTop: 5,
  },

});

export default FriendsPage;
