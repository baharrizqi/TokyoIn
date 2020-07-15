import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import userTypes from "../types/user";
import swal from "sweetalert";
import correctAnswer from "../../assets/music/Correct-answer.mp3"
import { Redirect } from "react-router-dom";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users/login`, userData)
      .then((res) => {
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data,
        });
        console.log(res.data)
        swal("Good Job!", "Berhasil Login", "success");
        Axios.get(`${API_URL}/carts/fillCart/${res.data.id}`)
          .then((res) => {
            dispatch({
              type: "FILL_CART",
              payload: res.data.length,
            });
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
        swal("Gagal Login", err.response.data.message, "error");
      })
  }
}

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/readUser/${userData.id}`)
      .then((res) => {
        dispatch({
          type: ON_LOGIN_SUCCESS,
          payload: res.data
        })
        Axios.get(`${API_URL}/carts/fillCart/${res.data.id}`)
          .then((res) => {
            dispatch({
              type: "FILL_CART",
              payload: res.data.length,
            });
          })
          .catch((err) => {
            console.log(err)
          })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}


export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/users`, { ...userData, role: "user" })
      .then((res) => {
        dispatch({
          type: "ON_REGISTER_SUCCESS",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};


export const changeProfile = (userData) => {
  return {
    type: ON_LOGIN_SUCCESS,
    payload: userData
  }
}

export const fillCart = (userId) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/carts/fillCart/${userId}`)
      .then((res) => {
        dispatch({
          type: "FILL_CART",
          payload: res.data.length,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

