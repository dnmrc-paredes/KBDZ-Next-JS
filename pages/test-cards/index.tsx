import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

// Styles
import s from './test-cards.module.scss'

const TestCards: NextPage = () => {

    return (
        <div>

            <Head>
                <title> KBDZ | Test Cards </title>
            </Head>

            <main className={s.main}>

                <div className={s.paypal}>
                    <h2> Paypal Test Account </h2>
                    <h3> Email: sb-lsuga7487046@personal.example.com </h3>
                    <h3> Password: {`S?{-R'j9`} </h3>
                </div>

                <div className={s.paymaya}>
                    <h2> Paymaya Test Card </h2>
                    <h3> Number: 5123456789012346 </h3>
                    <h3> Expiry: 12/25 </h3>
                    <h3> CSC/CVV: 111 </h3>
                </div>

                <p> Please don&apos;t use real accounts/cards, Thank you </p>

            </main>

        </div>
    )

}

export default TestCards