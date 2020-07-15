import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import swal from "sweetalert";
import Wallpaper2 from '../../../assets/images/Background/Wallpaper2.jpg'

const gambarBg = {
    backgroundImage: `url(${Wallpaper2})`,
}

class ForgetPass extends React.Component {
    state = {
        formRecoverPass: {
            username: this.props.match.params.username,
            password: "",
        }
    }
    recoverPassHandler = () => {
        Axios.put(`${API_URL}/users/editForgetPass`, this.state.formRecoverPass)
            .then((res) => {
                console.log(res.data)
                swal("Good job!", "Category bertambah ke product", "success");
            })
            .catch((err) => {
                console.log(err)
            })
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
    // #F5F5F5
    render() {
        return (
            <div style={gambarBg}>
                <div className="container py-5">
                    <center>
                        <div className="p-4 mb-4" style={{ border: "3px solid #FFD700", width: "500px", outline: "solid 5px",backgroundColor:"rgb(211, 208, 225,0.4)" }}>
                            <h3>{this.props.match.params.username}</h3>
                            <p className="mt-4">
                                Welcome back.
                        <br /> Please, fill new password 
                            </p>
                            <input
                                style={{ width: "450px" }}
                                class="form-control mt-2"
                                type="text"
                                placeholder="Password Baru"
                                onChange={(e) => this.inputHandler(e, "password", "formRecoverPass")}
                            />
                            <div className="d-flex justify-content-center">
                                <button
                                    onClick={this.recoverPassHandler}
                                    class="button mt-4"><span>Click</span></button>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )
    }
}

export default ForgetPass