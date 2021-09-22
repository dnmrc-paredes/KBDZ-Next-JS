import React from "react";
import Head from 'next/head'
import { NextPage } from 'next'
import Skeleton from 'react-loading-skeleton';

// Contexts
import { useKeyboardData } from "../../contexts/keyboardDatasContext";

// Components
import { KeyboardItem } from "../../components/reusable/itemCard/itemCard";

// Types
import { Ikeyboard } from "../../types/types";

// Styles
import s from './royal-kludge.module.scss'

const RoyalKludgeProds: NextPage = () => {

    const { data } = useKeyboardData() as {data: Ikeyboard[]}
    const filteredData = data.filter(item => item.brand === 'Royal Kludge')

    return (
        <div>
            <Head>
                <title> KBDZ | Royal Kludge </title>
            </Head>

            <main className={s.main}>

                <div className={s.title}>
                    <h1> Royal Kludge </h1>
                </div>

                {/* <SkeletonTheme color="#3373C4" highlightColor="#444">
                                <p> */}
                                    {/* <Skeleton count={3} height={300} width={227} /> */}
                                {/* </p>
                            </SkeletonTheme> */}

                { filteredData === undefined ? <Skeleton count={3} height={300} width={227} /> : <div className={s.items}>
                    { filteredData.map(item => {
                        return (
                            <KeyboardItem uid={item.uid} price={item.price} id={item.id} brand={item.brand} name={item.name} key={item.uid} />
                        )
                    }) }
                </div> }

                {/* <div className={s.items}>
                    { filteredData.map(item => {
                        return (
                            <KeyboardItem price={item.price} id={item.id} brand={item.brand} name={item.name} key={item.uid} />
                        )
                    }) }
                </div> */}
                
            </main>

        </div>
    )

}

export default RoyalKludgeProds