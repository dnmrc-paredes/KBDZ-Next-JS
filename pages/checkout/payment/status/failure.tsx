import React, { useEffect, useState } from "react";
import Head from 'next/head';
import { useRouter } from "next/router";

// Styles
import s from './status.module.scss'

const Failure = () => {

    const router = useRouter()
    const [redirectTimer, setRedirectTimer] = useState(5)

    useEffect(() => {
        const countdown = setTimeout(() => {
            setRedirectTimer(prev => prev-=1)
        }, 1000)
        
        return () => clearTimeout(countdown)
    }, [redirectTimer, router])

    useEffect(() => {

        if (redirectTimer === 0) {
            router.push('/cart')
            return
        }

    }, [redirectTimer, router])

    return (
        <div>
            <Head>
                <title> Failed </title>
            </Head>

            <main className={s.main}>
                <div className={s.info}>
                    <h1> Payment Failed. </h1>
                    <p> Please try again later. </p>
                    <p> Redirecting in {redirectTimer}... </p>
                </div>
            </main>

        </div>
    )

}

export default Failure