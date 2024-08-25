import React, { useState, useEffect, useRef } from 'react';
import './CartTable.css';
import { useCartContext } from './CartContext';

const CartTable = ({ products, cartProducts }) => {
  const [scrollClass, setScrollClass] = useState('inactive-scrollbar');
  const tableContainerRef = useRef(null);
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

    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const calculateTotal = () => {
    let overallTotal = 0;
    const productTotals = products.map(product => {
      const quantity = cartProducts.filter(id => id === product._id).length;
      const total = product.price * quantity;
      overallTotal += total;
      return total;
    });
    return { productTotals, overallTotal };
  };

  const { productTotals, overallTotal } = calculateTotal();

  return (
    <section className={`w-full h-[50vh] overflow-hidden`}>
      <div
        ref={tableContainerRef}
        className={`h-[calc(100%-4rem)] overflow-y-auto scrollbar-thin scrollbar-track-gray-200 ${scrollClass}`}
      >
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="py-2">Product</th>
              <th className="py-2">Price</th>
              <th className="py-2">Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
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
                <td className="py-2">{productTotals[index].toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-gray-50 flex justify-between py-4 px-4">
        <button onClick={() => emptyCart()} className='bg-red-400 px-2 rounded-sm'>Empty Cart</button>
        <h2>Overall Total: {overallTotal.toFixed(2)}</h2> 
      </div>
    </section>
  );
};

export default CartTable;
