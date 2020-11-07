import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../components/MessageBox";
import { Link } from "react-router-dom";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="cart__container">
      <h1>Shopping Cart</h1>
      <div className="cart">
        <div className="cart__body">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="cart__product">
                    <div className="cart__itemStart">
                      <div className="cart__image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <Link
                        className="cart__itemName"
                        to={`/product/${item.product}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="cart__itemRest">
                      <div>${item.price}</div>
                      <div>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="cart__delete" onClick={() => removeFromCartHandler(item.product)}>
                        <DeleteForeverOutlinedIcon/>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart__summary">
          <div className="cart__summary__body">
            <ul>
              <li>
                <h2>
                  Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkoutHandler}
                  className="btn effect01"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
