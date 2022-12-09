import '../styles/globals.css'
import type { AppProps } from 'next/app'
import "../styles/globals.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { studioTheme } from "../src/ui-components";
import { AmplifyProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "@fontsource/inter";


import awsconfig from "../src/aws-exports";
Amplify.configure(awsconfig);


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider theme={studioTheme}>
      <Component {...pageProps} />
    </AmplifyProvider>
  );
}
