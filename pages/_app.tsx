import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import paymaya from 'paymaya-js-sdk';
import { useEffect } from 'react';

// Contexts
import { AuthProvider } from '../contexts/authContext'
import { DataProvider } from '../contexts/keyboardDatasContext';
import { Provider } from 'react-redux'

// Components
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

// Store
import { store, persistor } from '../redux'

// Global Styles
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    paymaya.init('pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah', true)
    // paymaya.init('pk-MOfNKu3FmHMVHtjyjG7vhr7vFevRkWxmxYL1Yq6iFk5', true)
  }, [])

  return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <AuthProvider>
            <DataProvider>
              <Header/>
              <Component {...pageProps} />
              <Footer/>
            </DataProvider>
          </AuthProvider>
        </Provider>
      </PersistGate>
  )
}

export default MyApp

