import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { connect } from "react-redux";
import swal from "sweetalert";
import { fillCart } from "../../../redux/actions"

const gambarBg = {
  backgroundImage: `url(https://wallpaperhd.wiki/wp-content/uploads/hd-backgrounds-websites-350851-download-free-website-background-1920x1080-for-mobile-hd.jpg)`
}
class ProductDetailsPaket extends React.Component {
  state = {
    paketData: {
      paketName: "",
      hargaPaket: 0,
      stockPaket: 0,
      soldPaket: 0,
      imagePaket: "",
      id: 0,
      products: [],
    },
  };
  addToCartHandler = () => {
    if (this.props.user.id == 0) {
      swal("Gagal!", "Harus Login terlebih dahulu untuk menambah ke keranjang", "error")
    }else if (this.state.paketData.stockPaket == 0) {
      swal("Gagal!", "Stock Paket ini Habis", "error")
    }else if (this.props.user.role == "admin") {
      swal("Gagal!", "Maaf Admin ga boleh belanja", "error")
    }
    else {
      Axios.put(`${API_URL}/carts/update/0/${this.state.paketData.id}/${this.props.user.id}`)
      .then((res)=>{
        console.log(res.data)
        this.getPaketDetail()
      })
      .catch((err)=>{
        console.log(err)
      })
      Axios.get(`${API_URL}/carts/paketCart/${this.props.user.id}/${this.state.paketData.id}`)
        .then((res) => {
          if (res.data.length == 0) {
            Axios.post(`${API_URL}/carts/addCart/${this.props.user.id}/0/${this.state.paketData.id}`, {
              quantity: 1,
            })
              .then((res) => {
                console.log(res.data)
                swal(`Add to cart : ${res.data.quantity}`, `Your item has been added to your cart`, "success");
                this.props.onFillCart(this.props.user.id);
              })
              .catch((err) => {
                console.log(err)
              })
          }
          else {
            Axios.put(`${API_URL}/carts/${res.data[0].id}`)
              .then((res) => {
                console.log(res.data)
                swal(`Add to cart : ${res.data.quantity}`, `Your item has been added to your cart`, "success");
                this.props.onFillCart(this.props.user.id);
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  getPaketDetail= () =>{
    Axios.get(`${API_URL}/paket/readPaket/${this.props.match.params.paketId}`)
      .then((res) => {
        this.setState({ paketData: res.data });
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getPaketDetail()
  }
  renderProductinPaket = () => {
    return this.state.paketData.products.map((val) => {
      return (
        <tr>
          <td>{val.productName}</td>
          <td>
            <img style={{ width: "50px" }} src={val.image} alt="" />
          </td>
        </tr>
      )
    })
  }
  render() {
    const {
      paketName,
      hargaPaket,
      stockPaket,
      soldPaket,
      imagePaket,
      id,
    } = this.state.paketData;
    // #e0e0eb
    return (
      <div className="py-5" style={gambarBg}>
        <div style={{ padding: "70px",backgroundColor: "rgb(211, 208, 225,0.4)" }} className="container ">
          <div className="row ">
            <div className="col-6 text-center mt-4">
              <img
                style={{ width: "100%", objectFit: "contain", height: "400px" }}
                src={imagePaket}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center" style={{ border: "5px solid #e0e0eb", margin: "auto", outline: "solid 10px", backgroundColor: "rgb(194, 176, 128)" }}>
              <h1>{paketName}</h1>
              <h2 style={{ fontSize: "14h2x", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(hargaPaket)}</h2>
              <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Show Stock & Sold</a>
                <button class="btn btn-primary ml-2" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Show Product in Paket</button>
                <button class="btn btn-primary ml-2" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Show All</button>
              </p>
              <div class="row">
                <div class="col">
                  <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <div style={{ backgroundColor: "#D3D3D3" }} class="card card-body mt-2">
                      <p className="small">Stock: {stockPaket} pcs</p>
                      <p className="small">Terjual: {soldPaket} pcs</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="collapse multi-collapse" id="multiCollapseExample2">
                    <div style={{ backgroundColor: "#D3D3D3" }} class="card card-body mt-2">
                      <table className="table table-dark">
                        <thead>
                          <tr>
                            <td>Nama Produk</td>
                            <td>Gambar Produk</td>
                          </tr>
                        </thead>
                        <tbody>
                          {this.renderProductinPaket()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row mt-4">
                <button
                  type="button"
                  class="btn btn-outline-success ml-2"
                  onClick={this.addToCartHandler}>Add To Cart</button>
                {/* <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
                            <ButtonUI className="ml-4" type="outlined">
                            Add To Wishlist
                        </ButtonUI> */}
              </div>
              <div class="card-footer mt-3">

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
    user: state.user,
  };
};

const mapDispatchToProps = {
  onFillCart: fillCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPaket)