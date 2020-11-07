import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { updateCountInStockProduct } from "../actions/productActions";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  if (!paymentMethod) {
    props.history.push("/payment");
  }
  if (cartItems.length < 1) {
    props.history.push("/");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.21 * cart.itemsPrice);
  cart.totalPrice = toPrice(
    cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  );

  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));

    cart.cartItems.map((item) =>
      dispatch(
        updateCountInStockProduct({
          productId: item.product,
          newCountInStock: item.countInStock - item.qty,
        })
      )
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, props.history, order]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="placeOrder">
        <div className="placeOrder__details">
          <ul>
            <li>
              <div className="placeOrder__shipping">
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {shippingAddress.fullName} <br />
                  <strong>Address: </strong>
                  {shippingAddress.address},{shippingAddress.city},
                  {shippingAddress.postalCode},{shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="placeOrder__payment">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="placeOrder__items">
                <h2>Order Items</h2>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.product}>
                      <div className="placeOrder__itemsDetails">
                        <div>
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="placeOrder__summary">
          <div className="placeOrder_summaryDetails">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="placeOrder_summaryDetails__row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="placeOrder_summaryDetails__row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="placeOrder_summaryDetails__row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="placeOrder_summaryDetails__row">
                  <div>
                    <strong>Order Total:</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="btn effect01"
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
