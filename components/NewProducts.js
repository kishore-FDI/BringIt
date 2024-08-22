'use client';
import React, { useEffect, useState } from 'react';
import { useCartContext } from './CartContext';
import { toast } from 'react-toastify';

const NewProducts = ({ products }) => {
  const [tooSmall, setTooSmall] = useState(false);
  const [verySmall, setVerySmall] = useState(false);
  const [touch, setTouch] = useState(false);

  const { cartProducts, setCartProducts } = useCartContext();

  useEffect(() => {
    document.addEventListener('touchstart', (e) => {
      setTouch(true);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 365) {
        setTooSmall(true);
      } else {
        setTooSmall(false);
      }
      if (window.innerWidth < 227) {
        setVerySmall(true);
      } else {
        setVerySmall(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addFeaturedToCart = (id) => {
    setCartProducts(prevCartProducts => [...prevCartProducts, id]);
    toast.success('Added to cart');
    localStorage.setItem('cartItems',cartProducts)
    console.log(localStorage.getItem('cartItems'))
    // console.log(cartProducts)
  };

  return (
    <section className='py-4 mt-6 flex items-center justify-center'>
      <div className='w-[82%] '>
        <h1 className='text-3xl pl-2 mb-4'>
          New Products <br />
          Check them out .
        </h1>
        <div className='text-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {products?.length > 0 &&
            products.map((product) => (
              <div
                key={product._id}
                className={`flex flex-col justify-between items-center shadow-md m-4 p-4 bg-white rounded ${touch ? '' : 'product-card'}`}
              >
                <button
                  onClick={() => (window.location.href = `/product/${product._id}`)}
                  className={`bg-gray-100 w-full h-[80%] flex items-center justify-center p-4 ${touch ? '' : 'product-div'}`}
                >
                  <img
                    src={product?.imgs[0]?.imgURL}
                    className={`max-h-[200px] product-img ${touch ? '' : 'product-img'}`}
                    alt=''
                  />
                </button>
                <div className={`flex ${tooSmall ? 'flex-col items-center text-center' : 'flex-row'} justify-between mt-2 w-full`}>
                  <div className={`flex flex-col w-[50%] ${verySmall ? 'hidden' : ''}`}>
                    <span className='truncate'>{product.title}</span>
                    <span>₹ {product.price}</span>
                  </div>
                  <button onClick={()=>addFeaturedToCart(product._id)} className='flex flex-row gap-2 bg-gray-100 p-2 rounded-md '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                      />
                    </svg>
                    To cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
