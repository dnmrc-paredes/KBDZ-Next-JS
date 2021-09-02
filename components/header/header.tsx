import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { signOut, User } from "@firebase/auth";
import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'
import { Badge } from '@material-ui/core';
import { useSelector } from "react-redux";

// Context
import { useAuth } from "../../contexts/authContext";

// Types
import { IrootState } from "../../types/types";

// Styles
import s from './header.module.scss'

// Firebase
import { firebaseAuth } from "../../firebase/client";

export const Header = () => {

    const router = useRouter()
    const itemsTotal = useSelector((state: IrootState) => state.cart).reduce((accu, item) => {
        return accu+=item.qty
    }, 0)

    const items = useSelector((state: IrootState) => state.cart)

    const [showMenu1, setShowMenu1] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const { user } = useAuth() as { user: User, isLoggedIn: boolean}

    return (
        <nav className={s.navbar}>
            <div className={s.navlogo}>
                <h1 onClick={() => router.push('/')}> Kbdz </h1>
            </div>
            
            <div className={s.navlinks}>

                <div className={s.allproductsmain}>
                    <p 
                        onMouseOver={() => setShowMenu1(true)}
                    > All Products </p>
                    
                    { showMenu1 && <div
                        onMouseOver={() => setShowMenu1(true)}
                        onMouseLeave={() => setShowMenu1(false)}
                        className={s.allproductsdropdown}
                    >
                        <Link href="/royal-kludge-products"> Royal Kludge </Link>
                        <Link href="/redragon-products"> Redragon </Link>
                        <Link href="/ducky-products"> Ducky </Link>

                    </div> }
                </div>

                <Link href="/contact"> Contact </Link>
                <Link href="/aboutus"> About Us </Link>
                
            </div>

            <div className={s.loginregister}>
                <Badge style={{margin: '0 2rem', cursor: 'pointer'}} badgeContent={ user ? itemsTotal : 0   } color="primary" >
                    <div className={s.cart}>
                        <IoCartOutline onClick={() => setShowCart(prev => !prev)} size={25} color="#3373C4" />
                        { showCart ? <div className={s.cartShow}>
                            <div className={s.cartItems}>

                                { items.length === 0 && <div className={s.emptyCart}>
                                    <p> Your cart is empty </p>
                                    <p style={{fontSize: '0.8rem', marginTop: '0.5rem', color: 'gray'}}> Start adding items </p>
                                </div> }

                                { items.map(item => {
                                    return (
                                        <div className={s.items} key={item.id}>
                                            <p> {item.id} </p>
                                            <p> X {item.qty} </p>
                                        </div>
                                    )
                                }) }

                            </div>
                            <button onClick={() => {
                                setShowCart(false)
                                router.push('/cart')
                            }}> Go To Cart </button>
                        </div> : null }
                    </div>
                </Badge>
                { user ? <p onClick={() => {
                    document.cookie = `KBDZToken=; path=/;`
                    signOut(firebaseAuth)
                    router.push('/shop  ')
                }}> Logout </p> : <p>
                    <Link href="/login"> Login </Link> / <Link href="/register"> Register </Link>
                </p> }
            </div>
        </nav>
    )

}