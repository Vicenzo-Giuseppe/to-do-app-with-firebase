import React from 'react'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import { ChakraProvider } from "@chakra-ui/react"
import theme from '../styles/theme'
import '../styles/globals.css'
import Layout from '../components/Layout/main'
import { AppProps } from 'next/app'

initAuth()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
