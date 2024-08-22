import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useCartContext } from '../CartContext';

const Button = ({ text, product, children, onClick }) => {
  const router = useRouter();
  const { cartProducts, setCartProducts } = useCartContext();

  function pushTo() {
    router.push(`/products/${product._id}`);
  }

  useEffect(() => {
    // console.log('Current cartProducts:', cartProducts);
  }, [cartProducts]);

  async function handleButtonClick() {
    if (onClick) {
      try {
        // Assuming onClick is an async function returning the added product
        const addedProduct = await onClick(product);
        if (addedProduct) {
          // Update cartProducts after async operation completes
          setCartProducts(prev => [...prev, addedProduct]);
          // console.log('Updated cartProducts:', [...cartProducts, addedProduct]);
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    } else {
      pushTo();
    }
  }

  return (
    <button 
      onClick={handleButtonClick} 
      className="relative inline-flex overflow-hidden rounded-lg p-[1.5px] focus:outline-none"
    >
       <span className="absolute inset-[-50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-0 sm:px-3 py-1 text-md font-medium text-white backdrop-blur-3xl gap-2">
        {children}
        {text}
        </span>
    </button>
  );
};

export default Button;
