import { useState, useEffect } from 'react'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase'
import Login from '../src/components/Login/Login'

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  console.log(session)

  return session && session.user ? <Component {...pageProps} /> : <Login />
}
