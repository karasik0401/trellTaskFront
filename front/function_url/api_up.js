URL=API_URL

const registerUser = (username, email, password, re_password) => {
    
    return fetch(`${URL}/api/v1/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, re_password }),
    }).then(checkResponse);
  };

  const handleSubmit = () => {
    checkValid()&&
    registerUser(userData.login, userData.email, userData.password, userData.re_password)
      .then((res) =>  {
        if (res.status === 201) {
          navigation.navigate('Profile');
        }
      })
      .catch((err) => {
        console.log(err)
        if (err.non_field_errors){
          Alert.alert("Пароли не совпадают");
        }
        else if (err.password){
          Alert.alert("Пароль слишком простой");
        }
        else if (err.username){
          if (err.username[0] === "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.")
            Alert.alert("Введите коректный логин. Он может содержать только буквы, цифры, и @/./+/-/_");
          else {
            Alert.alert("Пользователь с таким логином уже существует");
          }
        }
        else if (err.email){
          Alert.alert("Клиент с такой почтой уже существует");
        }
      });
  
    };