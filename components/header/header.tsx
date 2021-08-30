import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { signOut, User } from "@firebase/auth";
import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'
import { Badge } from '@material-ui/core';

// Context
import { useAuth } from "../../contexts/authContext";

// Styles
import s from './header.module.scss'

// Firebase
import { firebaseAuth } from "../../firebase/client";

export const Header = () => {

    const router = useRouter()

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
                <Badge style={{margin: '0 2rem', cursor: 'pointer'}} badgeContent={ user ? 10 : 0 } color="primary" >
                    <div className={s.cart}>
                        <IoCartOutline onClick={() => setShowCart(prev => !prev)} size={25} color="#3373C4" />
                        { showCart ? <div className={s.cartShow}>
                            <h1> safsf </h1>
                            <h1> safsf </h1>
                            <h1> safsf </h1>
                        </div> : null }
                    </div>
                </Badge>
                { user ? <p onClick={() => {
                    document.cookie = `KBDZToken=; path=/;`
                    // document.cookie = `KBDZAccessToken=; path=/;`
                    signOut(firebaseAuth)
                }}> Logout </p> : <p>
                    <Link href="login"> Login </Link> / <Link href="register"> Register </Link>
                </p> }
            </div>
        </nav>
    )

}