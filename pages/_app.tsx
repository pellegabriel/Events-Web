import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { studioTheme } from '../src/ui-components'

import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import '@aws-amplify/ui-react/styles.css'

import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import awsconfig from '../src/aws-exports'
Amplify.configure(awsconfig)
import config from '../src/aws-exports'

Amplify.configure({
  ...config,
  ssr: true,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider theme={studioTheme}>
      <Authenticator.Provider>
        <Component {...pageProps} />
      </Authenticator.Provider>
    </AmplifyProvider>
  )
}
