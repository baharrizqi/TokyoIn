import userTypes from "../types/user";

const { ON_LOGIN_FAIL, ON_LOGIN_SUCCESS, ON_LOGOUT_SUCCESS } = userTypes;

const init_state = {
  id: 0,
  username: "",
  fullName: "",
  address: "",
  role: "",
  email:"",
  noTelp:"",
  isVerified: false,
  errMsg: "",
  cookieChecked: false,
  cartItems: 0,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { username, fullName, role,address,email,noTelp,verified, id } = action.payload;
      return {
        ...state,
        id,
        username,
        fullName,
        role,
        address,
        email,
        noTelp,
        isVerified:verified,
        cookieChecked: true,
      };
    // case "ON_REGISTER_SUCCESS":
    //   const { username, fullName, role, id } = action.payload;
    //   return {
    //     ...state,
    //     username,
    //     fullName,
    //     role,
    //     id,
    //   }
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case "ON_REGISTER_FAIL":
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case "COOKIE_CHECK":
      return { ...state, cookieChecked: true };
    case "FILL_CART":
      return { ...state, cartItems: action.payload };
    default:
      return { ...state };
  }
};
