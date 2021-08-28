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
    const [showMenu2, setShowMenu2] = useState(false)
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
                        // onMouseLeave={() => setShowMenu1(false)}
                    > All Products </p>
                    
                    { showMenu1 && <div
                        onMouseOver={() => setShowMenu1(true)}
                        onMouseLeave={() => setShowMenu1(false)}
                        className={s.allproductsdropdown}
                    >
                        <Link href="royal-kludge-products"> Royal Kludge </Link>
                        <Link href="red-dragon-products"> Red Dragon </Link>
                        <Link href="ajazz-products"> Ajazz </Link>

                    </div> }
                </div>

                <div className={s.categoriesmain}>
                    <p
                        onMouseOver={() => setShowMenu2(true)}
                        // onMouseLeave={() => setShowMenu2(false)}
                    > Categories </p>

                    { showMenu2 && <div 
                        onMouseOver={() => setShowMenu2(true)}
                        onMouseLeave={() => setShowMenu2(false)}
                        className={s.categoriesdropdown}>
                            
                        <Link href="mechanical"> Mechanical </Link>
                        <Link href="membrane"> Membrane </Link>
                        <Link href="bluetooth"> Bluetooth </Link>
                    </div> }
                </div>
                {/* <p> Categories </p> */}
                <Link href="contact"> Contact </Link>
                <Link href="aboutus"> About Us </Link>
                
            </div>

            <div className={s.loginregister}>
                <Badge style={{margin: '0 2rem', cursor: 'pointer'}} badgeContent={ user ? 10 : 0 } color="primary" > <IoCartOutline size={25} color="#3373C4" /> </Badge>
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