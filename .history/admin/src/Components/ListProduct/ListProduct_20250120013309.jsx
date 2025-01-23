import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../Assets/Assets_Admin/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
      });
  };

  const remove_product = async (id) => {
    await fetch(`http://localhost:4000/removeproduct/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAllProducts(allproducts.filter((product) => product.id !== id));
        } else {
          alert('Failed to remove product');
        }
      });
  };

  useEffect(() => {
    fetchInfo(); // Fetch data when the component mounts
  }, []); // Dependency array empty to run this only once

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        {/* Map the fetched data */}
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => {
                  remove_product(product.id);
                }}
                className="listproduct-remove-icon"
                src={cross_icon}
                alt=""
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
