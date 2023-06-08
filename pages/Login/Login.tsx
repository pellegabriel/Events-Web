// import React, { useState } from 'react';
// import { supabase } from '../supabase';

// export default function Login() {
//    const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function signInWithEmail() {
//     setLoading(true)
//     const { error } = await supabase.auth.signInWithPassword({
//       email: email,
//       password: password,
//     })

//     if (error) alert(error.message)
//     setLoading(false)
//   }

//   async function signUpWithEmail() {
//     setLoading(true)
//     const { error } = await supabase.auth.signUp({
//       email: email,
//       password: password,
//     })

//     if (error) alert(error.message)
//     setLoading(false)
//   }

//   return (
//     <div style={{ marginTop: 40, padding: 30 }}>
//       <h1 style={{ marginTop: 80, marginBottom: 40, paddingLeft: 20, paddingRight: 20, fontSize: 35 }}>
//         Bienvenido a WeeOut
//       </h1>

//       <div style={{ paddingTop: 4, paddingBottom: 4, alignSelf: 'stretch', marginTop: 20 }}>
//         <input
//           onChange={(event) => setEmail(event.target.value)}
//           value={email}
//           placeholder="email@address.com"
//           autoCapitalize="none"
//           style={{ paddingLeft: 10 }}
//         />
//       </div>
//       <div style={{ paddingTop: 4, paddingBottom: 4, alignSelf: 'stretch' }}>
//         <input
//           onChange={(event) => setPassword(event.target.value)}
//           value={password}
//           type="password"
//           placeholder="Contraseña"
//           autoCapitalize="none"
//           style={{ paddingLeft: 10 }}
//         />
//       </div>
//       <h1 style={{ marginTop: 10, marginBottom: 0, paddingLeft: 20, paddingRight: 20, fontSize: 15 }}>
//         Si aún no tienes una cuenta, escribe tu email y contraseña. Después dale a "Registrarte"
//       </h1>

//       <div style={{ paddingTop: 4, paddingBottom: 4, alignSelf: 'stretch', marginTop: 20 }}>
//         <button
//           style={{
//             backgroundColor: '#f5694d',
//             borderRadius: 5,
//           }}
//           disabled={loading}
//           onClick={() => signInWithEmail()}
//         >
//           <h1 style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>Iniciar sesión</h1>
//         </button>
//       </div>

//       <div style={{ paddingTop: 4, paddingBottom: 4, alignSelf: 'stretch' }}>
//         <button
//           style={{
//             backgroundColor: '#f5694d',
//             borderRadius: 5,
//           }}
//           disabled={loading}
//           onClick={() => signUpWithEmail()}
//         >
//           <h1 style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>Registrarte</h1>
//         </button>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react'
import { supabase } from '../../src/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (event: any) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      alert(error)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <p className="description">Sign in via magic link with your email below</p>
        <form className="form-widget" onSubmit={handleLogin}>
          <div>
            <input
              className="inputField"
              type="email"
              placeholder="Your email"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button className={'button block'} disabled={loading}>
              {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}