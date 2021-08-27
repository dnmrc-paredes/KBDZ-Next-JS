import React, { useState, ChangeEvent } from "react";
import Head from 'next/head'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'

// Styles
import 'react-toastify/dist/ReactToastify.css'
import s from './register.module.scss'

const Register = () => {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const signUpHandler = () => {

        const auth = getAuth()
        createUserWithEmailAndPassword(auth, user.email, user.password).then(data => {

            const { user: creds } = data

            if (creds) {

                if (creds.emailVerified) {
                    return toast('Email already registered, Please sign in.', {
                        type: 'info'
                    })
                }

            }

            sendEmailVerification(creds)

            return toast('Email is sent for verification.', {
                type: 'info'
            })

        }).catch(error => {
            // const errorCode = error.code;
            const errorMessage = error.message;

            if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                return toast('Email already taken.', {
                    type: 'error'
                })
            } else if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                return toast('Invalid Email.', {
                    type: 'error'
                })
            } else if (errorMessage === 'Firebase: Error (auth/weak-password).') {
                return toast('Password must be 6 characters above.', {
                    type: 'error'
                })
            }
        })
        
    }

    return (
        <div>
            <Head>
                <title> KBDZ | Register </title>
            </Head>

            <main className={s.main}>
                <form onSubmit={(e) => e.preventDefault()} className={s.form}>
                    <h1> Register </h1>
                    <label htmlFor="email"> Email Address </label>
                    <input onChange={changeHandler} value={user.email} type="email" name="email"/>
                    <label htmlFor="password"> Password </label>
                    <input onChange={changeHandler} value={user.password} type="password" name="password"/>
                    <button onClick={signUpHandler} > Sign up </button>
                    <Link href="/login"> Already have an account? Sign in here </Link>
                    {/* <p> or </p>
                    <button className={s.google}> <FcGoogle style={{marginRight: '5px'}} size={25} /> Sign In with Google </button> */}
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

export default Register