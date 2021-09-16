import React from "react";
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head'
import cookies from 'next-cookies'
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useRouter } from "next/router";

// Firebase
import { firebaseDB } from "../../firebase/client";
import { firebaseAdmin } from "../../firebase/server";

// Utils
import { refreshToken } from "../../utils/refreshToken";

// Types
import { Ipurchases } from "../../types/types";

// Styles
import s from './purchasehistory.module.scss'

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const myPurchases = [] as Ipurchases[]
    const { KBDZRefreshToken } = cookies(ctx) as { checkoutID: string, KBDZToken: string, KBDZRefreshToken: string }

    if (!KBDZRefreshToken) {
        return {
            redirect: {
                destination: '/shop',
                permanent: true
            }
        }
    }

    const idToken = await refreshToken(KBDZRefreshToken)
    const { uid } = await firebaseAdmin.verifyIdToken(idToken)

    const myQuery = query(collection(firebaseDB, 'purchases'), where('purchasedBy', '==', uid ))
    const querySnapshots = await getDocs(myQuery)

    querySnapshots.forEach(doc => {
        myPurchases.push(doc.data() as Ipurchases)
    })

    return {
        props: { myPurchases }
    }

}

const PurchaseHistory: NextPage<{myPurchases: Ipurchases[]}> = ({myPurchases}) => {

    const router = useRouter()

    return (
        <div>
            
            <Head>
                <title> Purchased History </title>
            </Head>

            <main className={s.main}>
                
                <div className={s.title}>
                    <h1> My Purchased History </h1>
                </div>

                <div className={s.items}>
                    { myPurchases.map(item => {
                        return (
                            <div onClick={() => router.push(`/${router.asPath}/${item.paymentID}`)} key={item.paymentID} className={s.item}>
                                <li>  {item.paymentID} </li>
                            </div>
                        )
                    }) }
                </div>

            </main>

        </div>
    )

}

export default PurchaseHistory