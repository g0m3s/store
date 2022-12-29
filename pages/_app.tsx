import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3m0N0focK4JyDu05reeUtuyoW2MBurhU",
  authDomain: "luna-store-23b12.firebaseapp.com",
  projectId: "luna-store-23b12",
  storageBucket: "luna-store-23b12.appspot.com",
  messagingSenderId: "920181953450",
  appId: "1:920181953450:web:b2252cef777c5c0a8211d3",
  measurementId: "G-YHFHD2YWZS"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// getAnalytics(app)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
