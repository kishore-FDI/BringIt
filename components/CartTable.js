import React, { useState, useEffect, useRef } from 'react';
import './CartTable.css';
import { useCartContext } from './CartContext';

const CartTable = ({ products, cartProducts }) => {
  const [scrollClass, setScrollClass] = useState('inactive-scrollbar');
  const sectionRef = useRef(null);
  const { addProducts, removeProducts, removeAllProducts, emptyCart } = useCartContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrollClass('active-scrollbar');
      
      // Delay before starting the fade-out
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => {
        setScrollClass('inactive-scrollbar');
      }, 3000);  // 3 seconds after scrolling stops
    };

    if (sectionRef.current) {
      sectionRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`w-full h-[50vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 ${scrollClass}`}
    >
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="py-2">Product</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="flex flex-col items-center mb-5 py-2">
                <img src={product.imgs[0]?.imgURL} alt="" className="w-[150px]" />
                {product.title}
              </td>
              <td className="py-2">{product.price}</td>
              <td className="py-2 h-full">
                <div className=''>
                  <div className='flex items-center justify-center gap-3'>
                    <button onClick={() => removeProducts(product._id)}>-</button>
                    <div>
                      <h2>{cartProducts.filter(id => id === product._id).length}</h2>
                    </div>
                    <button onClick={() => addProducts(product._id)}>+</button>
                  </div>
                 <button className='bg-red-400 px-2 rounded-sm' onClick={() => removeAllProducts(product._id)}>Remove All</button>
                </div>
              </td>
              </tr>
          ))}
        </tbody>
      </table>
          <div className="w-full flex justify-end mb-4">
            <button onClick={() => emptyCart()} className='bg-red-400 px-2 rounded-sm'>Empty Cart</button>
          </div>
    </section>
  );
};

export default CartTable;
