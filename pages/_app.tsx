import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';
import { useEffect, useState } from 'react';
import Login from './Login/Login';

export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      {session && session.user ? (
        <Component {...pageProps} />
      ) : (
        <Login />
      )}
    </>
  );
}
