import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

// Contexts
import { AuthProvider } from '../contexts/authContext'
import { Provider } from 'react-redux'

// Components
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

// Store
import { store } from '../redux'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <AuthProvider>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </AuthProvider>
    </Provider>
  )
}

export default MyApp
