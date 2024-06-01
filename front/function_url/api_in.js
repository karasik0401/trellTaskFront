URL=API_URL

const loginUser = (username, password) => {
  return fetch(`${URL}/api/v1/auth/token/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(checkResponse)
    .then((data) => {
      if (data) {
        global.auth_token = data.auth_token;
        return data;
      }
      return null;
    });
};

const handleSubmit = () => {
    checkValid() &&
    loginUser(userData.username, userData.password)
    .then((res) => {
      if (res) {
        navigation.navigate('HomePage')
      }
    })
    .catch((err) => {
        Alert.alert("Неверное имя пользователя или пароль");
      }
    );

  };
