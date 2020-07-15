import React from 'react'
import CanvasJSReact from "../../../assets/canvas/canvasjs.react"
import Axios from 'axios';
import { API_URL } from '../../../constants/API';
import './Report.css'
import Wallpaper from '../../../assets/images/Background/Graphic.jpg'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const divStyle = {
    backgroundImage: `url(${Wallpaper})`,
    backgroundSize: 'contain' 
  };
class Report extends React.Component {
    state = {
        product: {
            title: {
                text: "Data Penjualan Product"
            },
            animationEnabled: true,
            data: [
                {
                    type: "column",
                    dataPoints: [

                    ]
                },
            ],
        },
        paket: {
            title: {
                text: "Data Penjualan Paket"
            },
            animationEnabled: true,
            data: [
                {
                    type: "column",
                    dataPoints: [

                    ]
                },
            ],
        },
        hargaMin: 0,
        hargaMax: 9999999999,
        categoryFilter: "",
        merekFilter: "",
        filterProduk: {
            cariProduk: "",
            orderBySold: "asc",
        },
        categoryList: [],
        kondisiScreen: 1,
    }
    
    componentDidMount() {
        // this.getProduct()
        this.filterReportProduct()
        this.getCategoryList()
        // this.getPaketAll()
        this.filterReportPaket()
    }
    renderCategoryList = () => {
        return this.state.categoryList.map((val) => {
            return (
                <option value={val.categoryName}>{val.categoryName}</option>
            )
        })
    }
    getProduct = () => {
        Axios.get(`${API_URL}/products/readProduct`)
            .then((res) => {
                console.log(res.data)
                res.data.map((val) => {
                    this.setState({
                        product: {
                            data: [
                                {
                                    dataPoints: [
                                        ...this.state.product.data[0].dataPoints, { label: val.productName, y: val.sold }
                                    ]
                                }
                            ]
                        }
                    })
                    //         // [...this.state.data[0].dataPoints[0].label, val.productName]
                })
                console.log(this.state.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    filterReportProduct = () => {
        this.setState({
            product: {
                title:{text: "Data Penjualan Product"},
                data: [
                    {
                        dataPoints: []
                    }
                ]
            }
        })
        Axios.get(`${API_URL}/products/reportProduct/${this.state.filterProduk.orderBySold}?minPrice=${this.state.hargaMin}&maxPrice=${this.state.hargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&merek=${this.state.merekFilter}&categoryName=${this.state.categoryFilter}`)
            .then((res) => {
                // console.log(res.data)
                res.data.map((val) => {
                    this.setState({
                        product: {
                            title:{text: "Data Penjualan Product"},
                            data: [
                                {
                                    dataPoints: [
                                        ...this.state.product.data[0].dataPoints, { label: val.productName, y: val.sold }
                                    ]
                                }
                            ]
                        }
                    })
                })
                console.log(this.state.product.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    filterReportPaket = () => {
        this.setState({
            paket: {
                title:{text: "Data Penjualan Paket"},
                data: [
                    {
                        dataPoints: []
                    }
                ]
            }
        })
        Axios.get(`${API_URL}/paket/reportPaket/${this.state.filterProduk.orderBySold}?minPrice=${this.state.hargaMin}&maxPrice=${this.state.hargaMax}&namaPaket=${this.state.filterProduk.cariProduk}`)
            .then((res) => {
                console.log(res)
                res.data.map((val) => {
                    this.setState({
                        paket: {
                            title:{text: "Data Penjualan Paket"},
                            data: [
                                {
                                    dataPoints: [
                                        ...this.state.paket.data[0].dataPoints, { label: val.paketName, y: val.soldPaket }
                                    ]
                                }
                            ]
                        }
                    })
                    this.setState({title:{text: "Data Penjualan Paket"}})
                })
                console.log(this.state.paket.data[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // options =  {
    //     title: {
    //         text: "Basic Column Chart"
    //     },
    //     animationEnabled: true,
    //     data: [
    //     {
    //         // Change type to "doughnut", "line", "splineArea", etc.
    //         type: "column",
    //         dataPoints: [
    //             { label: "Apple",  y: 10  },
    //             { label: "Orange", y: 15  },
    //             { label: "Banana", y: 25  },
    //             { label: "Mango",  y: 30  },
    //             { label: "Grape",  y: 28  },
    //             {label: "Jeruk",  y: 100  }
    //         ]
    //     }
    //     ]
    // }
    getPaketAll = () => {
        Axios.get(`${API_URL}/paket/readPaket`)
            .then((res) => {
                res.data.map((val) => {
                    this.setState({
                        paket: {
                            data: [
                                {
                                    dataPoints: [
                                        ...this.state.paket.data[0].dataPoints, { label: val.paketName, y: val.soldPaket }
                                    ]
                                }
                            ]
                        }
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    inputHandler = (e, field, form) => {
        let { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }
    getCategoryList = () => {
        Axios.get(`${API_URL}/category/readCategory`)
            .then((res) => {
                this.setState({ categoryList: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    screenReportHandler = () => {
        if (this.state.kondisiScreen == 1) {
            return (
                <>
                    <div style={{ backgroundColor: "" }}>
                        <CanvasJSChart options={this.state.product} />
                    </div>
                </>
            )
        }
        else if (this.state.kondisiScreen == 2) {
            return (
                <div>
                    <CanvasJSChart options={this.state.paket} />
                </div>
            )
        }
    }

    render() {
        return (
            <div style={divStyle} className=" mt-4" >
                {/* <img style={{width:"100%"}} src="https://cdn.hipwallpaper.com/i/39/25/KvBq3V.jpg" alt="" /> */}
                <div className="container py-5">
                    <button onClick={() => this.setState({ kondisiScreen: 1 })} className="button"><span>Product</span></button>
                    <button onClick={() => this.setState({ kondisiScreen: 2 })} style={{ marginLeft: "50px" }} className="button"><span>Paket</span></button>
                    <div className="row">
                        <div style={{ backgroundColor: "lightblue" }} className="col-3">
                            {
                                this.state.kondisiScreen == 1 ? (
                                    <>
                                        <h2>Filter Kategori</h2>
                                        <select
                                            onClick={this.filterReportProduct}
                                            // value={this.state.categoryFilter}
                                            className="custom-text-input pl-3 mb-2"
                                            onChange={(e) => this.setState({ categoryFilter: e.target.value })}
                                        >
                                            <option
                                                value="">All</option>
                                            {this.renderCategoryList()}
                                        </select>
                                        <b style={{ color: "black" }}>Harga</b>
                                        <div class="input-group mb-2 mt-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rp</div>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inlineFormInputGroup"
                                                onKeyUp={this.filterReportProduct}
                                                onChange={(e) => this.setState({ hargaMin: 1 * e.target.value })}
                                                // value={this.state.filterProduk.filterHargaMin}
                                                placeholder="Harga Minimum" />
                                        </div>
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rp</div>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inlineFormInputGroup"
                                                onKeyUp={this.filterReportProduct}
                                                onChange={(e) => this.setState({ hargaMax: 1 * e.target.value })}
                                                maxLength="9"
                                                // value={this.state.filterProduk.filterHargaMax}
                                                placeholder="Harga Maksimum" />
                                        </div>
                                        <b style={{ color: "black" }}>Cari Nama Produk</b>
                                        <input
                                            onKeyUp={this.filterReportProduct}
                                            type="text"
                                            class="form-control"
                                            id="inlineFormInputGroup"
                                            onChange={(e) => this.inputHandler(e, "cariProduk", "filterProduk")}
                                            // value={this.state.filterProduk.cariProduk}
                                            placeholder="Nama Produk" />
                                        <b style={{ color: "black" }}>Merek</b>
                                        <select
                                            onClick={this.filterReportProduct}
                                            onChange={(e) => this.setState({ merekFilter: e.target.value })}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value=""        >All</option>
                                            <option value="apple"   >Apple</option>
                                            <option value="samsung" >Samsung</option>
                                            <option value="huawei"  >Huawei</option>
                                            <option value="oppo"    >Oppo</option>
                                            <option value="vivo"    >Vivo</option>
                                            <option value="xiaomi"  >Xiaomi</option>
                                        </select>
                                        <b style={{ color: "black" }}>Sort by Sold:</b>
                                        <select
                                            onClick={this.filterReportProduct}
                                            value={this.state.filterProduk.orderBySold}
                                            onChange={(e) => this.inputHandler(e, "orderBySold", "filterProduk")}
                                            class="form-control" id="exampleFormControlSelect1">
                                            <option value="asc">Terkecil-Terbesar</option>
                                            <option value="desc">Terbesar-Terkecil</option>
                                        </select>
                                    </>
                                ) : (
                                        <>
                                            <b style={{ color: "black" }}>Harga</b>
                                            <div class="input-group mb-2 mt-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Rp</div>
                                                </div>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inlineFormInputGroup"
                                                    onKeyUp={this.filterReportPaket}
                                                    onChange={(e) => this.setState({ hargaMin: 1 * e.target.value })}
                                                    // value={this.state.filterProduk.filterHargaMin}
                                                    placeholder="Harga Minimum" />
                                            </div>
                                            <div class="input-group mb-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Rp</div>
                                                </div>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="inlineFormInputGroup"
                                                    onKeyUp={this.filterReportPaket}
                                                    onChange={(e) => this.setState({ hargaMax: 1 * e.target.value })}
                                                    maxLength="9"
                                                    // value={this.state.filterProduk.filterHargaMax}
                                                    placeholder="Harga Maksimum" />
                                            </div>
                                            <b style={{ color: "black" }}>Cari Nama Produk</b>
                                            <input
                                                onKeyUp={this.filterReportPaket}
                                                type="text"
                                                class="form-control"
                                                id="inlineFormInputGroup"
                                                onChange={(e) => this.inputHandler(e, "cariProduk", "filterProduk")}
                                                // value={this.state.filterProduk.cariProduk}
                                                placeholder="Nama Produk" />
                                            <b style={{ color: "black" }}>Sort by Sold:</b>
                                            <select
                                                onClick={this.filterReportPaket}
                                                onChange={(e) => this.inputHandler(e, "orderBySold", "filterProduk")}
                                                class="form-control" id="exampleFormControlSelect1">
                                                <option value="asc">Terkecil-Terbesar</option>
                                                <option value="desc">Terbesar-Terkecil</option>
                                            </select>
                                        </>
                                    )
                            }

                        </div>
                        <div className="col-9">
                            {this.screenReportHandler()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Report