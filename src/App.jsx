import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Cart from "./views/screens/Cart/Cart";
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import { userKeepLogin, cookieChecker } from "./redux/actions";
import Payments from "./views/screens/Admin/Payments";
import PageNotFound from "./views/screens/PageNotFound";
import History from "./views/screens/History/History";
import Report from "./views/screens/Admin/Report";
import NavbarUi from "./views/components/Navbar/NavbarUi";
import Footer from "./views/components/Footer/Footer";
import Product from "./views/screens/Product/Product";
import AboutUs from "./views/screens/AboutUs/AboutUs";
import ForgetPass from "./views/screens/Auth/ForgetPass";
import Profile from "./views/screens/Auth/Profile";
import ProductDetailsPaket from "./views/screens/ProductDetailsPaket/ProductDetailsPaket";

const cookieObj = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin") {
      return (
        <>
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/payments" component={Payments} />
          <Route exact path="/admin/report" component={Report} />
        </>
      );
    }
  };

  renderProtectedRoutes = () => {
    if (this.props.user.id) {
      return (
        <>
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/history" component={History} />
        </>
      );
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <NavbarUi />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route exact path="/forgetPass/:username/:verify" component={ForgetPass} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/product" component={Product} />
            <Route
              exact
              path="/product/:productId"
              component={ProductDetails}
            />
            <Route
              exact
              path="/productPaket/:paketId"
              component={ProductDetailsPaket}
            />
            <Route exact path="/aboutus" component={AboutUs} />
            {this.renderAdminRoutes()}
            {this.renderProtectedRoutes()}
            <Route path="*" component={PageNotFound} />
          </Switch>
          <Footer />
        </>
      );
    } else {
      return <div>Loading ...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

/**
 * PR
 * 1. Add to cart, jika barang double, qty yg akan bertambah
 * 2. Di Home, ketika click PHONE/LAPTOP/TAB/DESKTOP
 * 3. Di navbar, ketika ketik, secara otomatis filter products
 * 4. Di cart, buat button checkout, serta dengan proses checkout
 * 5. Ketika confirm checkout, lakukan POST request ke db.json ke transaction
 *    -> lalu cart harus kosong
 *
 * TRANSACTIONS
 * userId
 * total price
 * status -> "pending"
 * tanggal belanja
 * tanggal selesai -> ""
 *
 * TRANSACTION_DETAILS
 * transactionId
 * productId
 * price
 * quantity
 * totalPrice (price * quantity)
 *
 */
