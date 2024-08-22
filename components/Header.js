'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useCartContext } from './CartContext';

const Header = () => {
    const [head, setHead] = useState(false);
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const {cartProducts, setCartProducts}=useCartContext()
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHead(true);
            } else {
                setHead(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setMenu(false);
            }
        };

        if (menu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menu]);

    return (
        <header className={`w-full sticky flex justify-center py-10 text-xl ${head ? 'bg-white shadow-md hi' : 'bg-black text-white'}`}>
            <div className="flex justify-between w-[80%]">
                <div>
                    <Link href="/">Duck</Link>
                </div>
                <div>
                    <nav className="flex gap-6">
                        <button
                            ref={buttonRef}
                            onClick={() => setMenu(!menu)}
                            className="inline md:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                        <aside
                            ref={menuRef}
                            className={`fixed w-[40%] h-[70%] flex flex-col bg-white text-black right-0 top-[20%] shadow-md rounded-md transition-transform duration-500 ease-in-out z-50 transform ${
                                menu ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        >
                            <Link href="/" className="p-4">Home</Link>
                            <Link href="/products" className="p-4">All products</Link>
                            <Link href="/categories" className="p-4">Categories</Link>
                            <Link href="/account" className="p-4">Account</Link>
                            <Link href="/cart" className="p-4">Cart ( {cartProducts.length} )</Link>
                        </aside>
                        <Link href="/" className="hidden md:inline">Home</Link>
                        <Link href="/products" className="hidden md:inline">All products</Link>
                        <Link href="/categories" className="hidden md:inline">Categories</Link>
                        <Link href="/account" className="hidden md:inline">Account</Link>
                        <Link href="/cart" className="hidden md:inline">Cart ( {cartProducts.length} )</Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
