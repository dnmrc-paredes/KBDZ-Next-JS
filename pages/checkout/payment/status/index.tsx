import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from 'next-cookies'
import { useUnmount } from 'react-use'
import { doc, setDoc } from "firebase/firestore"; 

// Firebase
import { firebaseDB, firebaseAuth } from "../../../../firebase/client";
import { firebaseAdmin } from "../../../../firebase/server";

// Styles
import s from './status.module.scss'
import { TpaymayaCheckout } from "../../../../types/types";

const commaNumber = require('comma-number')

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { checkoutID, KBDZToken, KBDZRefreshToken } = cookies(ctx) as { checkoutID: string, KBDZToken: string, KBDZRefreshToken: string }

    if (!checkoutID) {
        return {
            notFound: true
        }
    } 

    const { data } = await axios.get<TpaymayaCheckout>(`https://pg-sandbox.paymaya.com/checkout/v1/checkouts/${checkoutID}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic c2stWDhxb2xZank2MmtJekVicjBRUksxaDRiNEtEVkhhTmN3TVlrMzlqSW5TbDo='
        }
    })

    const savedPurchase = async () => {

        const { uid } = await firebaseAdmin.verifyIdToken(KBDZToken)

        if (data.paymentStatus === 'PAYMENT_SUCCESS') {
            await setDoc(doc(firebaseDB, 'purchases', data.id), {
                paymentID: data.id,
                purchasedBy: uid,
                totalAmount: data.totalAmount,
                items: [...data.items]
            })
        }

    }

    // console.log(KBDZRefreshToken)
    await savedPurchase()

    // const data2 = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_ID}`, {
    //     body: `grant_type=refresh_token&refresh_token=${KBDZRefreshToken}`,
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     },
    //     method: "POST"
    // })

    const data3 = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_ID}`,
        `grant_type=refresh_token&refresh_token=${KBDZRefreshToken}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
    })
        
    console.log(data3)    

    return {
        props: { data }
    }

}

const Success: NextPage<{data: TpaymayaCheckout}> = ({data}) => {

    useUnmount(( ) => {
        document.cookie = `checkoutID=; path=/;`
    })

    const router = useRouter()
    const [redirectTimer, setRedirectTimer] = useState(15)

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
                <title> {data.paymentStatus === 'PAYMENT_SUCCESS' ? 'Success' : 'Pending'} </title>
            </Head>

            { data.paymentStatus === 'PAYMENT_SUCCESS' ? <main className={s.main}>
                <div className={s.info}>
                    <h1> Payment { data.paymentStatus === 'PAYMENT_SUCCESS' ? 'Success' : 'Pending' } </h1>
                    <p> Thank you for choosing KBDZ, have a great day! </p>

                    <div className={s.otherInfo}>
                        <p className={s.paymentID}> Payment ID: {data.id} </p>
                        <p className={s.items}> Items </p>
                        {data.items.map(item => {
                            return <div className={s.item} key={item.name}>
                                <p> {item.name} </p>
                                <p> x {item.quantity} </p>
                            </div>
                        })}
                        <div className={s.totalAmount}>
                            <p> Total: &#8369;{commaNumber(data.totalAmount.amount)} </p>
                        </div>
                    </div>
                    <p> Redirecting in {redirectTimer}... </p>
                </div>
            </main> : <main className={s.main2}>
                <h1> Payment Pending </h1>
                <p> Please continue the process </p>
            </main> }

        </div>
    )

}

export default Success