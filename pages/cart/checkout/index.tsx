import React from "react";
import Head from 'next/head'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useSelector } from "react-redux";

// Types
import { IrootState } from "../../../types/types";

// Styles
import s from './checkout.module.scss'

const options = {
  "client-id": `${process.env.PAYPAL_CLIENT_ID}`,
  currency: "USD",
}

const Checkout = () => {

    const items = useSelector((state: IrootState) => state.cart)
    const totalToPay = items.reduce((accu, curr) => {
        return accu+=curr.total
    }, 0)

    return (
        <div>
            <Head>
                <title> Checkout </title>
            </Head>

            <main className={s.main}>

                <div className={s.checkoutRoot}>

                    <div className={s.title}>
                        <h1> Checkout </h1>
                    </div>

                    <div className={s.paypal}>
                        <PayPalScriptProvider options={options}>
                            <PayPalButtons
                                style={{ layout: "horizontal" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: `${totalToPay}`,
                                                }
                                            },
                                        ]
                                    })
                                }}
                            />
                        </PayPalScriptProvider>
                    </div>

                </div>

            </main>

        </div>
    )

}

export default Checkout