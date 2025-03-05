// import React, { useEffect, useState } from 'react';
// import './ListProduct.css';
// import cross_icon from '../../Assets/Admin_Assets/cross_icon.png';

// const ListProduct = () => {
//   const [allproducts, setAllProducts] = useState([]);

//   const fetchInfo = async () => {
//     await fetch('http://localhost:4000/allproducts')
//       .then((res) => res.json())
//       .then((data) => {
//         setAllProducts(data);
//       });
//   };

//   useEffect(() => {
//     fetchInfo();
//   }, []); // added a square bracket as we want this function to be executed only once

//   const remove_product = async (id) => {
//     await fetch('http://localhost:4000/removeproduct', {
//       method: 'POST', // POST request is typically used for sending data to the server to create or update a resource
//       headers: { // specifies the headers that will be included in the request
//         Accept: 'application/json', // This header tells the server that the client expects the response data to be in JSON format
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: id }) // Body contains the JSON data for the request (product ID)
//     });
//     fetchInfo(); // Refresh the product list after removing a product
//   };

//   return (
//     <div className='list-product'>
//       <h1>All Products List</h1>
//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Remove</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr />
//         {allproducts.map((product, index) => (
//           <div key={product.id} className="listproduct-format-main listproduct-format">
//             <img src={product.image} alt="" className="listproduct-product-icon" />
//             <p>{product.name}</p>
//             <p>${product.old_price}</p>
//             <p>${product.new_price}</p>
//             <p>{product.category}</p>
//             <img 
//               onClick={() => remove_product(product.id)}
//               className="listproduct-remove-icon"
//               src={cross_icon} 
//               alt="remove icon" 
//             />
//           </div>
//         ))}
//         <hr />
//       </div>
//     </div>
//   );
// };

// export default ListProduct;

import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../Assets/Admin_Assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('http://localhost:4000/allproducts');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to remove product');

      // ✅ Update state immediately instead of calling fetch again
      setAllProducts((prevProducts) => prevProducts.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.length > 0 ? (
          allproducts.map((product) => (
            <div key={product.id} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price || 'N/A'}</p>
              <p>${product.new_price || 'N/A'}</p>
              <p>{product.category || 'Uncategorized'}</p>
              <img 
                onClick={() => remove_product(product.id)}
                className="listproduct-remove-icon"
                src={cross_icon} 
                alt="Remove"
              />
            </div>
          ))
        ) : (
          <p>Loading products...</p> // ✅ Prevents rendering errors when data is empty
        )}
        <hr />
      </div>
    </div>
  );
};

export default ListProduct;
