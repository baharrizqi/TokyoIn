import React from 'react'
import "./Footer.css";
import { Link } from "react-router-dom";


class Footer extends React.Component {
    render() {
        return (
            <>
                <div className="footer-reviews">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="image">
                                    <img width="55px" height="55px" src="https://eraspace.com/pub/media/wysiwyg/reviews/footer-review-01.png" alt="" />
                                </div>
                                <div className="content">
                                    <h3>Garansi Resmi</h3>
                                    <span>Produk Bergaransi Resmi / Garansi TAM</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="image">
                                    <img width="55px" height="55px" src="https://eraspace.com/pub/media/wysiwyg/reviews/footer-review-02.png" alt="" />
                                </div>
                                <div className="content">
                                    <h3 style={{ fontSize: "22px" }}>Layanan Pelanggan</h3>
                                    <span>Tim Kami Siap Membantu Seputar Produk</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="image">
                                    <img width="55px" height="55px" src="https://eraspace.com/pub/media/wysiwyg/reviews/footer-review-03.png" alt="" />
                                </div>
                                <div className="content">
                                    <h3 style={{ fontSize: "22px" }}>Jasa Pengiriman</h3>
                                    <span>Pengiriman Dan Keamanan Terpecaya</span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="image">
                                    <img width="55px" height="55px" src="https://eraspace.com/pub/media/wysiwyg/reviews/footer-review-04.png" alt="" />
                                </div>
                                <div className="content">
                                    <h3 style={{ fontSize: "20px" }}>Keuntungan Belanja</h3>
                                    <span>Promo dan Info Terkini Produk Gadget Terbaru</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container p-2">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-3">
                            <img src="https://cdn.cnn.com/cnnnext/dam/assets/180926161922-gadget-logo-large-169.png" width="70" height="50" />
                            <p className="teks text-justify"> Jika Anda ingin bantuan atau memiliki masukan, silahkan hubungi kami: </p>
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-2 bd-highlight">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="p-2 bd-highlight">
                                    <p className="teks">
                                        Jam 9:30 - 17:00 (Senin s.d. Jumat)
                                        Jam 9:30 - 15:00 (Sabtu) <br />
                                        Email : customercare@gadget.com
                                        Contact Center : 1500372 <br />
                                        WhatsApp : 0812 9077 7722
                                    </p>
                                </div>
                            </div>
                            <p className="teks text-justify">
                                Apabila Anda mengalami kendala saat menghubungi Contact Center
                                kami di 1500372, silakan manfaatkan layanan Erica
                                (chatbot 24 jam, WhatsApp atau email)
                        </p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <h3 className="teks-sub">INFOMASI</h3>
                            <ul className="teks">
                                <Link to="/aboutus">
                                <li class="text-dark">Tentang Kami</li>
                                </Link>
                                <Link to="/aboutus">
                                <li class="text-dark">Hubungi Kami</li>
                                </Link>
                                <Link to="/aboutus">
                                <li class="text-dark">Cari Toko Terdekat</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <h3 className="teks-sub">LAYANAN</h3>
                            <ul className="teks">
                                <li>Cara Pemesanan</li>
                                <li>Cara Pembayaran</li>
                                <li>Informasi Pengiriman</li>
                                <li>Lacak Pesanan</li>
                                <li>Pembatalan Transaksi</li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <h5 className="teks-sub">METODE PEMBAYARAN</h5>
                            <img width="250px" src="https://eraspace.com/pub/media/wysiwyg/footer/All_Payment_Method_27_Februari_2020_.png" alt="" />
                            <br /> <br />
                            <h4 className="teks-sub">JASA PENGIRIMAN</h4>
                            <img src="https://eraspace.com/pub/media/wysiwyg/footer/All_Delivery_Options.png" alt="" />
                            <br /> <br />
                            <h4 className="teks-sub">TEMUKAN KAMI</h4>
                            <div>
                                <ul className="d-flex flex-row justify-content-around">
                                    <li>
                                        <a href="">
                                            <img class="gambar" width="50px" src="https://www.freepnglogos.com/uploads/whatsapp-logo-image-8.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img class="gambar" width="50px" src="https://www.freepnglogos.com/uploads/youtube-vector-logo-png-9.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img class="gambar" width="50px" src="https://pngimg.com/uploads/twitter/twitter_PNG3.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <img class="gambar" width="50px" src="https://www.freepnglogos.com/uploads/instagram-logos-png-images-free-download-2.png" alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-footer-3 text-center">
                    <p style={{color:"white"}}> Copyright © 2011- 2020 Gadget.com toko online dengan sensasi belanja online store ala mall</p>
                </div>
            </>
        )
    }
}

export default Footer