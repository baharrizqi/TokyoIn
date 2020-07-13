import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { connect } from "react-redux";
import swal from "sweetalert";
import { fillCart } from "../../../redux/actions";

class ProductDetails extends React.Component {
  state = {
    productData: {
      image: "",
      productName: "",
      merek: "",
      price: 0,
      description: "",
      stock: "",
      sold: 0,
      year: "",
      id: 0,
      categories: [],
    },
  };

  // addToCartHandler = () => {
  //     Axios.get(`${API_URL}/carts`,{
  //         params: {
  //             userId: this.props.user.id,
  //             productId: this.state.productData.id,
  //         }
  //     })
  //     .then((res)=>{
  //         Axios.post(`${API_URL}/carts`,{
  //             userId: this.props.user.id,
  //             productId: this.state.productData.id,
  //             quantity: 1,
  //         })
  //         .then((res)=> {
  //             alert("item bertambah")
  //             console.log(res.data)
  //         })
  //         .catch((err)=> {
  //             console.log(err);
  //         })
  //     })
  //     .catch((err)=> {
  //         console.log(err)
  //     })
  // }

  addToCartHandler = () => {
    if (this.props.user.id == 0) {
      swal("Gagal!", "Harus Login terlebih dahulu untuk menambah ke keranjang", "error");
    }else if (this.state.productData.stock <=0) {
      swal("Gagal!", "Stock Product ini Habis", "error")
    }else if (this.props.user.role == "admin") {
      swal("Gagal!", "Maaf Admin ga boleh belanja", "error")
    }
    else {
      Axios.get(`${API_URL}/carts/productCart/${this.props.user.id}/${this.state.productData.id}`)
        .then((res) => {
          if (res.data.length == 0) {
            Axios.post(`${API_URL}/carts/addCart/${this.props.user.id}/${this.state.productData.id}/0`, {
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
    }
  }
  // addToCartHandler = () => {
  //   // POST method ke /cart
  //   // Isinya: userId, productId, quantity
  //   // console.log(this.props.user.id);
  //   console.log(this.state.productData.id);
  //   const userId = this.props.user.id
  //   const { id } = this.state.productData

  //   Axios.get(`${API_URL}/carts`, {
  //     params: {
  //       productId: id,
  //       userId: userId,
  //     }
  //   })
  //     .then((res) => {
  //       if (res.data.length == 0) {
  //         Axios.post(`${API_URL}/carts`, {
  //           userId: this.props.user.id,
  //           productId: this.state.productData.id,
  //           quantity: 1,
  //         })
  //           .then((res) => {
  //             console.log(res);
  //             swal(`Add to cart : ${res.data.quantity}`, "Your item has been added to your cart", "success");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       } else {
  //         Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
  //           quantity: res.data[0].quantity + 1
  //         })
  //           .then((res) => {
  //             console.log(res.data)
  //             swal(`Add to cart : ${res.data.quantity}`, `Your item has been added to your cart`, "success");
  //           })
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // };
  componentDidMount() {
    Axios.get(`${API_URL}/products/readProduct/${this.props.match.params.productId}`)
      .then((res) => {
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const {
      productName,
      image,
      price,
      description,
      sold,
      stock,
      categories,
      id,
    } = this.state.productData;
    return (
      <div style={{ marginBottom: "50px", paddingBottom: "50px", paddingTop: "50px" }}>
        <div style={{ backgroundColor: "#e0e0eb", padding: "70px" }} className="container ">
          <div className="row ">
            <div className="col-6 text-center mt-4">
              <img
                style={{ width: "100%", objectFit: "contain", height: "400px" }}
                src={image}
                alt=""
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center" style={{ border: "5px solid #e0e0eb", margin: "auto", outline: "solid 10px", backgroundColor: "rgb(194, 176, 128)" }}>
              <h1>{productName}</h1>
              <h2 style={{ fontSize: "14h2x", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}</h2>
              <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Show Stock & Sold</a>
                <button class="btn btn-primary ml-2" type="button" data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Show Category</button>
                <button class="btn btn-primary ml-2" type="button" data-toggle="collapse" data-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">Show All</button>
              </p>
              <div class="row">
                <div class="col">
                  <div class="collapse multi-collapse" id="multiCollapseExample1">
                    <div style={{ backgroundColor: "#D3D3D3" }} class="card card-body mt-2">
                      <p className="small">Stock: {stock} pcs</p>
                      <p className="small">Terjual: {sold} pcs</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="collapse multi-collapse" id="multiCollapseExample2">
                    <div style={{ backgroundColor: "#D3D3D3" }} class="card card-body mt-2">
                      Category:
                      <span style={{ fontWeight: "normal" }}>
                        {categories.map((val) => {
                          return (
                            <>
                              <div class="d-flex bg-secondary">
                                <div class="p-2 flex-grow-1">
                                  <ul className="ml-4" style={{ listStyleType: "square" }}>
                                    <li className="text-white">
                                      {val.categoryName}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              {/* <br /> */}
                            </>
                          )
                        })}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-row mt-4">
                <button
                  type="button"
                  class="btn btn-outline-danger">Add To Wishlist</button>
                <button
                  type="button"
                  class="btn btn-outline-success ml-2"
                  onClick={this.addToCartHandler}>Add To Cart</button>
                {/* <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
                            <ButtonUI className="ml-4" type="outlined">
                            Add To Wishlist
                        </ButtonUI> */}
              </div>
              {/* <p className="mt-4">{description}</p> */}
              <div class="card-footer mt-3">
                <small class="text-muted">
                  <textarea
                    disabled
                    value={description}
                    style={{ resize: "none" }}
                    placeholder="Description"
                    className="custom-text-input"
                  >
                  </textarea>
                </small>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)