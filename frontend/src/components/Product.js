import React from "react";
import { Link } from "react-router-dom";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import { useHistory } from "react-router-dom";

function Product({ product }) {
  let history = useHistory();
  const addToCartHandler = () => {
    history.push(`/cart/${product._id}?qty=1`);
  };
  return (
    <div key={product._id} className="product__card">
      <Link className="product__image" to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product__info">
        <Link to={`/product/${product._id}`} className="product__title">
          {product.name}
        </Link>
        <div className="product__bottom">
          <div className="product__price">${product.price.toFixed(2)}</div>
          {product.countInStock >= 1 ? (
            <div className="product__addToBasket" onClick={addToCartHandler}>
              <AddShoppingCartOutlinedIcon />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
