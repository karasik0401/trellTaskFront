import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import CardTask_board from "./CardTask_board";

function BoardList({navigation, chapters}) {
  console.log(chapters)
  
  return (
    <View style={styles.BoardList}>
      <View style={styles.header}>
        <Text style={styles.header_text}>{chapters.name}</Text>
      </View>
        <FlatList style={styles.body}
                data={chapters.tasks}
                кey={(item) => item}
                renderItem={({item}) => (
                  <TouchableOpacity
                  style={styles.task}
                  onPress={() => navigation.navigate("TaskPage", item.id)}
                >
                  <CardTask_board navigation={navigation} task={item} />
                </TouchableOpacity>)}/>
      <IconButton
        style={styles.icon_plus}
        onPress={() => navigation.navigate("AddTask", chapters)}
        icon={(props) => <Icon name="plus" {...props} color="#fefefe" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  BoardList: {
    backgroundColor: "#CDDCA1",
    width: 342,
    marginTop: 29,
    borderRadius: 30,
    display: "flex",
    flexDirection: "column",
  },

  icon_plus: {
    width: 44,
    height: 44,
    borderRadius: 40,
    backgroundColor: "#EB5093",
    alignSelf: "center",
    marginBottom: 16,
  },
  task: {},

  header: {
    display: "flex",
    flexDirection: "row",
    width: 342,
    justifyContent: "center",
    marginTop: 16,
    alignItems: "center",
    height: 19,
  },
  body: {
    alignSelf: "center",
    gap: 16,
    marginVertical: 16,
  },

  header_text: {
    fontSize: 16,
    color: "#1c1c1c",
    fontWeight: "600",
    alignSelf: "center",
  },

  icon_header: {},
});

export default BoardList;
