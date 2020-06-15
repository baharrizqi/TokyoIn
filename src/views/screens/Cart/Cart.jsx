import React from 'react'
import "./Cart.css"
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { connect } from "react-redux";
import { priceFormatter } from "../../../supports/helpers/formatter";

class Cart extends React.Component {
    state = {
        cartData: [],
        ongkir: "instant",
    }
    getCartData = () => {
        console.log(this.props.user.id)
        const userId = this.props.user.id
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: this.props.user.id,
                _expand: "product",
            }
        })
            .then((res) => {
                console.log(res.data)
                this.setState({ cartData: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    };
    renderCartData = () => {
        return this.state.cartData.map((val, idx) => {
            const { quantity, product, id } = val
            const { productName, category, price, disc, desc, image, merek } = product
            let discHarga = (price - (price * (disc / 100)))
            return (
                <tr style={{ height: "140px" }}>
                    <th>{idx + 1}</th>
                    <td>
                        <div className="row">
                            <div className="col-sm-4">
                                <img className="img-thumbnail" src={image} alt="" />
                            </div>
                            <div className="col-sm-8">
                                <h5>{productName}</h5>
                                <i class="fas fa-trash bg-danger logo-trash" onClick={() => this.deleteCartHandler(id)}></i>
                            </div>
                        </div>
                    </td>
                    <td>
                        {
                            disc > 0 ?
                                (
                                    <>
                                        <span style={{ textDecoration: "line-through", color: "grey", fontSize: "14px" }}>
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(price)}
                                        </span>
                                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(discHarga)}</p>
                                    </>
                                ) :
                                <p style={{ fontSize: "14px", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(price)}</p>
                        }
                    </td>
                    <td>{quantity}</td>
                    <td>
                        {
                            disc > 0 ?
                                (
                                    <>
                                        <p style={{ fontSize: "14px", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(discHarga * quantity)}</p>
                                    </>
                                ) :
                                <p style={{ fontSize: "14px", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(price * quantity)}</p>
                        }
                    </td>
                </tr>
            )
        })
    }
    renderSubTotalPrice = () => {
        let totalPrice = 0;

        this.state.cartData.forEach((val) => {
            const { quantity, product } = val;
            const { price, disc } = product;
            let discHarga = (price - (price * (disc / 100)))
            if (discHarga) {
                totalPrice += quantity * discHarga;
            } else {
                totalPrice += quantity * price;
            }

        });

        return totalPrice;
    }

    renderTotalPrice = () => {
        let totalPrice = 0;

        this.state.cartData.forEach((val) => {
            const { quantity, product } = val;
            const { price,disc } = product;
            let discHarga = (price - (price * (disc / 100)))
            if (discHarga) {
                totalPrice += quantity * discHarga;
            } else {
                totalPrice += quantity * price;
            }
        });

        let shippingPrice = 0;

        switch (this.state.ongkir) {
            case "instant":
                shippingPrice = 100000;
                break;
            case "sameDay":
                shippingPrice = 50000;
                break;
            case "express":
                shippingPrice = 20000;
                break;
            default:
                shippingPrice = 0;
                break;
        }
        return priceFormatter(totalPrice + shippingPrice);
    }
    deleteCartHandler = (id) => {
        Axios.delete(`${API_URL}/carts/${id}`)
            .then((res) => {
                this.getCartData()
                this.props.fillCart(this.props.user.id);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    renderOngkirPrice = () => {
        switch (this.state.ongkir) {
            case "instant":
                return priceFormatter(100000);
            case "sameDay":
                return priceFormatter(50000);
            case "express":
                return priceFormatter(20000);
            default:
                return "Free";
        }
    }
    tes = () => {
        alert(this.props.user.id)
    }
    componentDidMount() {
        this.getCartData()
    }
    render() {
        if (this.state.cartData.length) {
            return (
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">No</th>
                                                <th style={{ width: "70%" }} scope="col">Product</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderCartData()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead className="text-center">
                                            <tr>
                                                <th colspan="2">
                                                    <h3>RINGKASAN</h3>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Subtotal</th>
                                                <td>{priceFormatter(this.renderSubTotalPrice())}</td>
                                            </tr>
                                            <tr>
                                                <th>Pengiriman</th>
                                                <td>{this.renderOngkirPrice()}</td>
                                            </tr>
                                            <tr>
                                                <th>Metode Pengiriman</th>
                                                <td>
                                                    {/* <label>Shipping Method</label> */}
                                                    <select
                                                        onChange={(e) =>
                                                            this.setState({ ongkir: e.target.value })
                                                        }
                                                        className="form-control w-100"
                                                    >
                                                        <option value="instant">Instant 3-4 Jam</option>
                                                        <option value="sameDay">Same Day 6-8 Jam</option>
                                                        <option value="express">Express 1-2 Hari</option>
                                                        <option value="economy">Economy 3-5 Hari</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Total</th>
                                                <td>{this.renderTotalPrice()}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>

                                        </tfoot>
                                    </table>
                                    <button style={{ width: "100%" }} type="button" class="btn btn-success">Checkout</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )
        } else {
            return (
                <div className="container py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="alert alert-info">Shopping Cart Empty</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Cart)