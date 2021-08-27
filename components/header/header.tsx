import React, { useState, useEffect } from "react";
import Link from 'next/link'

// Styles
import s from './header.module.scss'

export const Header = () => {

    const [showMenu1, setShowMenu1] = useState(false)
    const [showMenu2, setShowMenu2] = useState(false)

    return (
        <nav className={s.navbar}>
            <div className={s.navlogo}>
                <h1> Kbdz </h1>
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
                <Link href="login"> Login / Register </Link>
            </div>
        </nav>
    )

}