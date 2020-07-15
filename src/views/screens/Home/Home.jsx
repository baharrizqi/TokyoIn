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
import DITA from "../../../assets/music/DITA - How You Like That (Official Audio).mp3"
import S20 from "../../../assets/images/Gif/GalaxyS20Ultra.gif"
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


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
        larisProductData: [],
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
        if (this.state.count != 0) {
            document.getElementById('textJourney').innerHTML = ''
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
    getLarisProduct = () => {
        Axios.get(`${API_URL}/products/larisProduct`)
            .then((res) => {
                console.log(res.data)
                this.setState({ larisProductData: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    renderTerlarisProduct = () => {
        return this.state.larisProductData.map((val) => {
            if (val.sold) {
                return (
                    <>
                        <div class="item">
                            <h4>{val.productName}</h4>
                            <h6>Terjual :{" "}{val.sold} pcs</h6>
                            <Link to={"/product/" + val.id}>
                                <button type="button" class="btn btn-warning">View</button>
                            </Link>
                            <img style={{ width: "200px", height: "150px", objectFit: "contain" }} src={val.image} alt="" />
                        </div>
                    </>
                )
            }
        })
    }

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
        this.getLarisProduct()
        this.getnewProductData();
    }

    render() {
        return (
            <>
                <div>
                    {/* <audio  src={DITA} autoplay="autoplay"></audio> */}
                    <div className="carousel-item-home-bg-2">
                        <audio style={{ marginTop: "50px" }} controls>
                            <source src={DITA} type="audio/mp3" />
                        </audio>
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
                        <img style={{ width: "100%" }} src={S20} alt="" />
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
                                            <img onMouseOver={this.imgKiri} onClick={this.gambarUtama} class="img-fluid" style={{ height: "100%" }} src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2019/09/iPhone11camera-920x613.png" alt="" />
                                        iPhone 11
                                        </p>
                                    </div>
                                    <div className="col-sm">
                                        <p className="figure text-center">
                                            <img onMouseOver={this.imgTengah} onClick={this.gambarUtama} class="img-fluid" style={{ height: "100%" }} src="https://www.sizescreens.com/wp-content/uploads/2019/09/Huawei-Mate-30-Pro-1.jpg" alt="..." />
                                        Huawei P30 Pro
                                        </p>
                                    </div>
                                    <div className="col-sm">
                                        <p className="figure text-center">
                                            <img onMouseOver={this.imgKanan} onClick={this.gambarUtama} class="img-fluid" style={{ height: "100%" }} src="https://images.samsung.com/id/smartphones/galaxy-s20/images/kv/galaxy-s20_highlights_kv_00.jpg" alt="..." />
                                        Samsung S20
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bag-brand">
                        <div style={{ padding: "70px" }} className="container">
                            <h3><b>PRODUK</b> TERLARIS</h3>
                            <div className="row d-flex flex-wrap justify-content-center">
                                <OwlCarousel
                                    className="owl-theme"
                                    loop
                                    margin={10}
                                    nav
                                >
                                    {/* <div class="item"><h4>1</h4></div>
                                    <div class="item"><h4>2</h4></div>
                                    <div class="item"><h4>3</h4></div>
                                    <div class="item"><h4>4</h4></div>
                                    <div class="item"><h4>5</h4></div> */}
                                    {this.renderTerlarisProduct()}
                                </OwlCarousel>
                            </div>

                            {/* <div className="row d-flex flex-wrap justify-content-center">
                                {this.renderAllProduct()}
                            </div> */}
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
                        </div>
                    </div>

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