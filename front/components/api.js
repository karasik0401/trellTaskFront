import {REACT_APP_API_URL} from "@env";
const API_URL = REACT_APP_API_URL

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  };

export const CreateTask = (data) => {
    return fetch(`${API_URL}/api/tasks/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Token ${auth_token}`,
        },
        body: formData
    });
};

export const CreateBoard = (data) => {
    return fetch(`${API_URL}/api/boards/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Token ${auth_token}`,
        },
        body: formData
    });
};

export const updateTask = (data) => {
    return fetch(`${API_URL}/api/tasks/${data}/`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
      },
      body: JSON.stringify({check_list: checkList, assignees: assignees.assignees.assignees}),
      })
      .then(checkResponse)
    };
export const getBoard = (boardId) => {
    return fetch(`${API_URL}/api/boards/${boardIds}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
}

export const postChapter = (name, boardId) => {
    return fetch(`${API_URL}/api/chapters/`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify({ name, boardId }),
    })
        .then(checkResponse)
    };

export const GetUsersList = () => {
    return fetch(`${API_URL}/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Token ${auth_token}`,
        },
      });
}

export const createFollow = (following) => {
    return fetch(`${API_URL}/api/follow/`, {
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
        },
        body: JSON.stringify({ following }),
    });
}

export const deleteFollow = (following) => {
    return fetch(`${API_URL}/api/follow/${following}/delete/`, {
        method: 'DELETE',
        headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
        },
    });
}

export const getUsersTasks = () => {

    return fetch(`${API_URL}/api/tasks/users_tasks/`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
        },
    });
}

export const getUsersBoards = () => {
    return fetch(`${API_URL}/api/boards/`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${auth_token}`,
        },
    });
}

export const getUser = () => {
    return fetch(`${API_URL}/api/users/me/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Token ${auth_token}`,
      },
    }).then(checkResponse)
};


export const ChengeUser = (data) => {
    return fetch(`${API_URL}/api/users/me/`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Token ${auth_token}`,
        },
        body: data
    }).then(checkResponse)
};

export const loginUser = (username, password) => {
    return fetch(`${API_URL}/api/auth/token/login/`, {
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

export const registerUser = (username, email, password, re_password) => {
    return fetch(`${API_URL}/api/users/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, re_password}),
    }).then(checkResponse);
  };

export const getTask = (taskId) => {
  return fetch(`${API_URL}/api/tasks/${taskId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Token ${auth_token}`,
    },
  });
}