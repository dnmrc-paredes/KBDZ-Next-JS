import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { doc, getDoc } from "firebase/firestore";

// Firebase
import { firebaseDB } from "../../../firebase/client";

// Types
import { Ipurchases } from "../../../types/types";

// Styles
import s from '../purchasehistory.module.scss'

const commaNumber = require('comma-number')

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [
            { params: { purchaseid: '1' } }
        ],
        fallback: "blocking"
    }

}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { purchaseid } = params as { purchaseid: string }
    const purchasesRef = doc(firebaseDB, 'purchases', purchaseid)
    const purchaseSnap = await getDoc(purchasesRef)

    if (!purchaseSnap.exists()) {
        return {
            notFound: true
        }
    }

    return {
        props: { data: purchaseSnap.data() }
    }

}

const PurchasedIDPage: NextPage<{data: Ipurchases}> = ({data}) => {

    return (
        <main className={s.main2}>

            <div className={s.purchaseInfo}>

                <h1> Payment ID: {data.paymentID} </h1>

                <div className={s.items}>

                    { data.items.map(item => {
                        return <div className={s.item} key={item.name}>
                            <div className={s.itemInfo}>
                                <h2> {item.name} </h2>
                                <p> x{item.quantity} </p>
                            </div>
                            <div className={s.itemAmount}>
                                <p> &#8369;{commaNumber(item.totalAmount.value)} </p>
                            </div>
                        </div>
                    }) }

                </div>

            </div>

        </main>
    )

}

export default PurchasedIDPage