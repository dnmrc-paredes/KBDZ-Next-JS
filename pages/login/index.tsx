import React, { useState, ChangeEvent } from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from 'next/head'
import { FcGoogle } from 'react-icons/fc'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, setPersistence, browserLocalPersistence } from "@firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'

import { auth } from "../../firebase/config";

// Styles
import 'react-toastify/dist/ReactToastify.css'
import s from './login.module.scss'

// export const getServerSideProps: GetServerSideProps = async () => {

//     onAuthStateChanged(auth, (user) => {
//         console.log(user)
//     })
    

//     return {
//         props: {}
//     }

// }

const Login: NextPage = () => {

    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })

    const emailPasswordHandler = () => {

        signInWithEmailAndPassword(auth, userInput.email, userInput.password).then(user => {

            if (!user.user.emailVerified) {
                return toast('Please verify your email first.', {
                    type: 'info'
                })
            }

            console.log(user.user)

        }).catch(err => {
            const msg = err.message

            if (msg === 'Firebase: Error (auth/invalid-email).') {
                return toast('Invalid email.', {
                    type: 'error'
                })
            } else if (msg === 'Firebase: Error (auth/wrong-password).') {
                return toast('Invalid Email / Password.', {
                    type: 'warning'
                })
            } else if (msg === 'Firebase: Error (auth/user-not-found).') {
                return toast('User not found.', {
                    type: 'warning'
                })
            }
        })

    }
    
    const googleSignIn = () => {

        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(result)

                // ...
            }).catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        })

    }

    const facebookSignIn = () => {

        const auth = getAuth()
        const provider = new FacebookAuthProvider()
        signInWithPopup(auth, provider)
            .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = credential!.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(credential)
                // ...
            }).catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        })

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    return (
        <div>
            <Head>
                <title> KBDZ | Login </title>
            </Head>

            <main className={s.main}>
                <form onSubmit={e => e.preventDefault()} className={s.form}>
                    <h1> Login </h1>
                    <label htmlFor="email"> Email Address </label>
                    <input type="email" value={userInput.email} onChange={handleChange} name="email"/>
                    <label htmlFor="password"> Password </label>
                    <input type="password" value={userInput.password} onChange={handleChange} name="password"/>
                    <button onClick={emailPasswordHandler} className={s.signin}> Sign In </button>
                    <p> or </p>
                    <button onClick={googleSignIn} className={s.google}> <FcGoogle style={{marginRight: '5px'}} size={25} /> Sign In with Google </button>
                    <button onClick={facebookSignIn} className={s.facebook}> Sign In with Facebook </button>
                    <Link href="register" passHref={true}> Don&apos;t have an account? Sign up here. </Link>
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

export default Login