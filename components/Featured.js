'use client';
import React from 'react';
import Button from './ui/Button';

const Featured = ({ product }) => {
  const handleAddToCart = () => {
    // console.log('Added to cart');
    return product._id;
  };

  return (
    <section className="flex text-justify justify-center text-white bg-black py-14">
      <div className="grid gap-10 w-[80%] md:grid-cols-[1.1fr_0.9fr]">
        <div className="md:order-none order-2">
          <h1 className="text-4xl capitalize">{product.title}</h1>
          <p className="pt-4">
            {product.desc}
          </p>
          <div className='flex flex-wrap gap-2 pt-5'>
            <Button _id={product._id}>Read More</Button>
            <Button onClick={handleAddToCart}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Add to Cart
            </Button>
          </div>
        </div>
        <div>
          <img
            className="max-w-full max-h-52 block mx-auto"
            src={`${product.imgs[0].imgURL}`}
            alt="BestSellerImg"
          />
        </div>
      </div>
    </section>
  );
};

export default Featured;
