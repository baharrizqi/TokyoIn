import React from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselControl, CarouselItem } from "reactstrap";
import "./Home.css";
import Axios from "axios";
import { API_URL } from "../../../constants/API";



import iPhoneX from "../../../assets/images/Showcase/iPhone-X.png";
import iPhone8 from "../../../assets/images/Showcase/iPhone-8.png";
import iPadPro from "../../../assets/images/Showcase/iPad-Pro.png";
import ProductCard from "../../components/Cards/ProductCard";


// Dapatkan Info dan Promo menarik di website gadget

const dummy = [
    {
        productName: "Selamat Datang Di Toko MyGadget",
        image: "https://eraspace.com/pub/media/kemana/bannerslider/banner/image/s/l/slider_banner_bose_ramadan_deals_1600x542px_15_mei_2020_.jpg",
        desc: `Visi Misi Kami adalah menjadi pelayanan terbaik nomor 1 di indonesia`,
        id: 1,
    },
    {
        productName: "Untuk mendapatkan informasi lebih lanjut mengenai produk elektronik terbaru, lakukan registrasi member pada website Gadget Indonesia",
        image: "https://eraspace.com/pub/media/kemana/bannerslider/banner/image/s/l/slider_banner_terimakasih_tim_medis_1600x542px_27_april_2020_.jpg",
        desc: ``,
        id: 2,
    },
    {
        productName: "Segala bentuk penipuan atau kejahatan yang mengatasnamakan Gadget Indonesia, Anda dapat melakukan laporan pengaduan di Customer Service",
        image: "https://eraspace.com/pub/media/kemana/bannerslider/banner/image/s/l/slider_banner_eraxpress_1600x542px_23_april_2020_.jpg",
        desc: ``,
        id: 3,
    },
];
class Home extends React.Component {
    state = {
        activeIndex: 0,
        animating: false,
        newProductData: [],
        count: 0,
    };


    imgKanan = () => {
        document.getElementById('textJourney').innerHTML =
            `<img id="text-kanan" style="height:100%" class="img-fluid" src="https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg" alt=""/>`
        setTimeout(() => {
            document.getElementById('text-kanan').style.opacity = '1'
        }, 1)
        this.state.count = 1
    }
    imgTengah = () => {
        document.getElementById('textJourney').innerHTML =
            `<img id="text-tengah" class="img-fluid" src="https://www.sizescreens.com/wp-content/uploads/2019/09/Huawei-Mate-30-Pro-1.jpg" alt=""/>`
        setTimeout(() => {
            document.getElementById('text-tengah').style.opacity = '1'
        }, 1)
        this.state.count = 1
    }
    imgKiri = () => {
        document.getElementById('textJourney').innerHTML =
            `<img id="text-kanan" class="img-fluid" style="width:100%" src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/09/iPhone11camera-920x613.png" alt=""/>`
        setTimeout(() => {
            document.getElementById('text-kanan').style.opacity = '1'
        }, 1)
        this.state.count = 1
        console.log(this.state.count)
    }
    // utamaText = () => {
    //     if (this.state.count != 0) {
    //         document.getElementById('textJourney').innerHTML =
    //             `<h1 id="h1Main" style="text-align: center;
    //             font-size: 74px;
    //             font-family: serif ; opacity:0; transition: 0.5s;" class="text-white blink">Our Journey</h1>`
    //         setTimeout(function () {
    //             document.getElementById('h1Main').style.opacity = '1'
    //         }, 1)
    //         this.state.count = 0
    //     }
    // }
    gambarUtama = () => {
        if (this.state.count !=0) {
           document.getElementById('textJourney').innerHTML=''
        }
        console.log(this.state.count)
    }
    gantiGambar = () => {
        document.getElementById('textJourney').innerHTML =
            `<img id="text-kanan" class="img-fluid" style="width:100%" src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/09/iPhone11camera-920x613.png" alt=""/>`
        setTimeout(() => {
            document.getElementById('text-kanan').style.opacity = '1'
        }, 1)
        this.state.count = 1
        console.log(this.state.count)
    }

