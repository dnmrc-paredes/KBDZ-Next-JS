import React from "react";
import Head from 'next/head'
import { useRouter } from "next/router";

// Styles
import s from './status.module.scss'

const Cancel = () => {

    const router = useRouter()

    return (
        <div>
            <Head>
                <title> Cancelled </title>
            </Head>

            <main className={s.main}>
                <div className={s.info}>
                    <h1> Payment Cancelled. </h1>
                    <p className={s.cancel} onClick={() => router.push('/cart')}> Go back </p>
                </div>
            </main>

        </div>
    )

}

export default Cancel