import React from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import { connect } from "react-redux";
import swal from "sweetalert";

class ProductDetails extends React.Component {
    state = {
        productData: {
            image: "",
            productName: "",
            merek: "",
            price: 0,
            disc: 0,
            desc: "",
            year: "",
            category: "",
            id: 0,
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
        // POST method ke /cart
        // Isinya: userId, productId, quantity
        // console.log(this.props.user.id);
        console.log(this.state.productData.id);
        const userId = this.props.user.id
        const { id } = this.state.productData
    
        Axios.get(`${API_URL}/carts`, {
          params: {
            productId: id,
            userId: userId,
          }
        })
          .then((res) => {
            if (res.data.length == 0) {
              Axios.post(`${API_URL}/carts`, {
                userId: this.props.user.id,
                productId: this.state.productData.id,
                quantity: 1,
              })
                .then((res) => {
                  console.log(res);
                  swal(`Add to cart : ${res.data.quantity}`, "Your item has been added to your cart", "success");
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
                quantity: res.data[0].quantity + 1
              })
                .then((res) => {
                  console.log(res.data)
                  swal(`Add to cart : ${res.data.quantity}`, `Your item has been added to your cart`, "success");
                })
            }
          })
          .catch((err) => {
            console.log(err);
          })
      };
    componentDidMount() {
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
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
            desc,
            disc,
            category,
            id,
        } = this.state.productData;
        let discHarga = (price-(price*(disc/100)))
        return (
            <div className="container">
                <div className="row py-4">
                    <div className="col-6 text-center">
                        <img
                            style={{ width: "100%", objectFit: "contain", height: "550px" }}
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center" style={{border:"5px solid #e0e0eb",margin:"auto",outline: "solid 10px"}}>
                        <h3>{productName}</h3>
                        {
                                    disc > 0 ? 
                                    (
                                    <>
                                    <span style={{textDecoration:"line-through",color:"grey",fontSize:"14px"}}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(price)}
                                    </span>
                                    <p style={{fontSize:"25px",fontWeight:"bold"}}>{new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(discHarga)}</p> 
                                    </>
                                    ): 
                                    <p style={{fontSize:"14px",fontWeight:"bold"}}>{new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(price)}</p>
                                }
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
                        <p className="mt-4">{desc}</p>
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

export default connect(mapStateToProps)(ProductDetails)