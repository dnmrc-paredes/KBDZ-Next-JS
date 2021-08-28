import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

// Contexts
import { AuthProvider } from '../contexts/authContext'

// Components
import { Header } from '../components/header/header'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <AuthProvider>
      <Header/>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
