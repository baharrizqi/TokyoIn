import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";

// actions
import { registerHandler, loginHandler } from "../../../redux/actions";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";
import Wallpaper2 from '../../../assets/images/Background/Wallpaper2.jpg'

const gambarBg = {
  // backgroundImage: `url(https://cdn.hipwallpaper.com/i/39/25/KvBq3V.jpg)`,
  backgroundImage: `url(${Wallpaper2})`,
}

class AuthScreen extends React.Component {
  state = {
    activePage: "register",
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
    registerForm: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      showPassword: false,
      address: "",
      noTelp: ""
    },
    formPassword: "",
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });

    console.log(e.target);

    // this.setState({ loginForm: {
    //   ...this.state.loginForm,
    //   [fieldYangDiganti]: value
    // }})
  };


  registerBtnHandler = () => {
    const { username, fullName, email, address, noTelp, password } = this.state.registerForm
    Axios.post(`${API_URL}/users`, this.state.registerForm)
      .then((res) => {
        console.log(res.data)
        alert("sukses")
      })
      .catch((err) => {
        console.log(err)
        swal("Gagal", err.response.data.message, "error");
      })
  }

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;
    // Axios.post(`${API_URL}/users/login`,this.state.loginForm)
    // .then((res)=> {
    //   console.log(res.data)
    //   alert("masuk")
    // })
    // .catch((err)=> {
    //   console.log(err)
    // })
    this.props.onLogin(this.state.loginForm)
  }


  checkboxHandler = (e, form) => {
    const { checked } = e.target;

    console.log(checked);

    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: checked,
      },
    });
  };

  recoverPasswordHandler = () => {
    if (this.state.formPassword == "") {
      swal("Gagal!", "Form belum diisi", "error");
    }
    Axios.get(`${API_URL}/users/forgetPass/${this.state.formPassword}`)
      .then((res) => {
        console.log(res.data)
        swal("Good Job!", "Request Recover Password has been sent your email", "success");
      })
      .catch((err) => {
        console.log(err)
        swal("Gagal!", err.response.data.message, "error");
      })
  }

  renderAuthComponent = () => {
    const { activePage } = this.state;
    if (activePage == "register") {
      return (
        <center>
          <div className="mt-5">
            <h3>Register</h3>
            <p className="mt-4">
              You will get the best recommendation for rent house in near of you
          </p>
            <input
              style={{ width: "450px" }}
              class="form-control mt-5"
              type="text"
              placeholder="Username"
              value={this.state.registerForm.username}
              onChange={(e) => this.inputHandler(e, "username", "registerForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type="text"
              placeholder="Name"
              value={this.state.registerForm.fullName}
              onChange={(e) => this.inputHandler(e, "fullName", "registerForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type="text"
              placeholder="Alamat"
              value={this.state.registerForm.address}
              onChange={(e) => this.inputHandler(e, "address", "registerForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type="text"
              placeholder="No HP"
              value={this.state.registerForm.noTelp}
              onChange={(e) => this.inputHandler(e, "noTelp", "registerForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type="text"
              placeholder="Email"
              value={this.state.registerForm.email}
              onChange={(e) => this.inputHandler(e, "email", "registerForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type={this.state.registerForm.showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => this.inputHandler(e, "password", "registerForm")} />
            <input
              type="checkbox"
              onChange={(e) => this.checkboxHandler(e, "registerForm")}
              className="mt-3"
              name="showPasswordRegister"
            />{" "}
          Show Password
          <div className="d-flex justify-content-center">
              <button
                onClick={this.registerBtnHandler}
                className="button mt-4"><span>Register</span></button>
            </div>
          </div>
        </center>
      );
    } else {
      return (
        <center>
          <div className="mt-5">
            <h3>Log In</h3>
            <p className="mt-4">
              Welcome back.
            <br /> Please, login to your account
          </p>
            <input
              style={{ width: "450px" }}
              class="form-control mt-5"
              type="text"
              placeholder="Username"
              value={this.state.loginForm.username}
              onChange={(e) => this.inputHandler(e, "username", "loginForm")} />
            <input
              style={{ width: "450px" }}
              class="form-control mt-2"
              type="text"
              placeholder="Password"
              value={this.state.loginForm.password}
              type={this.state.loginForm.showPassword ? "text" : "password"}
              onChange={(e) => this.inputHandler(e, "password", "loginForm")} />
            <input
              type="checkbox"
              onChange={(e) => this.checkboxHandler(e, "loginForm")}
              className="mt-3"
              name="showPasswordLogin"
            />{" "}
          Show Password
            <p data-toggle="modal" data-target="#myModal-1">
              Lupa Password ?
            </p>
            <div class="modal fade" id="myModal-1" role="dialog">
              <div style={{ marginTop: "100pt" }} class="modal-dialog modal-lg ">
                <div class="modal-content">
                  <div class="modal-body">
                    <h2>FORM LUPA PASSWORD</h2>
                    <input type="text" class="form-control" placeholder="username" onChange={(e) => this.setState({ formPassword: e.target.value })} />
                    <ButtonUI style={{ marginTop: "10px" }} type="contained" onClick={this.recoverPasswordHandler}>Recover Password</ButtonUI>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button
                onClick={this.loginBtnHandler}
                class="button mt-4"><span>Login</span></button>
            </div>
          </div>
        </center>
      );
    }
  };

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    // "#F5F5F5"
    return (
      <center>
        <div style={gambarBg}>
          <div className="container p-5">
            <div className="p-4" style={{ border: "3px solid #FFD700", width: "500px", outline: "solid 5px",backgroundColor:"rgb(211, 208, 225,0.4)" }} >
              <div className="d-flex flex-row justify-content-center">
                <button
                  type="button"
                  class={`auth-screen-btn ${
                    this.state.activePage == "register" ? "active" : null
                    }`}
                  onClick={() => this.setState({ activePage: "register" })}>Register</button>
                <button
                  type="button"
                  class={`ml-3 auth-screen-btn ${
                    this.state.activePage == "login" ? "active" : null
                    }`}
                  onClick={() => this.setState({ activePage: "login" })}>Login</button>
                {/* <ButtonUI
                className={`auth-screen-btn ${
                  this.state.activePage == "register" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "register" })}
              >
                Register
              </ButtonUI>
              <ButtonUI
                className={`ml-3 auth-screen-btn ${
                  this.state.activePage == "login" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "login" })}
              >
                Login
              </ButtonUI> */}
                {/* <ButtonUI type="contained">
                  Log
              </ButtonUI> */}
              </div>
              {this.props.user.errMsg ? (
                <div className="alert alert-danger mt-3">
                  {this.props.user.errMsg}
                </div>
              ) : null}
              {this.renderAuthComponent()}
            </div>
          </div>
        </div>
      </center>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onRegister: registerHandler,
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
