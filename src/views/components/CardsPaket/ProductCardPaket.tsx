import React from "react";
import "./ProductCardPaket.css";
import ButtonUI from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

interface ProductCardData {
  id?: number;
  paketName?: string;
  hargaPaket?: number;
  review?: number;
  imagePaket?: string;
  year?: number;
  stockPaket?: number;
  soldPaket?: number;
}

type ProductCardProps = {
  data?: ProductCardData;
  className?: string;
};

class ProductCardPaket extends React.Component<ProductCardProps> {
  render() {
    const { id, paketName, hargaPaket, imagePaket, year, stockPaket, soldPaket } = this.props.data;
    // let discHarga = (price - (price * (disc / 100)))
    return (
      <div className={`product-card d-inline-block w-45 ${this.props.className}`}>
        <div >
          <img 
          style={{ width: "200px", height: "150px" ,objectFit:"contain"}}
          src={imagePaket}/>
          <p className="mt-3">{paketName}</p>
          <p style={{ fontSize: "14px", fontWeight: "bold" }}>{new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(hargaPaket)}</p>
          {/* <h5 style={{ fontWeight: "bolder" }}>
                                    {new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(price)}
                                </h5> */}
          <p className="small">Stock: {stockPaket} pcs</p>
          <p className="small">Terjual: {soldPaket} pcs</p>
          <Link to={"/productPaket/" + id}>
            <button style={{ width: "100px" }} type="button" className="btn btn-primary">View</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCardPaket;
