import React, { FC } from "react";
import Image from 'next/image'
import { useRouter } from "next/router";

// Types
import { Ikeyboard } from "../../../types/types";

// Styles
import s from './itemCard.module.scss'

export const KeyboardItem: FC<Ikeyboard> = (props) => {

    const { brand, name, uid } = props

    const router = useRouter()

    return (
        <main className={s.card}>
            <Image height={200} width={200} placeholder={'blur'} alt={name} src={require('../../../public/mech-png.png')} />
            <div className={s.cardInfo}>
                <h3> {brand} </h3>
                <p> {name} </p>
                <button onClick={() => router.push(`${router.asPath}/${uid}`)} > VIEW </button>
            </div>
        </main>
    )

}