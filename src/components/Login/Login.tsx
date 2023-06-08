import React, { useState } from 'react'
import { supabase } from '../../../supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) console.log(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) console.log(error.message)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <p style={styles.title}>Bienvenido a WeeOut</p>

      <div style={{ ...styles.verticallySpaced, ...styles.mt20}}>
        <input
          // label="Email"
          // leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          style={styles.input}

        />
      </div>
      <div style={styles.verticallySpaced}>
        <input
          // label="Contraseña"
          // leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          type='password'
          placeholder="Contraseña"
          autoCapitalize={'none'}
          style={styles.input}
        />
      </div>
      <p style={styles.titleContainer}>Si aun no tienes una cuenta, escribe tu email y contraseña. Despues dale a "Registrarte"</p>

      <div style={{ ...styles.verticallySpaced, ...styles.mt20 }}>
          <button style={styles.button} disabled={loading} onClick={() => signInWithEmail()}>
            Inicias sesion
        </button>      
        </div>
      
      <div style={styles.verticallySpaced}>
        <button style={styles.button} disabled={loading} onClick={() => signUpWithEmail()}>
          Registrarte
        </button>
      </div>

    </div>
  )
}

const styles = {
  container: {
    marginTop: 40,
    padding: 30,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    backgroundColor:  '#f5694d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  titleContainer: {
    marginTop: 10,
    marginBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 15,
  },
  title: {
    marginTop: 80,
    marginBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 35,
  },
  input: {
    paddingLeft: 10,

  },
}