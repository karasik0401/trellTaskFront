import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AddCheckList from "../Widget/AddCheckList";
import AddConsumer from "../Widget/AddConsumer";
import { useIsFocused } from '@react-navigation/native';
import { REACT_APP_API_URL } from '@env';
import { CreateTask, updateTask } from "../api";

const API_URL = REACT_APP_API_URL;

PRIORITY = {
  0: "#7BB558",
  1: "#ED863B",
  2: "#E55050"
}

function AddTask(props) {
  const {navigation} = props;
  const [userData, setUserData] = React.useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleConsumer, setModalVisibleConsumer] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [priority, setPriority] = useState(-1);
  const [assignees, setAssignees] = useState([])
  const [checkList, setCheckList] = useState({})

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onChangeInput = (e, name) => {
    setUserData({
      ...userData,
      [name]: e.nativeEvent.text,
    });
  };

  const handleOnSave = (data) => {
    setCheckList(data);
  }

  const handleConfirmPriority = (priority) => {
    setPriority(priority)
    setModalVisible(!modalVisible)
  }

  const handleSubmitConsumer = (assignees) => {
    setAssignees({assignees})
    setModalVisibleConsumer(!modalVisibleConsumer);
  }

  // const checkResponse = (res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return res.json().then((err) => Promise.reject(err));
  // };

  const handleSubmit = () => {
    createTask();
    navigation.navigate("HomePage");
  }

  // const updateTask = (data) => {
  //     return fetch(`${API_URL}/api/tasks/${data}/`, {
  //       method: 'PATCH',
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Token ${auth_token}`,
  //       },
  //       body: JSON.stringify({check_list: checkList, assignees: assignees.assignees.assignees}),
  //       })
  //       .then(checkResponse)
  //       };

  const createTask = () => {
    let formData = new FormData();
        if (selectedDate) {
          const year = selectedDate.getFullYear();
          const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
          const day = ("0" + selectedDate.getDate()).slice(-2);
          formData.append('deadline', `${year}-${month}-${day}`)
        }
        if (userData.name) {
          formData.append('name', userData.name)
        }
        if (userData.description) {
          formData.append('description', userData.description)
        }
        if (priority !== -1) {
          formData.append('priority', priority)
        }
        formData.append('chapter', props.route.params.id)
        CreateTask().then(checkResponse).then((res) => updateTask(res.id))}
        
    

  const isFocused = useIsFocused();
  useEffect(() => {
  }, [checkList, isFocused, assignees, priority]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_row}>
          <IconButton
            style={styles.icon_header}
            onPress={() => navigation.navigate("HomePage")}
            icon={(props) => (
              <Icon name="arrow-left" {...props} color="#1C1C1C" />
            )}
          />
        </View>

        <IconButton
          style={styles.icon_header_add}
          onPress={() => handleSubmit()}
          icon={(props) => <Icon name="arrow-up" {...props} color="#FEFEFE" />}
        />
      </View>
      <TextInput
        style={styles.title}
        onChange={(e) => onChangeInput(e, "name")}
        placeholder="Название задачи"
        fontSize={24}
        type="text"
        placeholderTextColor="#828282"
        id={1}
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        <TextInput
          style={styles.discription}
          onChange={(e) => onChangeInput(e, "description")}
          placeholder="Введите описание"
          fontSize={16}
          editable
          returnKeyType="done"
          multiline={true}
          blurOnSubmit={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          type="text"
          placeholderTextColor="#828282"
          id={2}
        />

        <AddCheckList checkList={checkList} onSave={handleOnSave}/>

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
                backgroundColor: PRIORITY[priority],
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConsumer}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewChapter}>
            {assignees ? <AddConsumer task={{assignees, board_id: props.route.params.board}} onSave={handleSubmitConsumer}/>: null}
          </View>
          {/* <Pressable
            style={[styles.buttonCons, styles.buttonCloseCons]}
            onPress={() => setModalVisibleConsumer(!modalVisibleConsumer)}
          >
            <Text style={styles.textStyleCons}>Готово</Text>
          </Pressable> */}
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
    marginBottom: 16,
  },

  discription: {
    width: 342,
    marginTop: 0,
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

  icon_header: {
    width: 30,
    height: 30,
    backgroundColor: "#FEFEFE",
  },
  icon_header_add: {
    width: 30,
    height: 30,
    backgroundColor: "#EB5093",
  },

  icon_taskfooter: {
    width: 30,
    height: 30,
    marginRight: 12,
  },

});

export default AddTask;
