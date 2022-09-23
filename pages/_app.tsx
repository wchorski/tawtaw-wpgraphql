import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import { ApolloProvider } from "@apollo/client/react";
import { client } from "utils/apollo";

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />   
    </ApolloProvider>
  )

  
}

export default MyApp
