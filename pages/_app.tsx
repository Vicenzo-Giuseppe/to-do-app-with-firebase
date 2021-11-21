import '../styles/globals.css'
import { Chakra } from '../chakra'
import theme from '../styles/theme'
import '../styles/globals.css'
import Layout from '../components/Layout/main'
import { AppProps } from 'next/app'
import { AuthContext } from '../firebase/authUserContext'




function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Chakra cookies={pageProps.cookies}>
      <AuthContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext>
    </Chakra>
  )
}

export default MyApp
