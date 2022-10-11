import type { AppProps } from 'next/app'

import { Layout } from 'components/Layout'
import { SessionProvider } from 'next-auth/react'

import 'styles/globals.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
