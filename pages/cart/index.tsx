import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetServerSideProps } from "next";
import cookies from 'next-cookies'
import Head from 'next/head'
import { toast, ToastContainer } from "react-toastify";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5'
import { createInvoice, download } from 'easyinvoice';
import Image from 'next/image'
import axios from "axios";

// Utils
import { invoiceData } from "../../utils/easyinvoice";
import { paymayaBody } from "../../utils/paymaya/paymaya";

// Types
import { IrootState, Tpaymaya } from "../../types/types";

// Redux
import { addToCart, removeToCart, sucessBuyClear } from "../../redux/actions/cart";

// Styles
import 'react-toastify/dist/ReactToastify.css';
import s from './cart.module.scss'

const options = {
    "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
    "currency": 'PHP'
}

export const getServerSideProps: GetServerSideProps = async (ctx) => { 

    const { KBDZToken } = cookies(ctx) as { KBDZToken: string }

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

}

const Cart = () => {

    const dispatch = useDispatch()
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
                    
                    <div className={s.myCart}>

                        <div className={s.myItems}>

                            { items.length === 0 && <div className={s.emptyCart}>
                                <h3> No items, Start adding now. </h3>
                            </div> }

                            { items.map(item => {
                                return (
                                    <div className={s.item} key={item.id}>
                                        <div className={s.itemInfo}>
                                            
                                            <div className={s.firstLayer}>
                                                <div className={s.itemImg}>
                                                    <Image height={1000} width={1000} src={'/mech-png.png'} alt="sf" />
                                                </div>
                                            </div>

                                            <div className={s.secondLayer}>

                                                <div className={s.itemDesc}>
                                                    <h2> {item.id} </h2>
                                                    <p> Quantity: {item.qty} </p>
                                                </div>

                                                <div className={s.itemBtns}>
                                                    <p> &#8369;{item.total} </p>
                                                    <button onClick={() => dispatch(removeToCart(item.id, item.price))}>
                                                        <IoRemoveOutline color="#3373C4" size={20} />
                                                    </button>
                                                    <button onClick={() => dispatch(addToCart(item.id, item.price))}>
                                                        <IoAddOutline color="#3373C4" size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                                )
                            }) }

                        </div>

                        <div className={s.checkout}>

                            <div className={s.title}>
                                <h2> Checkout </h2>
                            </div>

                            <div className={s.totalToPay}>
                                <h3> Total: &#8369;{total} </h3>
                            </div>
                            
                            <div className={s.paypal}>
                                <PayPalScriptProvider options={options}>
                                    <PayPalButtons
                                        disabled={items.length <= 0}
                                        style={{
                                            layout: 'horizontal'
                                        }}
                                        createOrder={(_data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                      amount: {
                                                        value: `${items.reduce((accu, curr) => {
                                                            return accu+=curr.total
                                                        }, 0)}`
                                                      }
                                                    },
                                                ]
                                            })
                                        }}
                                        onApprove={(_data, actions) => {
                                            return actions.order.capture().
                                            then(async res => {
                                                toast('Payment Success.', { type: 'success' })
                                                const invoiceResult = await createInvoice(invoiceData(items, res.payer))
                                                download('myreceipt', invoiceResult.pdf)
                                                dispatch(sucessBuyClear())
                                            })
                                        }}
                                        onError={(err) => {
                                            toast('Please try again later.', { type: 'error' })
                                        }}
                                    />
                                </PayPalScriptProvider>
                            </div>

                            <div className={s.paymaya}>
                                <button disabled={items.length <= 0} onClick={async () => {

                                    const checkoutObj = paymayaBody(total, items)

                                    const { data } = await axios.post<Tpaymaya>('https://pg-sandbox.paymaya.com/checkout/v1/checkouts', checkoutObj, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': 'Basic cGstWjBPU3pMdkljT0kyVUl2RGhkVEdWVmZSU1NlaUdTdG5jZXF3VUU3bjBBaDo='
                                        }
                                    })

                                    dispatch(sucessBuyClear())
                                    document.cookie = `checkoutID=${data.checkoutId}; path=/;`
                                    window.open(data.redirectUrl, '_self')
                                    
                                }}> Pay with Paymaya </button>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    )

}

export default Cart