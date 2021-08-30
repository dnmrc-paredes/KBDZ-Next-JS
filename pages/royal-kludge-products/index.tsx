import React from "react";
import Head from 'next/head'
import { GetStaticProps, NextPage } from 'next'

// Components
import { KeyboardItem } from "../../components/reusable/itemCard/itemCard";

// Data
import { keyboardsData } from "../../data/fakeData";

// Types
import { Ikeyboard } from "../../types/types";

// Styles
import s from './royal-kludge.module.scss'

export const getStaticProps: GetStaticProps = () => {

    const filteredProds = keyboardsData.filter(item => item.brand === 'Royal Kludge')

    return {
        props: {
            data: filteredProds
        }
    }

}

const RoyalKludgeProds: NextPage<{data: Ikeyboard[]}> = (props) => {

    const { data } = props

    return (
        <div>
            <Head>
                <title> KBDZ | Royal Kludge </title>
            </Head>

            <main className={s.main}>

                <div className={s.title}>
                    <h1> Royal Kludge </h1>
                </div>

                <div className={s.items}>
                    { data.map(item => {
                        return (
                            <KeyboardItem id={item.id} brand={item.brand} name={item.name} key={item.id} />
                        )
                    }) }
                </div>
                
            </main>

        </div>
    )

}

export default RoyalKludgeProds