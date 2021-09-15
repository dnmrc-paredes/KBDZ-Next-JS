import React from "react";
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';

// Styles
import s from './contact.module.scss'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {

    const submitForm = () => {
        return toast('Thank you for submitting', {
            type: 'info',
            autoClose: 2000
        })
    }

    return (
        <div>
            <Head>
                <title> KBDZ | Contact </title>
            </Head>

            <main className={s.main}>

                <h1> Contact Us </h1>

                <form onSubmit={e => e.preventDefault()}>
                    <div className={s.form}>
                        <div className={s.inputs}>
                            <label htmlFor="name"> Name </label>
                            <input type="text" name="" id="" />
                            <label htmlFor="email"> Email Address </label>
                            <input type="email" name="" id="" />
                        </div>
                        <div className={s.txtarea}>
                            <label htmlFor="msg"> Message </label>
                            <textarea name="" cols={100} rows={8}></textarea>
                        </div>
                    </div>

                    <button onClick={submitForm}> Submit </button>
                </form>
            </main>

            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />  

        </div>
    )

}

export default Contact