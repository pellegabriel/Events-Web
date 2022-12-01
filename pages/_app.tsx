import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import "../styles/globals.css";
import { Amplify } from "aws-amplify";
import { studioTheme } from "../src/ui-components";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/inter";
import "../styles/reset.css";

import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider theme={studioTheme}>
      <Component {...pageProps} />

      <div className="App">
        <nav>
          <ul>
            <li>
            <Link href="/event">
              Event
            </Link>
            </li>
            <li>
            <Link href="/formUser">
              FormUser
            </Link>
            </li>
          </ul>
        </nav>
      </div>
  </AmplifyProvider>
  );
}
