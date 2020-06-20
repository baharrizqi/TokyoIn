import React from 'react'
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ProductCard from "../../components/Cards/ProductCard";


class Product extends React.Component {
    state = {
        productData: [],
        categoryFilter: "",
        merekFilter: "",
        filterProduk: {
            filterHargaMax: 999999999999,
            filterHargaMin: 0,
            cariProduk:"",
        },
    };
    getProductData = () => {
        Axios.get(`${API_URL}/products`)
            .then((res) => {
                this.setState({ productData: res.data });
                console.log(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
    };
    componentDidMount() {
        this.getProductData();
    }
    renderAllProduct = () => {
        return this.state.productData.map((val) => {
            if (val.category.toLowerCase().includes(this.state.categoryFilter) &&
                val.price >= (this.state.filterProduk.filterHargaMin) && val.price <= (this.state.filterProduk.filterHargaMax) &&
                val.merek.toLowerCase().includes(this.state.merekFilter)&&
                val.productName.toLowerCase().includes(this.state.filterProduk.cariProduk.toLowerCase())) {
                return (
                    <ProductCard data={val} className="m-2" />
                )
            }
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
        console.log(this.state.filterProduk.filterHargaMin)
    }

    render() {
        return (
            <div className="container py-5">
                <div className="row">
                    <div className="col-sm">
                        <div id="accordion" style={{ width: "250px", textDecoration: "" }}>
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <b style={{ color: "black" }}>Kategori</b>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1"></label>
                                            <select class="form-control" id="exampleFormControlSelect1">
                                                <option onClick={() => this.setState({ categoryFilter: "" })}>ALL</option>
                                                <option onClick={() => this.setState({ categoryFilter: "laptop" })}>LAPTOP</option>
                                                <option onClick={() => this.setState({ categoryFilter: "dekstop" })}>DEKSTOP</option>
                                                <option onClick={() => this.setState({ categoryFilter: "tab" })}>TAB</option>
                                                <option onClick={() => this.setState({ categoryFilter: "phone" })}>HP</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <b style={{ color: "black" }}>Harga</b>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="input-group mb-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Rp</div>
                                            </div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inlineFormInputGroup"
                                                onChange={(e) => this.inputHandler(e, "filterHargaMin", "filterProduk")}
                                                value={this.state.filterProduk.filterHargaMin}
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
                                                onChange={(e) => this.inputHandler(e, "filterHargaMax", "filterProduk")}
                                                value={this.state.filterProduk.filterHargaMax}
                                                placeholder="Harga Maksimum" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingThree">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <b style={{ color: "black" }}>Cari Nama Produk</b>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body">
                                        <input 
                                        type="text" 
                                        class="form-control" 
                                        id="inlineFormInputGroup"
                                        onChange={(e)=> this.inputHandler(e,"cariProduk","filterProduk")} 
                                        value={this.state.filterProduk.cariProduk}
                                        placeholder="" />
                                    </div>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header" id="headingFour">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            <b style={{ color: "black" }}>Merek</b>
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label for="exampleFormControlSelect1"></label>
                                            <select class="form-control" id="exampleFormControlSelect1">
                                                <option onClick={() => this.setState({ merekFilter: "" })}>All</option>
                                                <option onClick={() => this.setState({ merekFilter: "apple" })}>Apple</option>
                                                <option onClick={() => this.setState({ merekFilter: "samsung" })}>Samsung</option>
                                                <option onClick={() => this.setState({ merekFilter: "huawei" })}>Huawei</option>
                                                <option onClick={() => this.setState({ merekFilter: "oppo" })}>Oppo</option>
                                                <option onClick={() => this.setState({ merekFilter: "vivo" })}>Vivo</option>
                                                <option onClick={() => this.setState({ merekFilter: "xiaomi" })}>Xiaomi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="d-flex flex-wrap">
                            {this.renderAllProduct()}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Product