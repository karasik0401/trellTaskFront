URL = API_URL;

  API_ENDPOINT = `${URL}/api/v1/posts/`;

  

  const pushPost = (data) => {
    return fetch(`http://192.168.1.101:8000/api/v1/posts/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Token ${auth_token}`,
         },
         body: data,
    }).then(checkResponse)
  };

  const handleSubmit = () => {
    let formData = new FormData();
    if (checkValid()){
        formData.append('image', {
            uri: Platform.OS === 'ios' ?
            image.assets[0].uri.replace('file://', ''):
            image.assets[0].uri,
            type: image.assets[0].type,
            name: image.assets[0].fileName
          })
            pushPost(formData)
            .then((res) => {
                if(res) {
                    navigation.navigate('MainPage')
                }
            })
            .catch((err) => {
                console.log(err)
            })
       
    }
    
  }
