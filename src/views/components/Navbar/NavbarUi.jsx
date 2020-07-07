import React, { useState } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
    Form,
    Dropdown,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
// import animasiGif from "../../../assets/images/animasiGif.gif"
import { connect } from "react-redux";
import { logoutHandler } from "../../../redux/actions";
import ButtonUI from '../Button/Button';
// import {nav,form,input} from "bootstrap"
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { loginHandler } from "../../../redux/actions";
import Cookies from "universal-cookie";


class NavbarUi extends React.Component {
    state = {
        searchBarIsFocused: false,
        searcBarInput: "",
        dropdownOpen: false,
        setIsOpen: false,
        isOpen: false,
        setCollapsed: true,
        collapsed: true,
        loginForm: {
            username: "",
            password: "",
            showPassword: false,
        },
    };
    setCollapsed = () => {
        this.setState({ setCollapsed: true })
    }

    toggleNavbar = () => this.setCollapsed(!this.state.collapsed);
    toggle = () => this.setIsOpen(!this.state.isOpen);

    toggleDropdown = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };
    logoutBtnHandler = () => {
        this.props.onLogout();
    };

    // loginBtnHandler = () => {
    //     const { username, password } = this.state.loginForm;
    //     let newUser = {
    //       username,
    //       password,
    //     };

    //     this.props.onLogin(newUser);
    // }
    loginBtnHandler = () => {
        this.props.onLogin(this.state.loginForm)
    }
    // componentDidUpdate() {
    //     if (this.props.user.id) {
    //       const cookie = new Cookies();
    //       cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    //     }
    // }

    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }

    render() {
        return (
            <>
                <div className="py-4">
                    <div>
                        {/* <img src={animasiGif} style={{height:"150px",width:"100%"}} alt=""/> */}
                        <nav class="navbar navbar-expand-lg navbar-light fixed-top bg-warning ">
                            <img src="https://cdn.cnn.com/cnnnext/dam/assets/180926161922-gadget-logo-large-169.png" width="90" height="70"
                                class="d-inline-block align-top" alt="" />
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                                <a class="navbar-brand ml-2" href="/">GADGET</a>
                                <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ">
                                    <li class="nav-item">
                                        <a class="nav-link" href="/">BERANDA <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/product">PRODUK</a>
                                    </li>
                                    {this.props.user.id ? (
                                        <>
                                            <li class="nav-item">
                                                <a class="nav-link" href="/cart"><i class="fas fa-shopping-cart">{" "}{this.props.user.cartItems}</i></a>
                                            </li>
                                        </>
                                    ) :
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                AKUN
                                            </a>
                                            <div style={{ width: "300px" }} class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <div className="p-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        value={this.state.loginForm.username}
                                                        onChange={(e) => this.inputHandler(e, "username", "loginForm")}
                                                        placeholder="Username" />
                                                    <input
                                                        type="text"
                                                        class="form-control mt-2"
                                                        value={this.state.loginForm.password}
                                                        onChange={(e) => this.inputHandler(e, "password", "loginForm")}
                                                        placeholder="Password" />
                                                    <ButtonUI
                                                        style={{ width: "280px" }}
                                                        className="mt-2"
                                                        type="contained"
                                                        onClick={this.loginBtnHandler}>
                                                        Login
                                                </ButtonUI>
                                                </div>
                                                <a class="dropdown-item" href="/auth">Belum punya akun? Daftar Disini</a>
                                            </div>
                                        </li>
                                    }
                                </ul>
                                {
                                    this.props.user.id ? (
                                        <>
                                            <Dropdown
                                                toggle={this.toggleDropdown}
                                                isOpen={this.state.dropdownOpen}
                                            >
                                                <DropdownToggle tag="div" className="d-flex">
                                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                                                    <p className="small ml-3 mr-4">{this.props.user.username}</p>
                                                </DropdownToggle>
                                                <DropdownMenu className="mt-2">
                                                    {
                                                        this.props.user.role == "admin" ? (
                                                            <>
                                                                <DropdownItem>
                                                                    <Link
                                                                        style={{ color: "inherit", textDecoration: "none" }}
                                                                        to="/admin/dashboard"
                                                                    >
                                                                        Dashboard
                                                                </Link>
                                                                </DropdownItem>
                                                                <Link to="/members">
                                                                    <DropdownItem>Members</DropdownItem>
                                                                </Link>
                                                                <Link to="/payments">
                                                                    <DropdownItem>Payments</DropdownItem>
                                                                </Link>
                                                                <Link to="/report">
                                                                    <DropdownItem>Report</DropdownItem>
                                                                </Link>
                                                            </>
                                                        ) :
                                                            (
                                                                <>
                                                                    <Link to="/profile">
                                                                        <DropdownItem>Profile</DropdownItem>
                                                                    </Link>
                                                                    <Link to="/">
                                                                        <DropdownItem>Wishlist</DropdownItem>
                                                                    </Link>
                                                                </>
                                                            )
                                                    }
                                                    <DropdownItem>
                                                        <img
                                                            class="float-left"
                                                            style={{ width: "40px", height: "30px" }}
                                                            src="https://image.flaticon.com/icons/svg/1828/1828479.svg"
                                                            alt=""
                                                            onClick={this.logoutBtnHandler} />
                                                        <span onClick={this.logoutBtnHandler}>Logout</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </>
                                    ) :
                                        null
                                }
                                <form class="form-inline">
                                    <input type="text" style={{ width: "250px" }} class="form-control" placeholder="Cari produk impianmu disini" />
                                </form>
                            </div>
                        </nav>
                    </div>
                    {/* <hr style={{backgroundColor:"red",height:"10px"}}/> */}
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    onLogout: logoutHandler,
    // onChangeSearch: navbarInputHandler,
    onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUi)