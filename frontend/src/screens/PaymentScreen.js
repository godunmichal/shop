import React, { useState } from "react";
import CheckoutSteps from "../components/CheckoutSteps";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  if (cartItems.length < 1) {
    props.history.push("/");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <div className="payment">
      <CheckoutSteps step1 step2 step3 />
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button className="btn effect01" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
