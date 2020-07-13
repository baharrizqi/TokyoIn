import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import { connect } from 'react-redux'
import ButtonUI from '../../components/Button/Button'
import swal from 'sweetalert'


class Pesanan extends React.Component {
    state = {
        pesananList: [],
        selectedFile: null,
    }
    getPesananList = () => {
        Axios.get(`${API_URL}/transaction/fillTransaction/${this.props.user.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ pesananList: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] })
    }
    uploadBktTrfHandler = (transactionId) => {
        if (this.state.selectedFile == null) {
            swal("Gagal!", "Belum pilih file Upload", "error")
        }
        else {
            let formData = new FormData();
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
            Axios.post(`${API_URL}/transaction/uploadBktTrf/${transactionId}`, formData)
                .then((res) => {
                    console.log(res.data)
                    this.getPesananList()
                })
                .catch((err) => {
                    console.log("ERROR")
                    console.log(err)
                })
        }
    }
    renderPesananList = () => {
        return this.state.pesananList.map((val, idx) => {
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.status}</td>
                        <td>{val.jasaPengiriman}</td>
                        <td>{val.statusPengiriman}</td>
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
                        <td>
                            {
                                val.bktTrf ? (
                                    <img width="100px" src={val.bktTrf} alt="" />
                                ) : (
                                        <>
                                            <input onChange={this.fileChangeHandler} type="file" />
                                            <ButtonUI
                                                onClick={()=>this.uploadBktTrfHandler(val.id)}
                                                className="mt-2" type="contained">
                                                Upload
                                            </ButtonUI>
                                        </>
                                    )
                            }
                        </td>
                    </tr>
                </>
            )
        })
    }
    componentDidMount() {
        this.getPesananList()
    }


    render() {
        return (
            <div className="py-5">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Status</th>
                            <th scope="col">Jasa Pengiriman</th>
                            <th scope="col">Status Pengiriman</th>
                            <th scope="col">Tanggal Belanja</th>
                            <th scope="col">Tanggal Selesai</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Transaksi Detail</th>
                            <th scope="col">Bukti Transfer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPesananList()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(Pesanan)