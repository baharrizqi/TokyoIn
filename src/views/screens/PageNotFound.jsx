import React from "react";
import { Link } from "react-router-dom";

class PageNotFound extends React.Component {
  render() {
    return (
      <div className="container text-center py-5">
        <h1>Sedang mencari unicorn?</h1>
        <p>Sama seperti unicorn, halaman yang Anda cari tidak dapat ditemukan. 
        Silakan ketik ulang URL atau kembali ke Homepage</p>
        <img src="https://www.blibli.com/resources/images/404/unicorn-static.svg" alt=""/>
        <Link to="/"><button type="button" class="btn btn-primary">Back to home</button></Link>
      </div>
    );
  }
}

export default PageNotFound;