    renderCarouselItems = () => {
        return dummy.map(({ image, productName, desc, id }) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({ animating: true })}
                    onExited={() => this.setState({ animating: false })}
                    key={id.toString()}
                >
                    <div className="carousel-item-home">
                        <div className="container position-relative">
                            <div className="row" style={{ paddingTop: "80px" }}>
                                <div className="col-12 text-white position-relative">
                                    <h2 className="text-center">{productName}</h2>
                                    <p className="text-center mt-4">{desc}</p>
                                </div>
                                {/* <div className="col-6 justify-content-center">
                                    <img src={image} alt="" style={{ height: "450px", objectFit: "contain", width: "1100px" }} />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            );
        });
    };

    nextHandler = () => {
        if (this.state.animating) return;
        let nextIndex =
            this.state.activeIndex === dummy.length - 1
                ? 0
                : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    };

    prevHandler = () => {
        if (this.state.animating) return;
        let prevIndex =
            this.state.activeIndex === 0
                ? dummy.length - 1
                : this.state.activeIndex - 1;
        this.setState({ activeIndex: prevIndex });
    };

    getnewProductData = () => {
        Axios.get(`${API_URL}/products/readProduct`)
            .then((res) => {
                this.setState({ newProductData: res.data });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    renderNewProduct = () => {
        return this.state.newProductData.map((val) => {
            if (val.year == 2020) {
                return (
                    <ProductCard data={val} className="m-2" />
                )
            }
        })
    }
    renderAllProduct = () => {
        return this.state.newProductData.map((val) => {
            return (
                <ProductCard data={val} className="m-2" />
            )
        })
    }
    componentDidMount() {
        this.getnewProductData();
    }

    render() {
        return (
            <>
                <div>
                    <div className="carousel-item-home-bg-2">
                        <img data-toggle="modal" data-target="#myModal-1" src="https://www.static-src.com/siva/asset//08_2018/Microsite-Official-Store-HTA.jpg" class="img-fluid gambarBagian" style={{ padding: "70px" }} alt="" />
                        <div class="modal fade" id="myModal-1" role="dialog">
                            <div style={{ marginTop: "100pt" }} class="modal-dialog modal-lg ">
                                <div class="modal-content">
                                    <div class="modal-body">
                                        <img src="https://www.static-src.com/siva/asset//08_2018/Microsite-Official-Store-HTA.jpg" style={{ height: "100%", width: "100%" }} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Carousel
                                className=" "
                                next={this.nextHandler}
                                previous={this.prevHandler}
                                activeIndex={this.state.activeIndex}
                            >
                                {this.renderCarouselItems()}
                                <CarouselControl
                                    directionText="Previous"
                                    direction="prev"
                                    onClickHandler={this.prevHandler}
                                />
                                <CarouselControl
                                    directionText="Next"
                                    direction="next"
                                    onClickHandler={this.nextHandler}
                                />
                            </Carousel>
                        </div>

                        <div className="container-home">
                            <div className="container bag-gambarHome">
                                <div id="textJourney" >
                                    {/* <img style={{ opacity: "1" }} class="img-fluid" src="https://crowdsupport.telstra.com.au/t5/image/serverpage/image-id/23310i215CFD4C0721175F/image-size/large?v=1.0&px=999" alt="" /> */}
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-sm">
                                        <p className="figure text-center">
                                            <img onMouseOver={this.imgKiri} onClick={this.gambarUtama}  class="img-fluid" style={{ height: "100%" }} src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/09/iPhone11camera-920x613.png" alt="" />
                                        iPhone 11
                                        </p>
                                    </div>
                                    <div className="col-sm">
                                        <p className="figure text-center">
                                            <img onMouseOver={this.imgTengah} onClick={this.gambarUtama}  class="img-fluid" style={{ height: "100%" }} src="https://www.sizescreens.com/wp-content/uploads/2019/09/Huawei-Mate-30-Pro-1.jpg" alt="..." />
                                        Huawei P30 Pro
                                        </p>
                                    </div>
                                    <div className="col-sm">
                                        <p className="figure text-center">
                                            <img onMouseOver={this.imgKanan} onClick={this.gambarUtama}  class="img-fluid" style={{ height: "100%" }} src="https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg" alt="..." />
                                        Samsung S20
                                        </p>
                                    </div>

                                    {/* <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
                                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img src="https://crowdsupport.telstra.com.au/t5/image/serverpage/image-id/23310i215CFD4C0721175F/image-size/large?v=1.0&px=999" class="rounded d-block w-100" alt="..." />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>Huawei P 30 Pro</h5>
                                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img height="400px" src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova-5t/img/huawei-nova-5T-Color-Purple.jpg" class="rounded d-block w-100" alt="..." />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>Huawei Nova 5T</h5>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img src="https://www.sizescreens.com/wp-content/uploads/2019/09/Huawei-Mate-30-Pro-1.jpg" class="rounded d-block w-100" alt="..." />
                                            <div class="carousel-caption d-none d-md-block">
                                                <h5>Huawei Mate 30 Pro</h5>
                                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                                {/* <img class="rounded mx-auto d-block" style={{ width: "700px", height: "410px" }} src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova-5t/img/huawei-nova-5T-Color-Purple.jpg" alt="" /> */}
                                    {/* <div className="d-flex flex-column ml-2 ">
                                    <img class="rounded mx-auto d-block" style={{ width: "350px", height: "200px" }} src="https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg" alt="" />
                                    <img class="mt-1 rounded mx-auto d-block" style={{ width: "350px", height: "200px" }} src="https://eraspace.com/pub/media/kemana/bannerslider/banner/image/s/l/slider_banner_bose_ramadan_deals_1600x542px_15_mei_2020_.jpg" alt="" />
                                </div>  */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cover">
                        <div className="container">
                            <h3><b>PRODUK</b> TERBARU</h3>
                            <div className="row d-flex flex-wrap justify-content-center">
                                {this.renderNewProduct()}
                            </div>

                            {/* <div className="row d-flex flex-wrap justify-content-center">
                                {this.renderAllProduct()}
                            </div> */}


                            {/* <div className="d-flex">
                                <div class="card p-2" style={{ width: "18rem", height: "250px" }}>
                                    <div className="row">
                                        <div className="col-sm">
                                            <img src="https://eraspace.com/pub/media//kemana/productlabel/new-label.png" alt="" />
                                            <img style={{ width: "100px" }} src="https://eraspace.com/pub/media/catalog/product/cache/f4b8efa7d74ed1b942403ced0f2122da/h/m/hmi-c3k3332-mig_3.jpg" class="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-sm-9">
                                            <div class="card-body">
                                                <h5 class="card-title">XIAOMI REDMI 8A PRO</h5>
                                                <p class="teks">Rp. 1.500.000</p>
                                                <p class="card-text teks">Description</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row p-3">
                                        <button style={{ width: "150px" }} type="button" class="btn btn-primary">View</button>
                                        <button style={{ width: "150px" }} type="button" class="btn btn-danger">Buy</button>
                                    </div>
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </div>
                                <div class="card p-2" style={{ width: "18rem", height: "250px" }}>
                                    <div className="row">
                                        <div className="col-sm">
                                            <img src="https://eraspace.com/pub/media//kemana/productlabel/new-label.png" alt="" />
                                            <img style={{ width: "100px" }} src="https://eraspace.com/pub/media/catalog/product/cache/f4b8efa7d74ed1b942403ced0f2122da/h/m/hmi-c3k3332-mig_3.jpg" class="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-sm-9">
                                            <div class="card-body">
                                                <h5 class="card-title">XIAOMI REDMI 8A PRO</h5>
                                                <p class="teks">Rp. 1.500.000</p>
                                                <p class="card-text teks">Description</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row p-3">
                                        <button style={{ width: "150px" }} type="button" class="btn btn-primary">View</button>
                                        <button style={{ width: "150px" }} type="button" class="btn btn-danger">Buy</button>
                                    </div>
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </div>
                                <div class="card p-2" style={{ width: "18rem", height: "250px" }}>
                                    <div className="row">
                                        <div className="col-sm">
                                            <img src="https://eraspace.com/pub/media//kemana/productlabel/new-label.png" alt="" />
                                            <img style={{ width: "100px" }} src="https://eraspace.com/pub/media/catalog/product/cache/f4b8efa7d74ed1b942403ced0f2122da/h/m/hmi-c3k3332-mig_3.jpg" class="card-img-top" alt="..." />
                                        </div>
                                        <div className="col-sm-9">
                                            <div class="card-body">
                                                <h5 class="card-title">XIAOMI REDMI 8A PRO</h5>
                                                <p class="teks">Rp. 1.500.000</p>
                                                <p class="card-text teks">Description</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row p-3">
                                        <button style={{ width: "150px" }} type="button" class="btn btn-primary">View</button>
                                        <button style={{ width: "150px" }} type="button" class="btn btn-danger">Buy</button>
                                    </div>
                                    <small class="text-muted">Last updated 3 mins ago</small>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* 
                    <div className="row d-flex flex-wrap justify-content-center">
                    {this.renderAllProduct()}
                    </div> */}

                    {/* <div class="container p-5">
                        <div class="row">
                            <div class="col-sm">
                                <img style={{ width: "550px", height: "250px" }} src="https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova-5t/img/huawei-nova-5T-Color-Purple.jpg" alt="" />
                                </div>
                                <div className="column">
                                    <div className="col-sm">
                                        <img style={{ width: "350px", height: "150px" }} src="https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg" alt="" />
                                    </div>
                                    <div className="col-sm">
                                        <img style={{ width: "350px", height: "150px" }} src="https://eraspace.com/pub/media/kemana/bannerslider/banner/image/s/l/slider_banner_bose_ramadan_deals_1600x542px_15_mei_2020_.jpg" alt="" />
                                    </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="bag-brand">
                        <div className="container" style={{ backgroundColor: "#e0e0eb", padding: "70px" }}>
                            <h3><b>BRAND</b> PILIHAN</h3>
                            <div className="row">
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/huwawei.jpg" alt="" srcset="" />
                                </div>
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/all_brand_222x100px_-_color2.jpg" alt="" srcset="" />
                                </div>
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/brand-oppo-2020.png" alt="" srcset="" />
                                </div>
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/All_Brand_222x100px_-_Color12.jpg" alt="" />
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/realme.png" alt="" />
                                </div>
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/vivo.jpg" alt="" />
                                </div>
                                <div className="col-sm">
                                    <img className="logo-brand" src="https://eraspace.com/pub/media/ves/brand/xiaomi.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home