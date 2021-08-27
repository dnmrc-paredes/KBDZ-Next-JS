import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

// Components
import { Header } from '../components/header/header'

// Firebase
// import { setUp, auth } from '../firebase/config'

// setUp()

const MyApp = ({ Component, pageProps }: AppProps) => {

  // useEffect(() => {

  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
      
  //     if (!user) {
  //       return console.log('unauth')
  //     }

  //     console.log(user)

  //   })

  //   return () => unsubscribe()
  // }, [])

  return (
    <div>
      <Header/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
