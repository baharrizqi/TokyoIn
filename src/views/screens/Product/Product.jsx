import React from 'react'
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ProductCard from "../../components/Cards/ProductCard";
import { connect } from 'react-redux';


class Product extends React.Component {

    state = {
        productData: [],
        categoryFilter: "",
        merekFilter: "",
        hargaMin: 0,
        hargaMax: 99999999,
        filterProduk: {
            filterHargaMin: 0,
            filterHargaMax: 99999999,
            cariProduk: "",
            // categoryFilter: "laptop",
            sortProduk: "",
            orderByType: "productName",
            orderByNamePrice: "asc",
        },
        categoryList: [],
        kondisiScreen: 0,
        banyakProduk: 0,
        banyakProdukAll: [],
        page: 0




    };
    getProductData = () => {
        Axios.get(`${API_URL}/products/readProduct`)
            .then((res) => {
                this.setState({ productData: res.data });
                console.log(res.data)

            })
            .catch((err) => {
                console.log(err);
            });
    };
    componentDidMount() {
        // this.getProductData();
        this.getCountProduct()
        this.renderFilterPriceFix()
        this.getCategoryList()
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
    getCategoryListLagi = () => {
        Axios.get(`${API_URL}/category/readCategory`)
            .then((res) => {
                this.setState({ categoryList: res.data })
                this.getProductData()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderCategoryList = () => {
        return this.state.categoryList.map((val) => {
            return (
                <option value={val.categoryName}>{val.categoryName}</option>
            )
        })
    }
    // val.category.toLowerCase().includes(this.state.categoryFilter) &&
    // val.categories.categoryName.toLowerCase().includes(this.state.categoryFilter)&&
    // valB.categoryName.toLowerCase().includes(this.state.categoryFilter)&&
    renderAllProduct = () => {
        return this.state.productData.map((valA) => {
            //    return valA.categories.map((valB)=> {
            if (
                // valB.categoryName.toLowerCase().includes(this.state.categoryFilter)&&
                // valA.price >= (this.state.filterProduk.filterHargaMin) && valA.price <= (this.state.filterProduk.filterHargaMax) &&
                valA.merek.toLowerCase().includes(this.state.merekFilter)
                // valA.productName.toLowerCase().includes(this.state.filterProduk.cariProduk.toLowerCase() 
                // valA.categories.map((valB)=> {
                //     return(

                //         valB.categoryName.toLowerCase().includes(this.state.categoryFilter)
                //     )
                // })  
                // )
            ) {
                return (
                    <ProductCard data={valA} className="m-2" />

                )
            }
            // })

        })
    }
    renderFilterPriceFix = () => {
        this.getCountProduct()
        // if ((this.state.hargaMin == "" && this.state.hargaMax == "")|| (this.state.hargaMin == "" || this.state.hargaMax == "") ) {
        //     // this.setState({
        //     //     filterProduk: {
        //     //         filterHargaMin: 0,
        //     //         filterHargaMax: 99999999,
        //     //     }
        //     // })
        //     this.setState({hargaMin:0,hargaMax:9999999999})
        // }
        Axios.get(`${API_URL}/products/custom/${this.state.filterProduk.orderByType}/${this.state.filterProduk.orderByNamePrice}/${this.state.page}?minPrice=${this.state.hargaMin}&maxPrice=${this.state.hargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&categoryName=${this.state.categoryFilter}`)
            .then((res) => {
                // console.log(res.data + "halo")
                this.setState({ productData: res.data })
                // console.log(res.data)
            })
            .catch((err) => {
                console.log(err)

            })
        this.state.page = 0
    }
    pagination = () => {
        let arrProduct = []
        let jumlahProduk = 0
        if (this.state.categoryFilter == "") {
            for (let i = 0; i < this.state.banyakProdukAll.length; i++) {
                if (i % 4 == 0) {
                    arrProduct.push(<input className="btn btn-warning ml-4" onClick={() => this.onClickHalaman(i)} type="button" value={jumlahProduk + 1} />)
                    jumlahProduk = jumlahProduk + 1
                }

            }
        }
        else {
            for (let i = 0; i < this.state.banyakProduk; i++) {
                if (i % 4 == 0) {
                    arrProduct.push(<input className="btn btn-warning ml-4" onClick={() => this.onClickHalaman(i)} type="button" value={jumlahProduk + 1} />)
                    jumlahProduk = jumlahProduk + 1
                }

            }
        }
        return arrProduct
    }
    getCountProduct = () => {
        // console.log(this.state.categoryFilter + " kategori filter")
        // console.log(this.state.hargaMin + "" + this.state.hargaMax + " "+ this.state.filterProduk.cariProduk + " " + this.state.categoryFilter)
        if (this.state.categoryFilter == "") {
            Axios.get(`${API_URL}/products/countProducts?minPrice=${this.state.hargaMin}&maxPrice=${this.state.hargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&categoryName=${this.state.categoryFilter}`)
                .then((res) => {
                    // console.log(res.data)
                    this.setState({ banyakProdukAll: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            Axios.get(`${API_URL}/products/countProduct?minPrice=${this.state.hargaMin}&maxPrice=${this.state.hargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&categoryName=${this.state.categoryFilter}`)
                .then((res) => {
                    // console.log(res.data)
                    this.setState({ banyakProduk: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        }


    }
    onClickHalaman = (i) => {
        this.state.page = i
        this.renderFilterPriceFix()
        this.state.page = i
    }
    // renderFilterPrice = () => {

    //     Axios.get(`${API_URL}/products/custom/asc?minPrice=${this.state.filterProduk.filterHargaMin}&maxPrice=${this.state.filterProduk.filterHargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&categoryName=${this.state.filterProduk.categoryFilter}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             this.setState({ productData: res.data })
    //         })
    //         .catch((err) => {
    //             console.log(err)

    //         })
    // }
    // renderFilterPriceDesc = () => {
    //     Axios.get(`${API_URL}/products/custom/desc?minPrice=${this.state.filterProduk.filterHargaMin}&maxPrice=${this.state.filterProduk.filterHargaMax}&namaProduk=${this.state.filterProduk.cariProduk}&categoryName=${this.state.filterProduk.categoryFilter}`)
    //         .then((res) => {
    //             console.log(res.data)
    //             this.setState({ productData: res.data })
    //         })
    //         .catch((err) => {
    //             console.log(err)

    //         })
    // }
    renderFilterCategory = () => {
        Axios.get(`${API_URL}/products/category/${this.state.filterProduk.categoryFilter}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ productData: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    resetHargaBtn = () => {
        this.setState({
            filterProduk: {
                filterHargaMin: 0,
                filterHargaMax: 9999999,
            }
        })
        this.getProductData()
    }

    // renderCategoryProduct = () => {
    //     return this.state.productData.map((valA)=> {
    //        return valA.categories.map((valB)=> {
    //             if (valB.categoryName.toLowerCase().includes(this.state.categoryFilter)) {
    //                 return (
    //                     <ProductCard data={valA} className="m-2" />
    //                 )
    //             }
    //         })
    //     })
    // }
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
    screenProductHandler = () => {
        if (this.state.kondisiScreen == 1) {
            return (
                <>
                    <div style={{}}>
                        {this.renderAllProduct()}
                    </div>
                    <div className="mt-5">
                        {this.pagination()}

                    </div>

                </>
            )
        }
        else if (this.state.kondisiScreen == 2) {
            return (
                <div>

                </div>
            )
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "rgb(218, 172, 46)" }}>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm">
                            <div id="accordion" style={{ width: "200px", textDecoration: "" }}>
                                <div class="card">
                                    <div class="card-header" id="headingFive">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                                <b style={{ color: "black" }}>Product Catalog</b>
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseFive" class="collapse show" aria-labelledby="headingFive" data-parent="#accordion">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="exampleFormControlSelect1"></label>
                                                <button onClick={() => this.setState({ kondisiScreen: 1 })} className="button w-100">
                                                    <span>
                                                        List Of Product
                                                </span>
                                                </button>
                                                <button onClick={() => this.setState({ kondisiScreen: 2 })} className="button w-100 mt-2">
                                                    <span>
                                                        Paket
                                                </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <b style={{ color: "black" }}>Kategori</b>
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="exampleFormControlSelect1"></label>
                                                {/* <select class="form-control" id="exampleFormControlSelect1">
                                                <option onClick={() => this.setState({ categoryFilter: "" })}>ALL</option>
                                                <option onClick={() => this.setState({ categoryFilter: "laptop" })}>LAPTOP</option>
                                                <option onClick={() => this.setState({ categoryFilter: "dekstop" })}>DEKSTOP</option>
                                                <option onClick={() => this.setState({ categoryFilter: "tab" })}>TAB</option>
                                                <option onClick={() => this.setState({ categoryFilter: "phone" })}>HP</option>
                                            </select> */}
                                                <select
                                                    onClick={this.renderFilterPriceFix}
                                                    value={this.state.categoryFilter}
                                                    className="custom-text-input h-100 pl-3"
                                                    onChange={(e) => this.setState({ categoryFilter: e.target.value })}
                                                >
                                                    <option
                                                        // onClick={() => this.setState({ 
                                                        //     filterProduk:{
                                                        //         categoryFilter:"",
                                                        //     }})}
                                                        value="">All</option>
                                                    {this.renderCategoryList()}
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
                                                    onKeyUp={this.renderFilterPriceFix}
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
                                                    onKeyUp={this.renderFilterPriceFix}
                                                    onChange={(e) => this.setState({ hargaMax: 1 * e.target.value })}
                                                    // value={this.state.filterProduk.filterHargaMax}
                                                    placeholder="Harga Maksimum" />
                                                {/* <input onChange={(e)=> this.inputHandler(e,"max","harga")} type="text" value={this.state.harga.max}/>
                                        <input type="button" value="cek harga" onClick={this.cekHarga}/> */}
                                            </div>
                                            <input type="button" value="Reset Harga" onClick={this.resetHargaBtn} />
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
                                                onKeyUp={this.renderFilterPriceFix}
                                                type="text"
                                                class="form-control"
                                                id="inlineFormInputGroup"
                                                onChange={(e) => this.inputHandler(e, "cariProduk", "filterProduk")}
                                                value={this.state.filterProduk.cariProduk}
                                                placeholder="" />
                                            <button type="button" class="btn btn-success">Success</button>
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
                                <div class="card">
                                    <div class="card-header" id="headingSix">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                <b style={{ color: "black" }}>Sort</b>
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label for="exampleFormControlSelect1"></label>
                                                <b style={{ color: "black" }}>Sort by Type</b>
                                                <select
                                                    onClick={this.renderFilterPriceFix}
                                                    onChange={(e) => this.inputHandler(e, "orderByType", "filterProduk")}
                                                    class="form-control" id="exampleFormControlSelect1">
                                                    <option value="productName">Nama Produk</option>
                                                    <option value="price">Harga</option>
                                                    {
                                                        (this.props.user.role == "admin") ? (
                                                            <>
                                                            <option value="sold">Sold</option>
                                                            </>
                                                        ): null
                                                    }
                                                </select>
                                                <b style={{ color: "black" }}>Select:</b>
                                                <select
                                                    onClick={this.renderFilterPriceFix}
                                                    onChange={(e) => this.inputHandler(e, "orderByNamePrice", "filterProduk")}
                                                    class="form-control" id="exampleFormControlSelect1">
                                                    <option value="asc">A-Z / Terkecil-Terbesar</option>
                                                    <option value="desc">Z-A / Terbesar-Terkecil</option>
                                                </select>
                                                {/* <b style={{ color: "black" }}>Category</b>
                                            <select class="form-control" id="exampleFormControlSelect1">
                                                <option onClick={() => this.setState({ merekFilter: "" })}></option>
                                                <option onClick={() => this.setState({ merekFilter: "apple" })}>A-Z</option>
                                                <option onClick={() => this.setState({ merekFilter: "samsung" })}>Z-A</option>
                                            </select> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="d-flex flex-wrap">
                                {this.screenProductHandler()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
    }
}

export default connect(mapStateToProps)(Product)