// import React from 'react'
// import './Breadcrum.css'
// import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png'

// const Breadcrum = (props) => {
//     const {product} = props;
//     return (
//         <div className='breadcrum'>
//             HOME <img src={arrow_icon} alt=""/> SHOP <img src={arrow_icon} alt=""/> {product.category} <img src={arrow_icon} alt=""/> {product.name};
//         </div>
//     )
// }

// export default Breadcrum
import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const { product } = props || {}; // Ensure props exist

    // Handle the case when product is undefined or missing properties
    if (!product) {
        return <div className='breadcrum'>Loading...</div>;
    }

    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> 
            {product?.category || "Unknown Category"} <img src={arrow_icon} alt="" /> 
            {product?.name || "Unknown Product"}
        </div>
    );
}

export default Breadcrum;
