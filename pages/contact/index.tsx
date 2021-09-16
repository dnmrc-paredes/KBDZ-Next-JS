import React, { useState, ChangeEvent } from "react";
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import { collection, addDoc } from 'firebase/firestore'

// Firebase
import { firebaseDB } from "../../firebase/client";

// Styles
import s from './contact.module.scss'
import 'react-toastify/dist/ReactToastify.css'

const Contact = () => {

    const [emailForm, setEmailForm] = useState({
        name: "",
        email: "",
        msg: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        const { value, name } = e.target

        setEmailForm({
            ...emailForm,
            [name]: value
        })
    }

    const submitForm = async () => {

        try {

            const docRef = await addDoc(collection(firebaseDB, "emails"), {
                name: emailForm.name,
                email: emailForm.email,
                msg: emailForm.msg
            })

            if (docRef.id) {
                setEmailForm({ name: "", email: "", msg: "" })
                return toast('Thank you for submitting', {
                    type: 'info',
                    autoClose: 2000
                })
            }
            
        } catch (error) {
            return toast('Please try again later', {
                type: 'error',
                autoClose: 2000
            })
        }
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
                            <input type="text" name="name" value={emailForm.name} onChange={handleChange} />
                            <label htmlFor="email"> Email Address </label>
                            <input type="email" name="email" value={emailForm.email} onChange={handleChange} />
                        </div>
                        <div className={s.txtarea}>
                            <label htmlFor="msg"> Message </label>
                            <textarea name="msg" cols={100} rows={8} value={emailForm.msg} onChange={handleChange} ></textarea>
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