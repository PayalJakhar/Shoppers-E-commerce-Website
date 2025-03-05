// import React, {useEffect, useState, useRef} from 'react'
// import './Popular.css';
// // import data_product from '../Assets/Frontend_Assets/data';
// import Item from '../Item/Item';

// export default function Popular() {
//   const [popularProducts,setPopularProducts] = useState([]);

//   useEffect(()=>{
//     fetch('http://localhost:4000/popularinwomen')
//     .then((response)=>response.json())
//     .then((data)=>setPopularProducts(data));
//   },[])
//   return (
//     <div className="popular">
//         <h1>POPULAR IN WOMEN</h1>
//         <hr/>
//         <div className="popular-item">
//             {popularProducts.map((item,i)=>{
//                 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//             })}
//         </div>
//     </div>
//   )
// }

import React, { useEffect, useState, useRef } from 'react';
import './Popular.css';
import Item from '../Item/Item';

export default function Popular() {
    const [popularProducts, setPopularProducts] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:4000/popularinwomen')
            .then((response) => response.json())
            .then((data) => setPopularProducts(data));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (divRef.current) observer.observe(divRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div ref={divRef} className={`popular-item ${isVisible ? 'active' : ''}`}>
                {popularProducts.length > 0 ? (
                    popularProducts.map((item, i) => (
                        <Item
                            key={item.id || i}
                            id={item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                        />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
