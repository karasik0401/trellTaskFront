import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid
} from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import React, { useState, useEffect } from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import CheckList from "../Widget/CheckList";
import AddConsumer from "../Widget/AddConsumer";
import { color } from "@rneui/themed/dist/config";
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { getTask } from "../api";

const API_URL = REACT_APP_API_URL;

PRIORITY = {
  0: "#7BB558",
  1: "#ED863B",
  2: "#E55050"
}

function TaskPage(props) {
  const {navigation} = props;
  const [number, onChangeNumber] = React.useState("");
  const [task, setTask] = useState({assignees: []});
  const [checkList, setCheckList] = useState({some: true})
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConsumer, setModalVisibleConsumer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [refresh, setRefreshing] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const setRefresh = () => {
    setRefreshing(!refresh)
  }

  const checkResponse = (res) => {
    if (res.ok) {
      setRefresh();
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    updateTask({date: date});
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleSubmitConsumer = (assignees) => {
    updateTask({assignees})
    setModalVisibleConsumer(!modalVisibleConsumer);
  }

  const handleConfirmPriority = (priority) => {
    updateTask({priority})
    setModalVisible(!modalVisible)
  }

  const fetchTaskData = async() => {
    try {
      const response = await getTask(props.route.params);
      // fetch(`${API_URL}/api/tasks/${props.route.params}/`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     authorization: `Token ${auth_token}`,
      //   },
      // });
      const json = await response.json();
      setTask(json);
      setCheckList(json.check_list)
      setSelectedDate(new Date(json.deadline));
    }
    catch (error) {
      console.log(error);
      }
  };


  const updateTask = (data) => {
    let formData = new FormData();
        if (data.date) {
          const year = data.date.getFullYear();
          const month = ("0" + (data.date.getMonth() + 1)).slice(-2);
          const day = ("0" + data.date.getDate()).slice(-2);
          formData.append('deadline', `${year}-${month}-${day}`)
        }
        if (data.priority !== undefined) {
          formData.append('priority', data.priority)
        }
        if (data.done !== undefined) {
          formData.append('done', !data.done)
        }
        if (data.assignees !== undefined) {
          return fetch(`${API_URL}/api/tasks/${props.route.params}/`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
              authorization: `Token ${auth_token}`,
            },
            body: JSON.stringify(data.assignees),
        })
            .then(checkResponse)
        }
        else{return fetch(`${API_URL}/api/tasks/${props.route.params}/`, {
          method: 'PATCH',
          headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Token ${auth_token}`,
          },
          body: formData
      })
          .then(checkResponse)}
        
        };

  const isFocused = useIsFocused();
      useEffect(() => {
        const token = auth_token;
        if (token) {
          fetchTaskData();
        }
    }, [refresh, isFocused]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_row}>
          <IconButton
            style={styles.icon_header}
            onPress={() => navigation.navigate("HomePage")}
            icon={(props) => (
              <Icon name="arrow-left-circle" {...props} color="#FEFEFE" />
            )}
          />
          <Text style={styles.title}>{task.name}</Text>
        </View>

      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <Text style={styles.discription}>
          {task.description}
        </Text>
        {checkList && (<CheckList checkList={checkList} taskId={task.id} refresh={setRefresh}/>)}
        
        <View style={styles.footerTask}>
          <View style={styles.footerTask_row}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: -10,
              }}
            >
              <IconButton
                style={styles.icondate}
                onPress={showDatePicker}
                icon={(props) => (
                  <Icon name="calendar-month" {...props} color="#FEFEFE" />
                )}
              />
              <Text
                style={{ fontSize: 16, fontWeight: "normal", color: "#fefefe" }}
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "No date selected"}
              </Text>
            </TouchableOpacity>

            <View>
              <DateTimePickerModal
                date={selectedDate}
                isVisible={datePickerVisible}
                mode="date"
                display="inline"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>

          <View style={styles.footerTask_row}>
            <IconButton
              style={styles.icon_taskfooter}
              icon={(props) => (
                <Icon name="bookmark-outline" {...props} color="#FEFEFE" />
              )}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Выберите цвет метки</Text>
                  <Pressable
                    style={[styles.button, styles.buttonCloseGreen]}
                    onPress={() => handleConfirmPriority(0)}
                  >
                    <View style={styles.textStyle}></View>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonCloseOrange]}
                    onPress={() => handleConfirmPriority(1)}
                  >
                    <View style={styles.textStyle}></View>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonCloseRed]}
                    onPress={() => handleConfirmPriority(2)}
                  >
                    <View style={styles.textStyle}></View>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable
              style={{borderRadius: 20,
                padding: 10,
                elevation: 2,
                width: 80,
                height: 30,
                backgroundColor: PRIORITY[task.priority],
              }}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.textStyle}></View>
            </Pressable>
          </View>

          <View style={styles.footerTask_row}>
            <IconButton
              style={styles.icon_taskfooter}
              onPress={() => setModalVisibleConsumer(true)}
              icon={(props) => (
                <Icon name="account-plus-outline" {...props} color="#FEFEFE" />
              )}
            />
          </View>

          <View style={styles.footerTask_row}></View>
        </View>

       
      </ScrollView>
      
        <Pressable onPress={() => updateTask({done: task.done})} style={styles.pressableStyle}>
          {
          <Text style={ task.done ? styles.pressedTextStyle : styles.unPressedTextStyle}>
            {task.done ? 'Отменить выполнение' : 'Отметить как выполненное'}
          </Text>
          }
        </Pressable>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConsumer}
      >
              {task.assignees.map(assign => (
                    <Image
                    key={assign.id}
                    style={styles.circl}
                    source={assign.photo ? { uri: assign.photo } : require('../../img/Profile.png')}
                    />
                ))}
        <View style={styles.centeredView}>
          <View style={styles.modalViewChapter}>
            {task ? (<AddConsumer task={task} onSave={handleSubmitConsumer}/>): null}
          </View>
          
        </View>
        
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#1C1C1C",
  },

  fottxt: {
    fontSize: 16,
    color: "#FEFEFE",
    marginTop: 4,
  },
  row:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
},
row_circl:{
  display: 'flex',
  flexDirection: 'row',
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

  modalView: {
    marginTop: 420,
    alignSelf: "center",
    width: 180,
    height: 180,
    backgroundColor: "#FEFEFE",
    borderRadius: 30,
    padding: 16,
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

  pressableStyle:{
    width: 269,
    height: 40,
    backgroundColor: '#EB5093',
    borderRadius: 15,
    verticalAlign: "middle",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    marginBottom: 62
  },

  pressedTextStyle:{
    fontSize:18,
    color: "#F5F5F5",
    fontWeight: "500",
    marginTop: 8

  },

  unPressedTextStyle:{
    fontSize:18,
    color: "#F5F5F5",
    fontWeight: "500",
    marginTop: 8
  },

  modalViewChapter: {
    marginTop: 250,
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

  footerTask: {
    display: "flex",
    flexDirection: "column",
    marginTop: 32,
  },

  buttonCons: {
    borderRadius: 20,
    paddingVertical: 16,
    marginHorizontal: 40,
    marginTop: 24,
  },
  buttonOpenCons: {},
  buttonCloseCons: {
    backgroundColor: "#fff",
  },
  textStyleCons: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextCons: {
    marginBottom: 15,
    textAlign: "center",
  },

  footerTask_row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 18,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 80,
    height: 30,
    backgroundColor: "#7BB558",
  },
  buttonOpen: {
    backgroundColor: "#7BB558",
  },
  buttonCloseGreen: {
    backgroundColor: "#7BB558",
    marginBottom: 8,
  },
  buttonCloseRed: {
    backgroundColor: "#E55050",
    marginBottom: 8,
  },
  buttonCloseOrange: {
    backgroundColor: "#ED863B",
    marginBottom: 8,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  row_check: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 60,
    justifyContent: "space-between",
    verticalAlign: "middle",
    width: 393,
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 8,
  },

  header_row: {
    display: "flex",
    flexDirection: "row",
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#FEFEFE",
    marginLeft: 12,
  },

  discription: {
    width: 342,
    marginTop: 32,
    color: "#FEFEFE",
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
  },

  check_title: {
    fontSize: 16,
    fontWeight: 500,
  },

  checkbox: {
    marginTop: 32,
    backgroundColor: "#CDDCA1",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 30,
  },

  checkbox_bigrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  checkbox_row: {
    display: "flex",
    flexDirection: "row",
  },

  check_title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#1C1C1C",

    marginLeft: 8,
  },

  put_txt: {
    fontSize: 16,
    borderColor: "#C2C2C2",
    borderWidth: 1,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 294,
    alignContent: "center",
    paddingLeft: 8,
  },

  footer: {
    position: "absolute",
    justifyContent: "center",
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: 390,
    marginTop: -80,
    backgroundColor: "#1C1C1C",
    paddingTop: 8,
    height: 80,
  },

  icon_footer: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  icon: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#FEFEFE",
  },
  icon_header: {
    width: 30,
    height: 30,
  },

  icon_chb: {
    width: 22,
    height: 22,
  },

  icon_taskfooter: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  icon_title: {
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: "#8CA5AD",
  },



});

export default TaskPage;
