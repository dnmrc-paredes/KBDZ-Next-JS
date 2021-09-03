import React, { useEffect } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";

// Styles
import s from './status.module.scss'
import { useState } from "react";

const Success = () => {

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
                <title> Success </title>
            </Head>

            <main className={s.main}>
                <div className={s.info}>
                    <h1> Payment Success! </h1>
                    <p> Thank you for choosing KBDZ, have a great day! </p>
                    <p> Redirecting in {redirectTimer}... </p>
                </div>
            </main>

        </div>
    )

}

export default Success