import React, { useState, ChangeEvent} from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from 'next/head'
import { useRouter } from "next/dist/client/router";
import { FcGoogle } from 'react-icons/fc'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "@firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import cookies from 'next-cookies'
import { useDispatch } from "react-redux";

// Firebase
import { firebaseAuth } from "../../firebase/client";
import { firebaseAdmin } from "../../firebase/server";

// Utils
import { refreshToken } from "../../utils/refreshToken";

// Redux
import { loadCart } from "../../redux/actions/cart";

// Styles
import 'react-toastify/dist/ReactToastify.css'
import s from './login.module.scss'

export const getServerSideProps: GetServerSideProps = async (ctx) => { 

    const { KBDZRefreshToken } = cookies(ctx) as { KBDZToken: string, KBDZRefreshToken: string }

    if (!KBDZRefreshToken) {
        return {
            props: {}
        }
    }

    try {

        const idToken = await refreshToken(KBDZRefreshToken)
        const { uid } = await firebaseAdmin.verifyIdToken(idToken)

        if (uid) {
            return {
                redirect: {
                    destination: '/shop',
                    permanent: true
                },
                props: {  }
            }
        }
        
    } catch (err) {
        console.log(err)
    }

    return {
        props: {}
    }

}

const Login: NextPage = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    // const [user, loading, error] = useAuthState(firebaseAuth) as [ user: User, loading: boolean, error: any ]
    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })

    const emailPasswordHandler = () => {

        signInWithEmailAndPassword(firebaseAuth, userInput.email, userInput.password).then(async user => {

            if (!user.user.emailVerified) {
                return toast('Please verify your email first.', {
                    type: 'info'
                })
            }

            const token = await user.user.getIdToken()
            const refreshToken = user.user.refreshToken
            document.cookie = `KBDZToken=${token}; path=/;`
            document.cookie = `KBDZRefreshToken=${refreshToken}; path=/;`
            dispatch(loadCart(user.user.uid))
            router.push('/shop')

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
        signInWithPopup(firebaseAuth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result)
                const token = await result.user.getIdToken()
                const refreshToken = result.user.refreshToken
                document.cookie = `KBDZToken=${token}; path=/;`
                document.cookie = `KBDZRefreshToken=${refreshToken}; path=/;`
                result.user.refreshToken
                // document.cookie = `KBDZAccessToken=${accessToken}; path=/;`
                dispatch(loadCart(result.user.uid))
                router.push('/shop')

                // ...
            }).catch(error => {
                // Handle Errors here.
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        })

    }

    const facebookSignIn = () => {

        const provider = new FacebookAuthProvider()
        signInWithPopup(firebaseAuth, provider)
            .then(async result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                const token = await result.user.getIdToken()
                const refreshToken = result.user.refreshToken
                // The signed-in user info.
                const user = result.user;
                // console.log(credential)
                document.cookie = `KBDZToken=${token}; path=/;`
                document.cookie = `KBDZRefreshToken=${refreshToken}; path=/;`
                dispatch(loadCart(user.uid))
                router.push('/shop')
                // ...
            }).catch(error => {

                const errorCode = error.code
                const errorMessage = error.message
                // The email of the user's account used.
                // const email = error.email
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error)
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    return toast('Email already registered', { type: 'error' })
                }
                // console.log(errorMessage)

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