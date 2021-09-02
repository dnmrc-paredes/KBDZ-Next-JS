import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'

// Contexts
import { AuthProvider } from '../contexts/authContext'
import { Provider } from 'react-redux'

// Components
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

// Store
import { store, persistor } from '../redux'

// Global Styles
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AuthProvider>
            <Header/>
            <Component {...pageProps} />
            <Footer/>
          </AuthProvider>
        </Provider>
      </PersistGate>
  )
}

export default MyApp
