import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../Assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    });

    const imageHandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Updates the image state with the selected file.
        }
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        try {
            let formData = new FormData();
            formData.append('product', image);

            // Upload image
            const uploadResponse = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            if (!uploadResult.success) {
                alert('Image upload failed');
                return;
            }

            // Update product details with image URL
            const updatedProduct = { ...productDetails, image: uploadResult.image_url };

            // Add product to database
            const addResponse = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            const addResult = await addResponse.json();
            if (addResult.success) {
                alert('Product added successfully!');
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error('Error while adding product:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className='addproduct-thumbnail-img'
                        alt=""
                    />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
        </div>
    );
};

export default AddProduct;
