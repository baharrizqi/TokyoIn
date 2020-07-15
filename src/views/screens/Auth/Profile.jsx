import React from 'react'
import { connect } from "react-redux";
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import { logoutHandler,changeProfile } from '../../../redux/actions'
import { Redirect } from 'react-router-dom'
import Wallpaper2 from '../../../assets/images/Background/Wallpaper2.jpg'
import swal from 'sweetalert'

const gambarBg = {
    backgroundImage: `url(${Wallpaper2})`,
}
class Profile extends React.Component {
    state = {
        editProfile: {
            id: this.props.user.id,
            username: this.props.user.username,
            fullName: this.props.user.fullName,
            email: this.props.user.email,
            address: this.props.user.address,
            noTelp: this.props.user.noTelp,
        },
        editPassword: {
            oldPassword: "",
            showOldPassword: false,
            newPassword: "",
            showNewPassword: false,
        },
        ubahPassword: false,
    }
    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    };
    checkboxHandler = (e, field, form) => {
        const { checked } = e.target;

        console.log(checked);

        this.setState({
            [form]: {
                ...this.state[form],
                [field]: checked,
            },
        });
    };
    saveEditProfile = () => {
        Axios.put(`${API_URL}/users/editProfile`, this.state.editProfile)
            .then((res) => {
                console.log(res.data)
                swal("Good Job!", "Edit Profile berhasil", "success");
                this.props.changeProfile(res.data)
            })
            .catch((err) => {
                console.log(err)
                swal("Gagal!", err.response.data.message, "error");
            })
    }
    saveEditPass = () => {
        if (!this.state.editPassword.newPassword) {
            return swal("Gagal!", "Password Baru Belum Diisi", "error")
        }
        Axios.get(`${API_URL}/users/pass/${this.props.user.id}/${this.state.editPassword.oldPassword}/${this.state.editPassword.newPassword}`)
            .then((res) => {
                console.log(res.data)
                this.props.onLogout()
                this.setState({
                    ubahPassword: true
                })
            })
            .catch((err) => {
                console.log(err)
                swal("Gagal!", err.response.data.message, "error")
            })
    }
    render() {
        if (this.state.ubahPassword) {
            return <Redirect to="/" />
        }
        return (
            <div style={gambarBg}>
                <div className="container p-5">
                    <center>
                        <div className="p-4 mb-4" style={{ border: "3px solid #FFD700", width: "500px", outline: "solid 5px", backgroundColor: "rgb(211, 208, 225,0.4)" }}>
                            <img style={{ width: "100px" }} src="https://cdn.iconscout.com/icon/free/png-512/user-avatar-contact-portfolio-personal-portrait-profile-6-5623.png" alt="" />
                            <h3>{this.props.user.username}</h3>
                            {
                                this.props.user.isVerified == 1 ? (
                                    <>
                                        <h6>Verified</h6>
                                    </>
                                ) : (
                                    <>
                                    <h6>Not Verified</h6>
                                    </>
                                )
                            }
                            
                            <p className="mt-4">
                                Edit Profile
                            <br /> Please, Here!
                            </p>
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-5"
                                type="text"
                                placeholder="Username"
                                value={this.state.editProfile.username}
                                onChange={(e) => this.inputHandler(e, "username", "editProfile")} />
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type="text"
                                placeholder="Name"
                                value={this.state.editProfile.fullName}
                                onChange={(e) => this.inputHandler(e, "fullName", "editProfile")} />
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type="text"
                                placeholder="Alamat"
                                value={this.state.editProfile.address}
                                onChange={(e) => this.inputHandler(e, "address", "editProfile")} />
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type="text"
                                placeholder="No HP"
                                value={this.state.editProfile.noTelp}
                                onChange={(e) => this.inputHandler(e, "noTelp", "editProfile")} />
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type="text"
                                placeholder="Email"
                                value={this.state.editProfile.email}
                                onChange={(e) => this.inputHandler(e, "email", "editProfile")} />
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={this.saveEditProfile}
                                    class="button w-100 mt-4"><span>Save Profile</span></button>
                            </div>
                            <p className="mt-4">
                                Edit Password
                            <br /> Please, Here!
                            </p>
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type={this.state.editPassword.showOldPassword ? "text" : "password"}
                                placeholder="Old Password"
                                onChange={(e) => this.inputHandler(e, "oldPassword", "editPassword")} />
                            <input
                                type="checkbox"
                                onChange={(e) => this.checkboxHandler(e, "showOldPassword", "editPassword")}
                                className="mt-3"
                                name="showPasswordRegister"
                            />{" "}
                                Show Password
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type={this.state.editPassword.showNewPassword ? "text" : "password"}
                                placeholder="New Password"
                                onChange={(e) => this.inputHandler(e, "newPassword", "editPassword")} />
                            <input
                                type="checkbox"
                                onChange={(e) => this.checkboxHandler(e, "showNewPassword", "editPassword")}
                                className="mt-3"
                                name="showPasswordRegister"
                            />{" "}
                                Show Password
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={this.saveEditPass}
                                    class="button w-50 mt-4"><span>Save Password</span></button>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}
const mapDispatchToProps = {
    onLogout: logoutHandler,
    changeProfile,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)