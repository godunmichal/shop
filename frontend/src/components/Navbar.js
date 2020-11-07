import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "../actions/userActions";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Avatar from "react-avatar";

function Navbar(props) {
  let history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signOut());
    history.push("/");
  };
  return (
    <div className="navbar__container">
      <div className="navbar__logo">
        <Link to="/">GodElectro</Link>
      </div>
      <div className="navbar__menu">
        {userInfo ? (
          <div className="navbar__menuDropdown">
            <Avatar
              className="navbar__menuDropdownIcon"
              size={32}
              round={true}
              maxInitials={1}
              name={userInfo.name}
            />
            <Link to="#" className="navbar__menuDropdownName">
              {userInfo.name} <i className="fa fa-caret-down" />
            </Link>
            <ul className="navbar__menuDropdownContent">
              <li>
                <Link to="/profile">User Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              {userInfo && userInfo.isAdmin && (
                <>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="#signout" onClick={signOutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin" className="singin_text">
            Sign In
          </Link>
        )}
        <Link to="/cart" className="cart_icon">
          <ShoppingCartOutlinedIcon style={{ fontSize: 32 }} />{" "}
          {cartItems.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
