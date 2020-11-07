import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { signOut } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserListScreen from "./screens/UserListScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/cart/:id?" component={CartScreen} />
      <Route path="/product/:id" component={ProductScreen} exact />
      <Route path="/product/:id/edit" component={ProductEditScreen} exact />
      <Route path="/signin" component={SigninScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/shipping" component={ShippingAddressScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order/:id" component={OrderScreen} />
      <Route path="/orderhistory" component={OrderHistoryScreen} />
      <PrivateRoute path="/profile" component={ProfileScreen} />
      <AdminRoute path="/orderlist" component={OrderListScreen} />
      <AdminRoute path="/productlist" component={ProductListScreen} />
      <AdminRoute path="/userlist" component={UserListScreen} />
      <Route path="/" component={HomeScreen} exact />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
