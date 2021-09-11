import React from "react";
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import cookies from 'next-cookies'
import axios from 'axios'
import { collection, getDocs, query, where } from "@firebase/firestore";

// Firebase
import { firebaseDB } from "../../firebase/client";
import { firebaseAdmin } from "../../firebase/server";

// Styles
import s from './purchasehistory.module.scss'

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    // const purchasesSnapshots = await getDocs(collection(firebaseDB, 'purchases'))
    // purchasesSnapshots.forEach(doc => {
    //     console.log(doc.data())
    // })
    const { KBDZToken } = cookies(ctx) as { checkoutID: string, KBDZToken: string, KBDZRefreshToken: string }

    const { uid } = await firebaseAdmin.verifyIdToken(KBDZToken)

    const myQuery = query(collection(firebaseDB, 'purchases'), where('purchasedBy', '==', uid ))
    const querySnapshots = await getDocs(myQuery)

    querySnapshots.forEach(doc => {
        console.log(doc.data())
    })

    return {
        props: { }
    }

}

const PurchaseHistory = () => {

    return (
        <div>
            <Head>
                <title> Purchase History </title>
            </Head>

            <main className={s.main}>
                
            </main>
        </div>
    )

}

export default PurchaseHistory