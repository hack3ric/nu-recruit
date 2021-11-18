import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from "notistack"

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <SnackbarProvider maxSnack={3}>
      <Component {...pageProps} />
    </SnackbarProvider>
  </>
}

export default MyApp
