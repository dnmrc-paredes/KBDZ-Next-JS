import React from "react";
import { NextPage } from "next";
import Head from 'next/head'
import { useRouter } from "next/router";

// Styles
import s from '../styles/error.module.scss'

const ErrorPage: NextPage = () => {

    const router = useRouter()

    return (
        <div>
            <Head>
                <title> Page not found. </title>
            </Head>

            <main className={s.main}>
                <h1> We are sorry, Page not found </h1>
                <p> Click <span onClick={() => router.back()} className={s.here}> here </span> to go back </p>
            </main>
        </div>
    )

}

export default ErrorPage