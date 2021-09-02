import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetServerSideProps } from "next";
import cookies from 'next-cookies'
import Head from 'next/head'
import { useRouter } from "next/router";

// Firebase
import { firebaseAdmin } from "../../firebase/server";

// Types
import { IrootState } from "../../types/types";

// Redux
import { addToCart, removeToCart } from "../../redux/actions/cart";

// Styles
import s from './cart.module.scss'

export const getServerSideProps: GetServerSideProps = async (ctx) => { 

    const { KBDZToken } = cookies(ctx) as { KBDZToken: string }

    // try {

        // const result = await firebaseAdmin.verifyIdToken(KBDZToken, true)

        if (!KBDZToken) {
            return {
                redirect: {
                    destination: '/shop',
                    permanent: true
                },
                props: { }
            }
        }

        return {
            props: { }
        }
        
    // } catch (err) {
    //     return {
    //         redirect: {
    //             destination: '/shop',
    //             permanent: true
    //         },
    //         props: { }
    //     }
    // }

}

const Cart = () => {

    const dispatch = useDispatch()
    const router = useRouter()
    const items = useSelector((state: IrootState) => state.cart)
    const total = useSelector((state: IrootState) => state.cart).reduce((accu, curr) => {
        return accu+=curr.total
    }, 0)

    return (
        <div>
            <Head>
                <title> My Cart </title>
            </Head>
            
            <main className={s.main}>

                <div className={s.cart}>

                    <div className={s.title}>
                        <h1> My Cart </h1>
                    </div>
                    
                    <div className={s.myItems}>
                        
                        { items.length === 0 && <div className={s.emptyCart}>
                            <p> Your cart is empty </p>
                        </div> }

                        { items.map(item => {
                            return (
                                <div className={s.item} key={item.id}>
                                    <div className={s.itemInfo}>
                                        <h1> {item.id} </h1>
                                        <p> X <span> {item.qty} </span> </p>
                                    </div>

                                    <div className={s.itemBtns}>
                                        <p> ${item.total} </p>
                                        <button onClick={() => dispatch(removeToCart(item.id, item.price))}> - </button>
                                        <button onClick={() => dispatch(addToCart(item.id, item.price))}> + </button>
                                    </div>
                                </div>
                            )
                        }) }

                    </div>

                    { items.length > 0 && <div className={s.totalToPay}>
                        <h3 > Total: <strong> ${total} </strong> </h3    >
                    </div> }

                    { items.length > 0 && <div className={s.payBtns}>
                        {/* <PayPalScriptProvider options={options}>
                            <PayPalButtons style={{
                                layout: 'vertical',
                                label: 'checkout'
                            }} createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "2.00",
                                            },
                                        },
                                    ],
                                })
                            }} />
                        </PayPalScriptProvider> */}
                        <button onClick={() => router.push(`${router.asPath}/checkout`)}> Checkout </button>
                    </div> }

                </div>

            </main>
        </div>
    )

}

export default Cart