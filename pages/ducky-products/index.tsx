import React from "react";
import Head from 'next/head'
import { NextPage } from 'next'

// Contexts
import { useKeyboardData } from "../../contexts/keyboardDatasContext";

// Components
import { KeyboardItem } from "../../components/reusable/itemCard/itemCard";

// Types
import { Ikeyboard } from "../../types/types";

// Styles
import s from './ducky.module.scss'

const DuckyProds: NextPage = () => {

    const { data } = useKeyboardData() as {data: Ikeyboard[]}
    const filteredData = data.filter(item => item.brand === 'Ducky')

    return (
        <div>
            <Head>
                <title> KBDZ | Ducky </title>
            </Head>

            <main className={s.main}>

                <div className={s.title}>
                    <h1> Ducky </h1>
                </div>

                <div className={s.items}>
                    { filteredData.map(item => {
                        return (
                            <KeyboardItem uid={item.uid} price={item.price} id={item.id} brand={item.brand} name={item.name} key={item.id} />
                        )
                    }) }
                </div>
                
            </main>

        </div>
    )

}

export default DuckyProds