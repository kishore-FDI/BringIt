'use client';
import { useCartContext } from "@/components/CartContext"; // Import the custom hook
import CartTable from "@/components/CartTable";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);
  const { cartProducts } = useCartContext(); // Use the custom hook to access the context

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    }
    else{
      setProducts([]);
    }
  }, [cartProducts]);

  return (
    <section className="flex flex-col w-full h-full md:h-screen bg-gray-100">
      <Header />
      <div className="size-full flex items-center justify-center my-10 ">
        <div className="flex md:flex-row gap-5 flex-col w-[75%] justify-between">
          <div className=" bg-white md:w-[60%]">
            <div className="flex items-center flex-col w-full">
              <h1 className="text-xl my-8">Cart Items</h1>
              {!products.length ? (
                <div>Your cart is empty</div>
              ) : (
                <CartTable products={products} cartProducts={cartProducts}/>
              )}
            </div>
          </div>
          <form className="bg-white p-4 px-10 flex flex-col md:w-[30%] max-h-[30vh]">
            <h1 className="text-xl">Order Information</h1>
            <input className="border border-b mt-2 rounded-sm" placeholder=" Address" />
            <input
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border border-b mt-2 rounded-sm"
              placeholder=" Contact "
              type="number"
            />
            <button className="bg-black text-white rounded-sm mt-2">Proceed for Payment</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
