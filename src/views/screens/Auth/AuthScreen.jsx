import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

// import TextField from "../../components/TextField/TextField";
import ButtonUI from "../../components/Button/Button";
import "./AuthScreen.css";

// actions
import { registerHandler, loginHandler } from "../../../redux/actions";

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
    },
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
    const { username, fullName, password, email } = this.state.registerForm;
    let newUser = {
      username,
      fullName,
      password,
      email,
    };

    this.props.onRegister(newUser);
  };

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;
    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);
  };

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
            style={{width:"450px"}} 
            class="form-control mt-5" 
            type="text" 
            placeholder="Username"
            value={this.state.registerForm.username}
            onChange={(e)=> this.inputHandler(e,"username","registerForm")}/>
          <input 
            style={{width:"450px"}} 
            class="form-control mt-2" 
            type="text" 
            placeholder="Name"
            value={this.state.registerForm.fullName}
            onChange={(e) => this.inputHandler(e, "fullName", "registerForm")}/>
          <input 
            style={{width:"450px"}} 
            class="form-control mt-2" 
            type="text" 
            placeholder="Email"
            value={this.state.registerForm.email}
            onChange={(e) => this.inputHandler(e, "email", "registerForm")}/>
          <input 
            style={{width:"450px"}} 
            class="form-control mt-2" 
            type={this.state.registerForm.showPassword ? "text" : "password"} 
            placeholder="Password"
            onChange={(e) => this.inputHandler(e, "password", "registerForm")}/>
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
            style={{width:"450px"}} 
            class="form-control mt-5" 
            type="text" 
            placeholder="Username"
            value={this.state.loginForm.username}
            onChange={(e) => this.inputHandler(e, "username", "loginForm")}/>
          <input 
            style={{width:"450px"}} 
            class="form-control mt-2"
            type="text" 
            placeholder="Password"
            value={this.state.loginForm.password}
            onChange={(e) => this.inputHandler(e, "password", "loginForm")}/>
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
    return (
      <center>
      <div style={{backgroundColor:"#F5F5F5"}}>
      <div className="container p-5"> 
          <div className="p-4" style={{border:"3px solid #FFD700",width:"500px",outline: "solid 5px"}} >
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
              <ButtonUI type="contained">
              Log
              </ButtonUI>
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
