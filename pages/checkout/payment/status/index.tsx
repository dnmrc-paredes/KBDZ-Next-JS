import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { NextPage, GetServerSideProps } from "next";
import axios from "axios";
import cookies from 'next-cookies'
import { useUnmount } from 'react-use'

// Styles
import s from './status.module.scss'
import { TpaymayaCheckout } from "../../../../types/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { checkoutID } = cookies(ctx) as { checkoutID: string }

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

    console.log(data)

    // if (!params?.checkoutid) {
    //     return {
    //         notFound: true
    //     }
    // }

    return {
        props: { data }
    }

}

const Success: NextPage<{data: TpaymayaCheckout}> = ({data}) => {

    useUnmount(( ) => {
        document.cookie = `checkoutID=; path=/;`
    })

    // const router = useRouter()
    // const [redirectTimer, setRedirectTimer] = useState(5)

    // useEffect(() => {
    //     const countdown = setTimeout(() => {
    //         setRedirectTimer(prev => prev-=1)
    //     }, 1000)
        
    //     return () => clearTimeout(countdown)
    // }, [redirectTimer, router])

    // useEffect(() => {

    //     if (redirectTimer === 0) {
    //         router.push('/cart')
    //         return
    //     }

    // }, [redirectTimer, router])

    return (
        <div>
            <Head>
                <title> Success </title>
            </Head>

            <main className={s.main}>
                <div className={s.info}>
                    <h1> Payment {data.paymentStatus === 'PAYMENT_SUCCESS' ? 'Success' : 'Pending' } </h1>
                    <p> Thank you for choosing KBDZ, have a great day! </p>

                    <div className={s.otherInfo}>
                        <p> {data.id} </p>
                        {data.items.map(item => {
                            return <div key={item.name}>
                                <p> {item.name} </p>
                                <p> {item.quantity} </p>
                            </div>
                        })}
                        <p> {data.totalAmount.amount} </p>
                    </div>
                    {/* <p> Redirecting in {redirectTimer}... </p> */}
                </div>
            </main>

        </div>
    )

}

export default Success