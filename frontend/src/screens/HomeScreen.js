import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [search, setSearch] = useState("");
  const [wasFiltered, setWasFiltered] = useState(false);
  let categories;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  if (!loading) {
    categories = products.filter(
      (obj, index, self) =>
        index === self.findIndex((t) => t.category === obj.category)
    );
  }
  const filterProducts = (category) => {
    setFilteredProducts(
      products.filter(function (product) {
        return product.category === category;
      })
    );
    setWasFiltered(true);
  };
  const resetFilters = () => {
    setWasFiltered(false);
  };
  const onChangeHandler = (e) => {
    setSearch(e);
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(e.toLowerCase())
      )
    );
    setWasFiltered(true);
  };

  return (
    <div className="home">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="search">
            <input
              value={search}
              placeholder="Search"
              onChange={(e) => {
                onChangeHandler(e.target.value);
              }}
            />
          </div>
          <div className="homeBottom">
            <div className="filter">
              <h1>Categories</h1>
              <ul>
                <li onClick={resetFilters}>
                  <strong>Clear filters</strong>
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat._id}
                    onClick={(e) => filterProducts(e.target.innerText)}
                  >
                    {cat.category}
                  </li>
                ))}
              </ul>
            </div>
            {wasFiltered ? (
              <div className="products">
                {filteredProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="products">
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default HomeScreen;
