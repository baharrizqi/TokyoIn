import React from 'react'
import "./Payment.css"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert'


class Payment extends React.Component {
    state = {
        paymentPendingList: [],
        paymentAcceptList: [],
        paymentRejectList: [],
    }
    getPaymentList = () => {
        Axios.get(`${API_URL}/transaction/readTransaction`)
            .then((res) => {
                console.log(res.data)
                res.data.map((val) => {
                    if (val.status == "pending") {
                        this.setState({
                            paymentPendingList: [...this.state.paymentPendingList, val]
                        })
                    } else if (val.status == "accepted") {
                        this.setState({
                            paymentAcceptList: [...this.state.paymentAcceptList, val]
                        })
                    } else {
                        this.setState({
                            paymentRejectList: [...this.state.paymentRejectList, val]
                        })
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderPaymentList = () => {
        if (this.state.paymentPendingList.length == 0) {
            return (
                <div>
                    <h2>EMPTY</h2>
                </div>
            )
        }
        return this.state.paymentPendingList.map((val, idx) => {
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.user.username}</td>
                        <td>{val.status}</td>
                        <td>{val.jasaPengiriman}</td>
                        <td>{val.tanggalBelanja}</td>
                        <td>{val.totalPrice}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Nama</td>
                                        <td>Jenis</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td>totalPrice</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.transactionDetails.map((val, idx) => {
                                        if (!val.paket) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.product.productName}</td>
                                                        <td>Product</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.paket.paketName}</td>
                                                        <td>Paket</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </td>
                        {
                            val.bktTrf ? (
                                <>
                                    <td>
                                        <img width="100px" src={val.bktTrf} alt="" />
                                    </td>
                                    <td>
                                        <button 
                                        onClick={()=>this.accBtnHandler(val.id)}
                                        type="button" class="btn btn-success w-100">Accept</button>
                                        <button
                                            onClick={() => this.rejectBtnHandler(val.id)}
                                            type="button" class="btn btn-danger mt-2 w-100">Reject</button>
                                    </td>
                                </>
                            ) : (
                                    <>
                                        <td>
                                            <p>Belum ada Bukti Transfer</p>
                                        </td>
                                    </>
                                )
                        }
                    </tr>
                </>
            )
        })
    }
    renderPaymentAcceptList = () => {
        if (this.state.paymentAcceptList.length == 0) {
            return (
                <>
                    <div className="">
                        <h2>EMPTY</h2>
                    </div>
                </>
            )
        }
        return this.state.paymentAcceptList.map((val, idx) => {
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.user.username}</td>
                        <td>{val.status}</td>
                        <td>{val.jasaPengiriman}</td>
                        <td>{val.tanggalBelanja}</td>
                        <td>{val.tanggalSelesai}</td>
                        <td>{val.totalPrice}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Nama</td>
                                        <td>Jenis</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td>totalPrice</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.transactionDetails.map((val, idx) => {
                                        if (!val.paket) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.product.productName}</td>
                                                        <td>Product</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.paket.paketName}</td>
                                                        <td>Paket</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </td>

                        {
                            val.bktTrf ? (
                                <>
                                    <td>
                                        <img width="100px" src={val.bktTrf} alt="" />
                                    </td>
                                </>
                            ) : null
                        }
                    </tr>
                </>
            )
        })
    }
    renderPaymentRejectList = () => {

        if (this.state.paymentRejectList.length == 0) {
            return (
                <>
                    <tr>
                        <td rowSpan={4}>
                            <h2 className="App">EMPTY</h2>
                        </td>
                    </tr>
                </>
            )
        }
        return this.state.paymentRejectList.map((val, idx) => {
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.user.username}</td>
                        <td>{val.status}</td>
                        <td>{val.jasaPengiriman}</td>
                        <td>{val.tanggalBelanja}</td>
                        <td>{val.totalPrice}</td>
                        <td>
                            <table>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Nama</td>
                                        <td>Jenis</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td>totalPrice</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.transactionDetails.map((val, idx) => {
                                        if (!val.paket) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.product.productName}</td>
                                                        <td>Product</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                        else {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{idx + 1}</td>
                                                        <td>{val.paket.paketName}</td>
                                                        <td>Paket</td>
                                                        <td>{val.quantity}</td>
                                                        <td>{val.price}</td>
                                                        <td>{val.totalPrice}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </>
            )
        })
    }
    rejectBtnHandler = (id) => {
        Axios.put(`${API_URL}/transaction/rejectTrf/${id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ paymentPendingList: [], paymentRejectList: [], paymentAcceptList: [] })
                this.getPaymentList()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    getTime = () => {
        let dateNow = new Date()
        let time = dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
        return dateNow.toLocaleString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) + "-" + time
    }
    accBtnHandler = (id) => {
        Axios.put(`${API_URL}/transaction/accTrf/${id}?tanggalSelesai=${this.getTime()}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ paymentPendingList: [], paymentRejectList: [], paymentAcceptList: [] })
                this.getPaymentList()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        this.getPaymentList()
    }
    render() {
        return (
            <div className=" py-5">
                <div class="accordion" id="accordionExample">
                    <div class="card">
                        <div class="header-card-payment" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <b><h2 className="text-white">PENDING</h2></b>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <table class="table table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Jasa Pengiriman</th>
                                            <th scope="col">Tanggal Belanja</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Transaksi Detail</th>
                                            <th scope="col">Bukti Transfer</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPaymentList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="header-card-payment" id="headingTwo">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <b><h2 className="text-white">ACCEPTED</h2></b>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div class="card-body">
                                <table class="table table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Jasa Pengiriman</th>
                                            <th scope="col">Tanggal Belanja</th>
                                            <th scope="col">Tanggal Selesai</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Transaksi Detail</th>
                                            <th scope="col">Bukti Transfer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPaymentAcceptList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="header-card-payment" id="headingThree">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <b><h2 className="text-white">REJECTED</h2></b>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                <table class="table table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Jasa Pengiriman</th>
                                            <th scope="col">Tanggal Belanja</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Transaksi Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderPaymentRejectList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment