import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { User } from "@firebase/auth";
import Link from 'next/link'
import Modal from 'react-modal';
import { IoCartOutline, IoPerson, IoLogInOutline } from 'react-icons/io5'
import { Badge } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
// import Skeleton from 'react-loading-skeleton';
import Image from 'next/image'

// Context
import { useAuth } from "../../contexts/authContext";

// Types
import { IrootState } from "../../types/types";

// Redux
import { clearCart } from "../../redux/actions/cart";

// Styles
import s from './header.module.scss'
import otherStyles from '../reusable/keyboardDetails/keyboardDetails.module.scss'
import 'reactjs-popup/dist/index.css';

// Firebase
import { firebaseAuth } from "../../firebase/client";

export const Header = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const items = useSelector((state: IrootState) => state.cart)
    const itemsTotal = useSelector((state: IrootState) => state.cart).reduce((accu, item) => {
        return accu+=item.qty
    }, 0)

    const [notLoggedInModal, setNotLoggedInModal] = useState(false)
    const [showMenu1, setShowMenu1] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const { user } = useAuth() as { user: User, isLoggedIn: boolean}

    const goToCart = () => {

        if (!user) {
            setNotLoggedInModal(true)
        }

        setShowCart(false)
        router.push('/cart')
    }

    const logout = async () => {

        dispatch(clearCart(firebaseAuth!.currentUser!.uid, items))
        document.cookie = `KBDZToken=; path=/;`
        document.cookie = `KBDZRefreshToken=; path=/;`
        router.push('/')

    }

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
                            <button onClick={goToCart}> Go To Cart </button>
                        </div> : null }
                    </div>
                </Badge>

                { user ? <div className={s.userImgRoot}>

                    { user.photoURL ? 
                        <Image onClick={() => setShowMenu(prev => !prev)} className={s.userImg} height={35} width={35} src={user.photoURL!} alt="sdafasdf" /> : 
                    <IoPerson style={{cursor: 'pointer'}} onClick={() => setShowMenu(prev => !prev)} color="#3373C4" size={25} /> }
                    
                    { showMenu && <div className={s.userImgList}>
                        <p onClick={() => router.push('/purchasehistory')}> Purchase History </p>
                        <p onClick={logout}> Logout </p>
                    </div> }

                </div> : <div className={s.register}>
                    <Link href="/login"> Login </Link>
                    <IoLogInOutline onClick={() => router.push('/login')} className={s.registerIcon} color="#3373C4" size={25} />
                </div> }
                
            </div>

            <Modal ariaHideApp={false} onRequestClose={() => setNotLoggedInModal(false)} style={{content: {
                display: 'flex',
                backgroundColor: 'white',
                height: '200px',
                maxWidth: '500px',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: `0px 0px 2px 0px rgba(0,0,0,0.75)`,
                zIndex: 10,
            }}} isOpen={notLoggedInModal} >
                <div className={otherStyles.modalInfo}>
                    <h3> You must be logged in to proceed </h3>
                    <button onClick={() => router.push('/login')}> Login </button>
                </div>
            </Modal>

        </nav>
    )

}