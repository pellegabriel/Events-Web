import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from '../src/supabaseClient'
import Login from '../pages/Login/Login'
import Account from '../pages/Account/Account'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Login /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}

export default App