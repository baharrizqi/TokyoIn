import React from "react";
import "./ProductCard.css";
import ButtonUI from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

interface ProductCardData {
  id?: number;
  productName?: string;
  merek?: string;
  price?: number;
  review?: number;
  image?: string;
  year?: number;
  disc?: number;
}

type ProductCardProps = {
  data?: ProductCardData;
  className?: string;
};

class ProductCard extends React.Component<ProductCardProps> {
  render() {
    const { id, productName,merek, price, disc, image, year } = this.props.data;
    let discHarga = (price - (price * (disc / 100)))
    return (
      <div className={`product-card d-inline-block ${this.props.className}`}>
        <div className="row">
          <div className="col-sm">
            {year == 2020 ? (
              <>
                <img src="https://eraspace.com/pub/media//kemana/productlabel/new-label.png" alt="" />
                <img
                  src={image}
                  style={{ width: "100px", height: "150px", objectFit: "contain" }}
                />
              </>
            ) :
              <img
                src={image}
                style={{ width: "100px", height: "150px", objectFit: "contain" }}
              />
            }
          </div>
          <div className="col-sm ml-2">
            <div style={{ height: "160px" }}>
              <p className="mt-3">{productName}</p>
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
              {/* <h5 style={{ fontWeight: "bolder" }}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(price)}
                                </h5> */}
              <p className="small">Jakarta Selatan</p>
              <Link to={"/product/" + id}>
                <button style={{ width: "100px" }} type="button" className="btn btn-primary">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
