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
import s from './redragon.module.scss'

export const getStaticProps: GetStaticProps = () => {

    const filteredProds = keyboardsData.filter(item => item.brand === 'Redragon')

    return {
        props: {
            data: filteredProds
        }
    }

}

const RedragonProds: NextPage<{data: Ikeyboard[]}> = (props) => {

    const { data } = props

    return (
        <div>
            <Head>
                <title> KBDZ | Redragon </title>
            </Head>

            <main className={s.main}>

            <div className={s.title}>
                    <h1> Redragon </h1>
                </div>

                <div className={s.items}>
                    { data.map(item => {
                        return (
                            <KeyboardItem price={item.price} id={item.id} brand={item.brand} name={item.name} key={item.id} />
                        )
                    }) }
                </div>
                
            </main>

        </div>
    )

}

export default RedragonProds