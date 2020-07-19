import React from "react";
import { Button } from "reactstrap";
import ButtonUI from "../../components/Button/Button";


class AboutUs extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: "black" }} className="py-5">
                <div className="container mt-5">
                    <div id="accordion">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                                <h5 class="mb-0">
                                    <button class="btn btn-link text-dark" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <b>
                                            Tentang Kami
                                        </b>
                                    </button>
                                </h5>
                            </div>

                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div class="card-body text-justify">
                                    <h2>TENTANG GADGET.COM</h2> <br />
                                    <p>
                                        Gadget.com merupakan satu-satunya online retail smartphone,
                                        gadget, IOT dan aksesoris pendukungnya di Indonesia yang memberikan
                                        pengalaman belanja online aman dan nyaman dengan jaminan orisinalitas
                                        serta garansi resmi untuk semua produk yang dijual dari berbagai merek
                                        ternama seperti Apple, Samsung, Xiaomi, Huawei, Oppo, Vivo,
                                        dan masih banyak lagi.
                                    </p> <br />
                                    <p>
                                        Gadget.com juga memberikan pengalaman berbelanja online yang tidak akan
                                        terlupakan dengan terintegrasinya website Erafone.com dengan ratusan toko
                                        Erafone yang tersebar di seluruh Indonesia sehingga memungkinkan untuk
                                        melakukan transaksi Online to Offline ataupun Offline to Online dengan
                                        beragam pilihan fasilitas pembayaran yang lengkap, mudah dan aman.
                                    </p> <br />
                                    <p>
                                        Gadget.com akan selalu berusaha memberikan penawaran menarik dan
                                        pelayanan terbaik seperti kemudahan pembayaran, fleksibilitas
                                        pemesanan (bisa melalui website ataupun toko), fasilitas pengembalian
                                        produk, layanan konsumen dan layanan purna jual (after sales) yang
                                        terjamin karena Erafone.com memiliki kemitraan dan lisensi langsung
                                        dari pemegang merek ternama untuk semua produk yang dijual.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingTwo">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed text-dark" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                       <b>
                                           Hubungi Kami
                                        </b> 
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div class="card-body">
                                    <button style={{ width: "250px" }} data-toggle="modal" data-target="#myModal-1" className="button"><span> Show More</span></button>
                                    {/* <input data-toggle="modal" data-target="#myModal-1" type="button" value="show"/> */}
                                    <div class="modal fade" id="myModal-1" role="dialog">
                                        <div style={{ marginTop: "100pt" }} class="modal-dialog modal-lg ">
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <h2>Jam Operasional</h2>
                                                    <p>Senin - Jumat : pukul 09:30 - 17:00 WIB </p>
                                                    <p>Sabtu : pukul 09:30 - 13:00 WIB</p>
                                                    <p>Untuk pertanyaan seputar ketersediaan produk/stok , <br /> silakan menggunakan layanan kami di nomor 0812-9077-7722</p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header" id="headingThree">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed text-dark" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        <b>
                                          Cari Toko Terdekat
                                        </b>  
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div class="card-body">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7052640439065!2d106.6500593142732!3d-6.302402995438691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb9545968651%3A0xa3d17293fd1fcd!2sPurwadhika%20Startup%20%26%20Coding%20School%20BSD!5e0!3m2!1sen!2sid!4v1592669930765!5m2!1sen!2sid"
                                        width="100%" height="450" frameborder="0" style={{ border: "0" }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutUs